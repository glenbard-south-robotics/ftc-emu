.PHONY: dev dev-build dev-down dev-logs dev-clean rebuild help

dev:
	docker compose -f docker-compose.dev.yml up

dev-build:
	docker compose -f docker-compose.dev.yml build

dev-down:
	docker compose -f docker-compose.dev.yml down

dev-logs:
	docker compose -f docker-compose.dev.yml logs -f

dev-logs-wasm:
	docker compose -f docker-compose.dev.yml logs -f wasm-builder

dev-logs-vite:
	docker compose -f docker-compose.dev.yml logs -f vite-dev

dev-clean:
	docker compose -f docker-compose.dev.yml down -v
	docker system prune -f

rebuild: dev-clean
	docker compose -f docker-compose.dev.yml build --no-cache
	docker compose -f docker-compose.dev.yml up

touch-wasm:
	touch library/ftc-emu-core/src/lib.rs

build-prod:
	cd library/ftc-emu-core && wasm-pack build --target web --out-dir ../../ftc-emu-www/pkg
	cd ftc-emu-www && pnpm install && pnpm run build

help:
	@echo "Available commands:"
	@echo "  make dev           - Start development environment"
	@echo "  make dev-build     - Build development containers"
	@echo "  make dev-down      - Stop development environment"
	@echo "  make dev-logs      - View all logs"
	@echo "  make dev-logs-wasm - View WASM builder logs"
	@echo "  make dev-logs-vite - View Vite logs"
	@echo "  make dev-clean     - Clean everything including volumes"
	@echo "  make rebuild       - Rebuild from scratch"
	@echo "  make touch-wasm    - Force WASM rebuild"
	@echo "  make build-prod    - Production build"
