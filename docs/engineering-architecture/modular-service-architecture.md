# Modular Service Architecture

## 1. Service Design Principles
Each service is independently responsible for a bounded domain. Services communicate through well-defined interfaces and asynchronous events when appropriate.

## 2. Service Catalog

### Authentication Service
Responsibility:
- User registration, login, password reset, and session management
- JWT issuance and validation
- MFA and role assignment
- Account security controls

### Receipt Processing Service
Responsibility:
- Accept uploaded receipts and manage processing lifecycle
- Coordinate OCR, parsing, and storage of extracted content
- Track status transitions from uploaded to processed to analyzed

### OCR Service
Responsibility:
- Extract text and layout from receipt images
- Normalize OCR output into structured fields
- Return confidence and quality metadata

### Product Intelligence Service
Responsibility:
- Recognize product names and attributes from OCR output
- Match extracted text to internal catalog or lookup services
- Standardize units, brands, and categories

### Carbon Intelligence Engine
Responsibility:
- Estimate carbon emissions for detected products
- Apply emission, packaging, transportation, and lifecycle factors
- Return confidence and explanation metadata

### Recommendation Engine
Responsibility:
- Generate deterministic lower-carbon alternatives
- Optimize for carbon reduction, cost, availability, similarity, and user preference
- Rank and explain recommendations

### Behavior Analytics Engine
Responsibility:
- Analyze user habits, spending patterns, and sustainability trends
- Produce recommendations for future behavior and reporting insights

### Reporting Engine
Responsibility:
- Assemble reports for insight delivery and export
- Generate summaries, charts, and downloadable reports

### Notification Service
Responsibility:
- Send email, in-app, and push notifications
- Notify users of receipt processing completion and new insights

### Retail Integration Service
Responsibility:
- Connect with external retail systems and product APIs
- Retrieve inventory, pricing, and product availability data

### Admin Service
Responsibility:
- Support operational oversight and platform management
- Manage user moderation, service health, and configuration
