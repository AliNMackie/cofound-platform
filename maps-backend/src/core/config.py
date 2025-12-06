import logging
from typing import List, Literal
from pydantic_settings import BaseSettings
from pydantic import Field, field_validator # <-- NOTE: field_validator import needed!

logger = logging.getLogger(__name__)

class Settings(BaseSettings):
    # ... (existing fields) ...
    
    # CORS Configuration
    CORS_ORIGINS: List[str] = Field(
        default=[], 
        description="List of allowed CORS origins"
    )

    # Environment & Project Configuration
    ENVIRONMENT: Literal["development", "production", "dev"] = "development"
    GCP_PROJECT_ID: str
    FIREBASE_PROJECT_ID: str
    VERTEX_AI_LOCATION: str = "us-central1"

    # --- FIX START: Add a validator to handle the empty string ---
    @field_validator('CORS_ORIGINS', mode='before')
    def parse_empty_cors_origins(cls, v):
        if isinstance(v, str) and v.strip() == '':
            logger.warning("CORS_ORIGINS is empty; defaulting to empty list.")
            return [] # Convert the empty string to a Python list
        return v
    # --- FIX END ---
    
    model_config = {
        "env_file": ".env",
        "case_sensitive": True,
        "extra": "ignore" 
    }

# Validate settings immediately on import
import os
try:
    settings = Settings()
except Exception as e:
    logger.critical("Failed to load configuration.")
    logger.critical(f"Environment keys: {list(os.environ.keys())}")
    if hasattr(e, "errors"):
        logger.critical(f"Validation errors: {e.errors()}")
    else:
        logger.critical(f"Error details: {e}")
    raise e