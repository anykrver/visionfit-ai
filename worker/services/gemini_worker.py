import os
import base64
import io
import google.generativeai as genai
from PIL import Image
from typing import Optional, Dict, Any

class GeminiWorker:
    def __init__(self):
        self.default_model = os.getenv("GEMINI_IMAGE_MODEL", "gemini-2.5-flash-image")
        
    def _get_api_client(self, api_key: Optional[str] = None):
        key = api_key or os.getenv("GEMINI_API_KEY")
        if not key:
            raise ValueError("Gemini API Key missing")
        genai.configure(api_key=key)
        return genai

    def _prepare_image(self, image_data: str):
        if image_data.startswith('data:'):
            header, encoded = image_data.split(",", 1)
            image_bytes = base64.b64decode(encoded)
            return Image.open(io.BytesIO(image_bytes))
        return image_data # Could be URL or path

    async def perform_try_on(self, 
                             user_image: str, 
                             garment_image: str, 
                             category: str, 
                             height: int, 
                             weight: int, 
                             api_key: Optional[str] = None,
                             model_name: Optional[str] = None):
        
        client = self._get_api_client(api_key)
        model = genai.GenerativeModel(model_name or self.default_model)
        
        user_img = self._prepare_image(user_image)
        garment_img = self._prepare_image(garment_image)
        
        system_instruction = f"""You are an elite virtual try-on AI (VisionFit AI). Your specialty is rendering a person from a portrait (Image 1) wearing a specific garment from a reference (Image 2) with absolute realism.

CRITICAL CONSTRAINTS:
1. IDENTITY PRESERVATION: Keep the person's face, eyes, hair, skin tone, and features 100% identical to Image 1.
2. BACKGROUND & POSE PRESERVATION: Use the EXACT background and the EXACT body pose from Image 1.
3. PHYSICS & FIT: Adjust the garment from Image 2 to fit the person's body shape and pose in Image 1. Account for height {height}cm and weight {weight}kg.
4. LIGHTING: Match the garment's lighting perfectly to Image 1.
5. CLEANUP: Remove any text, prices, or watermarks."""

        prompt = f"Render a high-resolution version of Image 1 where the person is wearing the exact garment from Image 2. Drape the {category} naturally."

        response = model.generate_content(
            [prompt, user_img, garment_img],
            generation_config=genai.types.GenerationConfig(
                # system_instruction=system_instruction, # Note: some models might use this differently in Python SDK
                candidate_count=1
            )
        )
        
        # In the Python SDK, if the model supports image output, we handle it.
        # However, as of now, Gemini models return text describing the image or 
        # specific image parts if it's an image-to-image model.
        # Adjusting based on standard Gemini 2.5 Flash Image behavior.
        
        # Mocking the result URL structure as per Node.js if needed, 
        # but ideally we return the base64.
        
        try:
            # This is a placeholder for actual image extraction which depends on the specific model's response format
            # Gemini 2.5 Flash Image usually returns the image directly in parts.
            for part in response.candidates[0].content.parts:
                if part.inline_data:
                    img_data = base64.b64encode(part.inline_data.data).decode('utf-8')
                    return f"data:image/png;base64,{img_data}"
        except Exception as e:
            print(f"Extraction error: {e}")
            
        return ""

    async def generate_style_advice(self, user_image: str, garment_image: str, category: str, api_key: Optional[str] = None):
        client = self._get_api_client(api_key)
        model = genai.GenerativeModel('gemini-2.0-flash')
        
        user_img = self._prepare_image(user_image)
        garment_img = self._prepare_image(garment_image)
        
        prompt = f"""You are a high-end fashion stylist.
Analyze the user in Image 1 and the garment in Image 2 ({category}).
Provide 3 short, punchy styling tips for wearing this item.
Focus on accessories, footwear, and occasion.
Max length: 50 words."""

        response = model.generate_content([prompt, user_img, garment_img])
        return response.text

gemini_worker = GeminiWorker()
