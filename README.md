# julius-finance

Julius: sistema web de gestão financeira pessoal com camada agêntica (chat) para apoiar decisões financeiras.

## Estrutura

- `backend/` — FastAPI (monolito modular: `finances`, `investments`, `goals`, `agent`, `notifications`, `reports`)
- `docker-compose.yml` — PostgreSQL (com pgvector) e Redis para desenvolvimento local
- `frontend/` — Next.js (a criar)

## Desenvolvimento

```bash
cp .env.example .env
docker compose up -d
cd backend && uv run uvicorn app.main:app --reload
```

API em http://localhost:8000 (docs em `/docs`). Testes: `cd backend && uv run pytest`.
