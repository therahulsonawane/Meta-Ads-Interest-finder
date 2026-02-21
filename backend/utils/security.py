from datetime import datetime, timedelta, timezone
from passlib.context import CryptContext
from jose import JWTError, jwt
from ..config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    # bcrypt limit is 72 bytes; truncate to avoid ValueError
    return pwd_context.hash(password.encode("utf-8")[:72])


def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain.encode("utf-8")[:72], hashed)


def create_access_token(subject: str) -> str:
    expire = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    payload = {"sub": subject, "exp": expire}
    return jwt.encode(payload, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM)


def decode_access_token(token: str) -> str | None:
    try:
        payload = jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALGORITHM])
        return payload.get("sub")
    except JWTError:
        return None
