from fastapi import FastAPI, HTTPException, Header
from pydantic import BaseModel
from typing import Optional, Dict, Any
import uvicorn
from dotenv import load_dotenv
from services.gemini_worker import gemini_worker

load_dotenv()

app = FastAPI(title="VisionFit AI Worker")

class TryOnRequest(BaseModel):
    user_image: str
    garment_image: str
    category: str
    adjustment_params: Dict[str, Any]
    model: Optional[str] = None
    apiKey: Optional[str] = None

class StyleAdviceRequest(BaseModel):
    user_image: str
    garment_image: str
    category: str
    apiKey: Optional[str] = None

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "visionfit-worker"}

@app.post("/tryon")
async def perform_tryon(request: TryOnRequest):
    try:
        height = request.adjustment_params.get("height", 175)
        weight = request.adjustment_params.get("weight", 70)
        
        result_image = await gemini_worker.perform_try_on(
            user_image=request.user_image,
            garment_image=request.garment_image,
            category=request.category,
            height=height,
            weight=weight,
            api_key=request.apiKey,
            model_name=request.model
        )
        
        if not result_image:
            raise HTTPException(status_code=500, detail="AI render failed")
            
        return {"imageUrl": result_image, "status": "success"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/style-advice")
async def get_style_advice(request: StyleAdviceRequest):
    try:
        advice = await gemini_worker.generate_style_advice(
            user_image=request.user_image,
            garment_image=request.garment_image,
            category=request.category,
            api_key=request.apiKey
        )
        return {"advice": advice}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
