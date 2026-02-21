import logging
import requests
from ..config import settings

logger = logging.getLogger(__name__)

MIN_AUDIENCE_SIZE = 50_000
META_SEARCH_URL = f"https://graph.facebook.com/{settings.META_API_VERSION}/search"


def validate_interest(name: str) -> dict | None:
    try:
        resp = requests.get(
            META_SEARCH_URL,
            params={
                "type": "adinterest",
                "q": name,
                "access_token": settings.META_ACCESS_TOKEN,
                "limit": 10,
            },
            timeout=10,
        )
        resp.raise_for_status()
        data = resp.json().get("data", [])
    except requests.RequestException as exc:
        logger.warning("Meta API request failed for '%s': %s", name, exc)
        return None

    normalized = name.strip().lower()
    for item in data:
        if item.get("name", "").strip().lower() == normalized:
            audience_size = item.get("audience_size", 0)
            if audience_size >= MIN_AUDIENCE_SIZE:
                return {
                    "name": item["name"],
                    "id": item.get("id"),
                    "audience_size": audience_size,
                    "path": item.get("path", []),
                }
    return None


def validate_interests_batch(names: list[str]) -> list[dict]:
    results = []
    for name in names:
        validated = validate_interest(name)
        if validated:
            results.append({**validated, "validated": True})
        else:
            results.append({"name": name, "id": None, "audience_size": None, "validated": False})
    return results
