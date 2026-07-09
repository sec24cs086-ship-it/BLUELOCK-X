# EcoLens AI Architecture

## 1. Product Overview
EcoLens AI is an AI-powered carbon-footprint receipt platform that converts uploaded shopping receipts into personalized sustainability insights. The system will support OCR-based product extraction, carbon estimation, lower-carbon alternatives, analytics, and reporting.

## 2. Architecture Principles
- Scalable and modular by domain
- Clear separation between frontend, backend, and AI services
- Secure authentication and authorization
- Production-ready observability and deployment readiness
- Extensible data model for future integrations

## 3. High-Level Architecture Diagram
```text
Users
  │
  ▼
React 19 + Vite + Tailwind Frontend
  │   (Pages, Components, Routes, State, UI)
  ▼
FastAPI Backend
  │   (API Layer, Auth, Business Logic, Services)
  ├── PostgreSQL Database
  ├── SQLAlchemy ORM / Repositories
  ├── AI Processing Layer
  │     ├── OCR: EasyOCR
  │     ├── Analytics: Scikit-learn / Pandas
  │     └── Carbon Intelligence Engine
  └── External Services / File Storage / Reporting
```

## 4. Application Structure

### Frontend
- React 19, TypeScript, Vite
- Tailwind CSS, shadcn/ui, Framer Motion, React Router, Recharts
- Focus: dashboard UX, upload flow, analytics, recommendations

### Backend
- FastAPI, Python, SQLAlchemy, PostgreSQL, JWT authentication
- Focus: API endpoints, invoice/receipt processing orchestration, user management, reporting

### AI Layer
- OCR extraction with EasyOCR
- Carbon estimation and recommendation engine using Scikit-learn and Pandas
- Structured processing pipeline for receipt parsing and insights

## 5. Folder Structure

```text
EcoLens-AI/
├── frontend/
│   ├── pages/
│   ├── components/
│   ├── layouts/
│   ├── hooks/
│   ├── contexts/
│   ├── services/
│   ├── animations/
│   ├── assets/
│   ├── styles/
│   ├── utils/
│   ├── types/
│   ├── constants/
│   └── routes/
├── backend/
│   ├── api/
│   ├── models/
│   ├── schemas/
│   ├── services/
│   ├── repositories/
│   ├── database/
│   ├── middleware/
│   ├── utils/
│   ├── core/
│   ├── ai/
│   └── tests/
├── docs/
├── .github/
│   ├── workflows/
│   └── ISSUE_TEMPLATE/
└── README.md
```

## 6. Frontend Architecture
- Feature-based page organization under pages/
- Reusable UI components under components/
- Layouts for auth, dashboard, onboarding, reporting
- Route definitions centralized in routes/
- API communication isolated in services/
- Shared state in contexts/ and hooks/
- Motion-enhanced UI in animations/

## 7. Backend Architecture
- API versioning under api/
- Domain models under models/
- Request/response contracts under schemas/
- Business logic under services/
- Persistence abstractions under repositories/
- Database configuration under database/
- Cross-cutting concerns under middleware/
- Shared utilities under utils/ and core/
- AI pipeline under ai/
- Test suites under tests/

## 8. Data Architecture
- PostgreSQL as the source of truth
- SQLAlchemy models for users, receipts, products, carbon estimates, recommendations, reports
- Structured storage for OCR results and analytics snapshots
- Optional object storage for uploaded images and generated reports

## 9. Security and Authentication
- JWT-based authentication for users
- Role-aware access for account, analytics, and admin surfaces
- Secure handling of uploaded files and OCR data
- Environment-based secrets and configuration management

## 10. README Structure
Suggested repository README sections:
1. Project title and summary
2. Problem statement and value proposition
3. Architecture overview
4. Tech stack
5. Monorepo folder structure
6. Local development setup
7. Roadmap and milestones
8. License and contribution notes

## 11. GitHub Folder Organization
- .github/workflows/ for CI/CD pipelines
- .github/ISSUE_TEMPLATE/ for bug reports and feature requests
- Pull request templates and deployment workflows to be added in later phases

## 12. Development Roadmap
- Phase 1: Requirements, architecture, and scaffolding
- Phase 2: Authentication, user onboarding, and receipt upload flow
- Phase 3: OCR extraction and carbon estimation engine
- Phase 4: Recommendations, analytics, and reporting
- Phase 5: Performance optimization, testing, and deployment readiness
