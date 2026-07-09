# API Architecture

## 1. API Principles
- RESTful resource-based endpoints
- Versioned APIs
- Consistent JSON responses
- Clearly documented request and response schemas
- Authenticated access with role checks

## 2. Authentication Module
### POST /api/v1/auth/register
Request:
- email
- password
- name

Response:
- user object
- access token
- refresh token

### POST /api/v1/auth/login
Request:
- email
- password

Response:
- access token
- refresh token
- user profile

### POST /api/v1/auth/refresh
Request:
- refresh token

Response:
- new access token

## 3. Receipt Module
### POST /api/v1/receipts/upload
Request:
- file
- metadata

Response:
- receipt id
- processing status

### GET /api/v1/receipts/{receipt_id}
Response:
- receipt details and status

### GET /api/v1/receipts
Response:
- paginated list of receipts

## 4. OCR and Processing Module
### POST /api/v1/receipts/{receipt_id}/process
Response:
- processing started
- job id

### GET /api/v1/receipts/{receipt_id}/analysis
Response:
- OCR output
- extracted items
- confidence metrics

## 5. Recommendations Module
### GET /api/v1/receipts/{receipt_id}/recommendations
Response:
- ranked alternatives per item

## 6. Analytics Module
### GET /api/v1/analytics/summary
Response:
- carbon totals
- trend metrics
- recent activity

### GET /api/v1/analytics/trends
Response:
- period-based sustainability insights

## 7. Reports Module
### GET /api/v1/reports/{report_id}
Response:
- report metadata and download link

### POST /api/v1/reports/export
Request:
- report type
- date range

Response:
- report id and export status

## 8. Admin Module
### GET /api/v1/admin/users
Response:
- paginated users

### GET /api/v1/admin/health
Response:
- service health and queue status
