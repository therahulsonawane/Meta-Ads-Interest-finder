import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from .database import engine
from .models import Base
from .routes import auth_routes, generate_routes, dashboard_routes

logging.basicConfig(level=logging.INFO, format="%(levelname)s | %(name)s | %(message)s")


@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        Base.metadata.create_all(bind=engine)
        logging.getLogger(__name__).info("Database tables ready.")
    except Exception as exc:
        logging.getLogger(__name__).error("DB connection failed on startup: %s", exc)
    yield


app = FastAPI(
    title="AdInterest Pro API",
    description="AI-powered Meta ad interest generation and validation",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_routes.router)
app.include_router(generate_routes.router)
app.include_router(dashboard_routes.router)


@app.get("/health", tags=["health"])
def health_check():
    return {"status": "ok", "service": "AdInterest Pro API"}
