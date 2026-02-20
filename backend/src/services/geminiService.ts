import { GoogleGenAI } from "@google/genai";
import { TryOnRequest, TryOnResult } from "../types.js";

export class GeminiService {
    private readonly defaultImageModel = process.env.GEMINI_IMAGE_MODEL || "gemini-2.5-flash-image";
    private readonly fallbackImageModels = (process.env.GEMINI_IMAGE_FALLBACK_MODELS || "gemini-3-pro-image-preview")
        .split(",")
        .map((model) => model.trim())
        .filter(Boolean);

    private buildModelPriority(preferredModel?: string): string[] {
        const ordered = [preferredModel, this.defaultImageModel, ...this.fallbackImageModels]
            .filter((model): model is string => Boolean(model && model.trim()))
            .map((model) => model.trim());

        return [...new Set(ordered)];
    }

    private isQuotaError(error: any): boolean {
        const message = String(error?.message || "").toLowerCase();
        const status = Number(error?.status || error?.code || 0);

        return (
            status === 429 ||
            message.includes("quota") ||
            message.includes("rate limit") ||
            message.includes("resource has been exhausted") ||
            message.includes("too many requests") ||
            message.includes("daily limit")
        );
    }

    private isRetryableModelError(error: any): boolean {
        if (this.isQuotaError(error)) {
            return true;
        }

        const message = String(error?.message || "").toLowerCase();
        const status = Number(error?.status || error?.code || 0);

        if (status === 404 || status === 503) {
            return true;
        }

        if (status === 403 && (message.includes("billing") || message.includes("permission") || message.includes("not enabled"))) {
            return true;
        }

        if (status === 400 && (message.includes("model") || message.includes("unsupported") || message.includes("not found"))) {
            return true;
        }

        return (
            message.includes("unsupported model") ||
            message.includes("model not found") ||
            message.includes("not enabled for") ||
            message.includes("permission denied") ||
            message.includes("failed to produce an image") ||
            message.includes("no image")
        );
    }

    private extractImageFromResponse(response: any): string {
        const candidate = response?.candidates?.[0];
        if (!candidate?.content?.parts) {
            return "";
        }

        for (const part of candidate.content.parts) {
            if (part?.inlineData?.data) {
                return `data:image/png;base64,${part.inlineData.data}`;
            }
        }

        return "";
    }

