from datetime import datetime, timezone
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from ..models import Search
from ..config import settings


def check_usage_limit(user, db: Session) -> None:
    if user.plan == "pro":
        return

    today_start = datetime.now(timezone.utc).replace(hour=0, minute=0, second=0, microsecond=0)
    count = (
        db.query(Search)
        .filter(Search.user_id == user.id, Search.created_at >= today_start)
        .count()
    )

    if count >= settings.FREE_DAILY_LIMIT:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Daily limit of {settings.FREE_DAILY_LIMIT} searches reached. Upgrade to Pro for unlimited access.",
        )
