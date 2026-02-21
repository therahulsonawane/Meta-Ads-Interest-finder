import json
import logging
from openai import OpenAI
from ..config import settings
from ..schemas import GenerateRequest

logger = logging.getLogger(__name__)

_client = OpenAI(api_key=settings.OPENAI_API_KEY)

SYSTEM_PROMPT = """You are a senior Meta Ads strategist.
Generate high-converting Meta ad interests for the given business profile.
Only include interests that are very likely to exist in Meta Ads Manager.
Avoid overly broad or generic interests.
Include brands, tools, magazines, certifications, influencers, and job titles where relevant.
Return ONLY a strict JSON object with exactly these four keys — no extra text, no markdown:
{
  "core": [],
  "competitor": [],
  "behavioral": [],
  "psychological": []
}
Each list should contain 5-10 interest name strings."""


def build_user_prompt(payload: GenerateRequest) -> str:
    parts = [f"Business Type: {payload.business_type}"]
    if payload.location:
        parts.append(f"Target Location: {payload.location}")
    if payload.age_range:
        parts.append(f"Age Range: {payload.age_range}")
    if payload.price_range:
        parts.append(f"Product Price Range: {payload.price_range}")
    if payload.audience_description:
        parts.append(f"Audience Description: {payload.audience_description}")
    if payload.competitors:
        parts.append(f"Competitor Brands: {payload.competitors}")
    return "\n".join(parts)


def generate_interests(payload: GenerateRequest) -> dict:
    try:
        response = _client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": build_user_prompt(payload)},
            ],
            temperature=0.7,
            max_tokens=1500,
            response_format={"type": "json_object"},
        )
        raw = response.choices[0].message.content
        data = json.loads(raw)
        for key in ("core", "competitor", "behavioral", "psychological"):
            if key not in data or not isinstance(data[key], list):
                data[key] = []
        return data
    except json.JSONDecodeError as exc:
        logger.error("OpenAI returned invalid JSON: %s", exc)
        raise
    except Exception as exc:
        logger.error("OpenAI API error: %s", exc)
        raise