    /**
     * Performs an identity-preserving virtual try-on using high-fidelity prompt tuning.
     * Optimized for Gemini 2.5 Flash Image (Nano Banana).
     */
    async performTryOn(request: TryOnRequest): Promise<TryOnResult> {
        const attemptErrors: any[] = [];

        try {
            const apiKey = request.apiKey || process.env.GEMINI_API_KEY;
            console.log(`[GeminiService] API key source: ${request.apiKey ? "custom" : "env"}`);

            if (!apiKey) {
                throw new Error("API Key not found. Please set GEMINI_API_KEY in backend/.env");
            }

            const ai = new GoogleGenAI({ apiKey });
            const modelsToTry = this.buildModelPriority(request.model);

            const systemInstruction = `You are an elite virtual try-on AI (VisionFit AI). Your specialty is rendering a person from a portrait (Image 1) wearing a specific garment from a reference (Image 2) with absolute realism.

CRITICAL CONSTRAINTS:
1. IDENTITY PRESERVATION: Keep the person's face, eyes, hair, skin tone, and features 100% identical to Image 1.
2. BACKGROUND & POSE PRESERVATION: Use the EXACT background and the EXACT body pose from Image 1. Do NOT use the background or the pose of the model in Image 2.
3. PHYSICS & FIT: Adjust the garment from Image 2 to fit the person's body shape and pose in Image 1. Account for their height (${request.adjustment_params.height}cm) and weight (${request.adjustment_params.weight}kg).
4. LIGHTING: Match the garment's lighting and shadows perfectly to the environment and lighting direction in Image 1.
5. TEXTURE: Maintain high-fidelity texture of the fabric.
6. CLEANUP: Remove any text, prices, or watermarks from the final render.`;

            const prompt = `Render a high-resolution version of Image 1 where the person is wearing the exact garment from Image 2.
- Preserve Identity: Face, hair, and skin from Image 1 must be identical.
- Background & Pose: Use the background and pose from Image 1.
- Physics: Drape the ${request.category} naturally over the person.`;

            const parts: any[] = [{ text: prompt }];

            // Helper for base64
            const isBase64 = (str: string) => str.startsWith('data:');

            // Add Image 1 (User Portrait)
            if (isBase64(request.user_image)) {
                const [mime, data] = request.user_image.split(',');
                const mimeType = mime.match(/:(.*?);/)?.[1] || 'image/jpeg';
                parts.push({ inlineData: { data, mimeType } });
            } else {
                parts.push({ text: `User Image (Image 1): ${request.user_image}` });
            }

            // Add Image 2 (Garment Reference)
            if (isBase64(request.garment_image)) {
                const [mime, data] = request.garment_image.split(',');
                const mimeType = mime.match(/:(.*?);/)?.[1] || 'image/jpeg';
                parts.push({ inlineData: { data, mimeType } });
            } else {
                parts.push({ text: `Garment Image (Image 2): ${request.garment_image}` });
            }

            for (let i = 0; i < modelsToTry.length; i++) {
                const model = modelsToTry[i];
                const hasMoreModels = i < modelsToTry.length - 1;

                try {
                    const response = await ai.models.generateContent({
                        model,
                        contents: { parts },
                        config: {
                            systemInstruction,
                            imageConfig: {
                                aspectRatio: "3:4"
                            }
                        }
                    });

                    const generatedImageUrl = this.extractImageFromResponse(response);

                    if (generatedImageUrl) {
                        return {
                            imageUrl: generatedImageUrl,
                            status: 'success'
                        };
                    }

                    throw new Error("The AI render engine failed to produce an image.");
                } catch (modelError: any) {
                    attemptErrors.push(modelError);

                    if (hasMoreModels && this.isRetryableModelError(modelError)) {
                        console.warn(`[GeminiService] Model "${model}" failed, attempting fallback model.`);
                        continue;
                    }

                    throw modelError;
                }
            }

            throw new Error("No compatible image model succeeded.");
        } catch (error: any) {
            console.error("Gemini Service Error:", error);

            // Check for quota exhaustion (429)
            if (this.isQuotaError(error) || attemptErrors.some((attemptError) => this.isQuotaError(attemptError))) {
                return {
                    imageUrl: '',
                    status: 'error',
                    message: "QUOTA_EXHAUSTED"
                };
            }

            return {
                imageUrl: '',
                status: 'error',
                message: error.message || "An unexpected error occurred during rendering."
            };
        }
    }


    /**
     * Generates fashion style advice based on the user's image and selected garment.
     * Uses Gemini 2.5 Flash for rapid text generation.
     */
    async generateStyleAdvice(userImage: string, garmentImage: string, category: string, customApiKey?: string): Promise<string> {
        try {
            const apiKey = customApiKey || process.env.GEMINI_API_KEY;
            if (!apiKey) return "Style advice unavailable (API Key missing).";

            const ai = new GoogleGenAI({ apiKey });
            // const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" }); // OLD SDK

            const prompt = `You are a high-end fashion stylist.
            Analyze the user in Image 1 and the garment in Image 2 (${category}).
            Provide 3 short, punchy styling tips for wearing this item.
            Focus on accessories, footwear, and occasion.
            Tone: Professional, trendy, and encouraging.
            Max length: 50 words.`;

            // Helper for base64
            const isBase64 = (str: string) => str.startsWith('data:');
            const parts: any[] = [{ text: prompt }];

            // Add Image 1
            if (isBase64(userImage)) {
                const [mime, data] = userImage.split(',');
                parts.push({ inlineData: { data, mimeType: mime.match(/:(.*?);/)?.[1] || 'image/jpeg' } });
            }

            // Add Image 2
            if (isBase64(garmentImage)) {
                const [mime, data] = garmentImage.split(',');
                parts.push({ inlineData: { data, mimeType: mime.match(/:(.*?);/)?.[1] || 'image/jpeg' } });
            }

            const result = await ai.models.generateContent({
                model: 'gemini-2.0-flash',
                contents: [{ role: "user", parts }]
            });

            const candidate = result.candidates?.[0];
            const text = candidate?.content?.parts?.[0]?.text;
            return text || "Looks great! Pair it with confidence.";
        } catch (error) {
            console.error("Style Agent Error:", error);
            return "Unable to generate style advice at this moment.";
        }
    }
}

export const geminiService = new GeminiService();
