from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..auth import get_current_user
from ..models import User, Search
from ..schemas import DashboardResponse, SearchHistoryItem

router = APIRouter(prefix="/dashboard", tags=["dashboard"])


@router.get("/history", response_model=DashboardResponse)
def get_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    searches = (
        db.query(Search)
        .filter(Search.user_id == current_user.id)
        .order_by(Search.created_at.desc())
        .all()
    )

    items = [
        SearchHistoryItem(
            id=s.id,
            business_type=s.business_type,
            location=s.location,
            created_at=s.created_at,
            count=len(s.interests),
        )
        for s in searches
    ]

    return DashboardResponse(history=items)
