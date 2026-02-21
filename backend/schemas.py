from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr


class RegisterRequest(BaseModel):
    email: EmailStr
    password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserOut(BaseModel):
    id: str
    email: str
    plan: str
    created_at: datetime

    model_config = {"from_attributes": True}


class GenerateRequest(BaseModel):
    business_type: str
    location: Optional[str] = None
    age_range: Optional[str] = None
    price_range: Optional[str] = None
    audience_description: Optional[str] = None
    competitors: Optional[str] = None


class ValidatedInterestOut(BaseModel):
    name: str
    id: Optional[str] = None
    audience_size: Optional[int] = None
    validated: bool
    category: str

    model_config = {"from_attributes": True}


class GenerateResponse(BaseModel):
    search_id: str
    core: list[ValidatedInterestOut]
    competitor: list[ValidatedInterestOut]
    behavioral: list[ValidatedInterestOut]
    psychological: list[ValidatedInterestOut]


class SearchHistoryItem(BaseModel):
    id: str
    business_type: str
    location: Optional[str] = None
    created_at: datetime
    count: int

    model_config = {"from_attributes": True}


class DashboardResponse(BaseModel):
    history: list[SearchHistoryItem]
