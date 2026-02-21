import uuid
from datetime import datetime, timezone
from sqlalchemy import String, ForeignKey, DateTime, Integer, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .database import Base


def _uuid() -> str:
    return str(uuid.uuid4())


def _now() -> datetime:
    return datetime.now(timezone.utc)


class User(Base):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=_uuid)
    email: Mapped[str] = mapped_column(String, unique=True, nullable=False, index=True)
    password_hash: Mapped[str] = mapped_column(String, nullable=False)
    plan: Mapped[str] = mapped_column(String, default="free", nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_now)

    searches: Mapped[list["Search"]] = relationship("Search", back_populates="user", cascade="all, delete-orphan")


class Search(Base):
    __tablename__ = "searches"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=_uuid)
    user_id: Mapped[str] = mapped_column(String, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    business_type: Mapped[str] = mapped_column(String, nullable=False)
    location: Mapped[str] = mapped_column(String, nullable=True)
    age_range: Mapped[str] = mapped_column(String, nullable=True)
    price_range: Mapped[str] = mapped_column(String, nullable=True)
    audience_description: Mapped[str] = mapped_column(Text, nullable=True)
    competitors: Mapped[str] = mapped_column(String, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_now)

    user: Mapped["User"] = relationship("User", back_populates="searches")
    interests: Mapped[list["ValidatedInterest"]] = relationship("ValidatedInterest", back_populates="search", cascade="all, delete-orphan")


class ValidatedInterest(Base):
    __tablename__ = "validated_interests"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=_uuid)
    search_id: Mapped[str] = mapped_column(String, ForeignKey("searches.id", ondelete="CASCADE"), nullable=False, index=True)
    interest_name: Mapped[str] = mapped_column(String, nullable=False)
    meta_interest_id: Mapped[str] = mapped_column(String, nullable=True)
    audience_size: Mapped[int] = mapped_column(Integer, nullable=True)
    category: Mapped[str] = mapped_column(String, nullable=False)
    country: Mapped[str] = mapped_column(String, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_now)

    search: Mapped["Search"] = relationship("Search", back_populates="interests")
