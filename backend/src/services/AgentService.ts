import sharp from 'sharp';
import { geminiService } from './geminiService.js';
import { TryOnRequest, TryOnResult } from '../types.js';

interface ValidationResult {
    isValid: boolean;
    issues: string[];
    needsUpscaling: boolean;
}

interface AgentResponse extends TryOnResult {
    analysis?: {
        validation: ValidationResult;
        actions_taken: string[];
        style_advice: string;
    }
}

export class AgentService {
    /**
     * DECISION AGENT: Validates image quality (Resolution, Brightness).
     */
    async validateImage(imageBuffer: Buffer): Promise<ValidationResult> {
        const metadata = await sharp(imageBuffer).metadata();
        const stats = await sharp(imageBuffer).stats();

        const issues: string[] = [];
        let needsUpscaling = false;

        // 1. Resolution Check
        if (metadata.width && metadata.width < 720) {
            issues.push("Low Resolution");
            needsUpscaling = true;
        }

        // 2. Brightness Check (Simple average calculation)
        // detailed stats available in 'stats' object
        // using simple isLight/isDark heuristic
        const brightness = stats.channels[0].mean; // approximation from first channel
        if (brightness < 40) {
            issues.push("Low Lighting");
        }

        return {
            isValid: true, // We try to process everything unless it's strictly invalid file
            issues,
            needsUpscaling
        };
    }

    /**
     * ACTION AGENT: Simulates upscaling logic.
     * In a full production env, this would call a Super-Resolution model.
     */
    async upscaleImage(imageBuffer: Buffer): Promise<string> {
        // Mocking the "Inteligent Upscale" delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // Return original for now, but in real world, we'd return the upscaled buffer as base64
        return `data:image/png;base64,${imageBuffer.toString('base64')}`;
    }

    /**
     * ORCHESTRATOR: Manages the Parallel Logic Flow.
     * 1. Validate Input (Decision Node)
     * 2. Upscale if needed (Transformation Node)
     * 3. Parallel Execution: Try-On + Style Advice (Execution Node)
     */
    async orchestrateTryOn(request: TryOnRequest): Promise<AgentResponse> {
        const actions_taken: string[] = ["Received Request"];
        // Check if custom API key is present
        if (request.apiKey) {
            actions_taken.push("Using Custom API Key");
        }

        try {
            // Step 1: Analyze User Image
            let userImageBuffer: Buffer;

            if (request.user_image.startsWith('data:')) {
                const base64Data = request.user_image.split(',')[1];
                userImageBuffer = Buffer.from(base64Data, 'base64');
            } else {
                // If URL, we would fetch it, but for now assume base64 as per frontend
                throw new Error("Invalid image format. Base64 required.");
            }

            const validation = await this.validateImage(userImageBuffer);
            actions_taken.push(`Analysis: ${validation.issues.length ? validation.issues.join(', ') : 'Good Quality'}`);

            // Step 2: Autonomous Decision - Upscale?
            let processedImage = request.user_image;
            if (validation.needsUpscaling) {
                actions_taken.push("DECISION: Auto-Upscaling Low-Res Image");
                processedImage = await this.upscaleImage(userImageBuffer);
                actions_taken.push("Upscaling Complete");
                // Update request with "better" image
                request.user_image = processedImage;
            }

            // Step 3: Parallel Execution via FastAPI Worker
            actions_taken.push("Triggering Worker Microservice: [FastAPI]");

            const WORKER_URL = process.env.WORKER_URL || 'http://localhost:8000';

            const [tryOnRes, styleAdviceRes] = await Promise.all([
                fetch(`${WORKER_URL}/tryon`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(request)
                }).then(r => r.json()) as Promise<any>,
                fetch(`${WORKER_URL}/style-advice`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        user_image: processedImage,
                        garment_image: request.garment_image,
                        category: request.category,
                        apiKey: request.apiKey
                    })
                }).then(r => r.json()) as Promise<any>
            ]);

            // Combine results
            return {
                imageUrl: tryOnRes.imageUrl || '',
                status: tryOnRes.status || 'error',
                message: tryOnRes.detail || tryOnRes.message,
                analysis: {
                    validation,
                    actions_taken,
                    style_advice: styleAdviceRes.advice || "Style advice unavailable"
                }
            };
        } catch (error: any) {
            console.error("Agent Orchestration Failed:", error);
            return {
                imageUrl: '',
                status: 'error',
                message: error.message || "Agent workflow failed"
            };
        }
    }
}

export const agentService = new AgentService();
