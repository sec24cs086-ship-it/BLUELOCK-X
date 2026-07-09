# Backend Architecture

This application layer is planned for a FastAPI + Python service with SQLAlchemy, PostgreSQL, and JWT-based authentication.

## Planned Structure
- api/: route definitions and API versioning
- models/: database entities
- schemas/: request and response validation models
- services/: domain business logic
- repositories/: persistence abstractions
- database/: connection and migration setup
- middleware/: auth, logging, and error handling
- utils/: generic helpers
- core/: shared configuration and application bootstrapping
- ai/: OCR, estimation, and recommendation workflows
- tests/: unit and integration tests
