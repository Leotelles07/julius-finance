from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import get_settings
from app.modules.agent.router import router as agent_router
from app.modules.finances.router import router as finances_router
from app.modules.goals.router import router as goals_router
from app.modules.investments.router import router as investments_router
from app.modules.notifications.router import router as notifications_router
from app.modules.reports.router import router as reports_router

settings = get_settings()

app = FastAPI(title="Julius API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

for router in (
    finances_router,
    investments_router,
    goals_router,
    agent_router,
    notifications_router,
    reports_router,
):
    app.include_router(router)


@app.get("/health", tags=["health"])
async def health() -> dict[str, str]:
    return {"status": "ok"}
