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
try:
    settings = Settings()
except Exception as e:
    logger.critical(f"Failed to load configuration: {e}")
    raise e