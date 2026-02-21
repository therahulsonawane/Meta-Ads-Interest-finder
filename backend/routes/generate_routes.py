import logging
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..database import get_db
from ..auth import get_current_user
from ..models import User, Search, ValidatedInterest
from ..schemas import GenerateRequest, GenerateResponse, ValidatedInterestOut
from ..services import openai_service, metaservice
from ..services.usage_service import check_usage_limit

router = APIRouter(prefix="/generate", tags=["generate"])
logger = logging.getLogger(__name__)

CATEGORIES = ["core", "competitor", "behavioral", "psychological"]


@router.post("", response_model=GenerateResponse)
def generate(
    payload: GenerateRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    check_usage_limit(current_user, db)

    search = Search(
        user_id=current_user.id,
        business_type=payload.business_type,
        location=payload.location,
        age_range=payload.age_range,
        price_range=payload.price_range,
        audience_description=payload.audience_description,
        competitors=payload.competitors,
    )
    db.add(search)
    db.commit()
    db.refresh(search)

    try:
        ai_result = openai_service.generate_interests(payload)
    except Exception as exc:
        logger.error("OpenAI generation failed: %s", exc)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="AI generation failed")

    categorized: dict[str, list[ValidatedInterestOut]] = {}

    for cat in CATEGORIES:
        raw_names: list[str] = ai_result.get(cat, [])
        validated_batch = metaservice.validate_interests_batch(raw_names)

        db_records = []
        out_items = []
        for item in validated_batch:
            db_records.append(ValidatedInterest(
                search_id=search.id,
                interest_name=item["name"],
                meta_interest_id=item.get("id"),
                audience_size=item.get("audience_size"),
                category=cat,
                country=payload.location,
            ))
            out_items.append(ValidatedInterestOut(
                name=item["name"],
                id=item.get("id"),
                audience_size=item.get("audience_size"),
                validated=item.get("validated", False),
                category=cat,
            ))

        if db_records:
            db.bulk_save_objects(db_records)
        categorized[cat] = out_items

    db.commit()

    return GenerateResponse(
        search_id=search.id,
        core=categorized.get("core", []),
        competitor=categorized.get("competitor", []),
        behavioral=categorized.get("behavioral", []),
        psychological=categorized.get("psychological", []),
    )
