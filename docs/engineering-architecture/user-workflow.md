# End-to-End User Workflow

## 1. User Login
1. User authenticates through the frontend
2. Authentication service validates credentials
3. JWT access token and refresh token are issued
4. User is redirected to the dashboard

## 2. Receipt Upload
1. User uploads a receipt image or PDF
2. The receipt processing service stores the file securely
3. A processing job is created and queued

## 3. OCR
1. OCR service extracts text from the receipt image
2. The system captures merchant name, date, line items, totals, and metadata
3. OCR confidence scores and quality metrics are stored

## 4. Product Recognition
1. Product intelligence service maps extracted text to known product entities
2. Categories, brands, and product names are normalized
3. Confidence and ambiguity flags are recorded

## 5. Carbon Estimation
1. Carbon intelligence engine estimates emissions by product
2. Packaging, transport, and lifecycle factors are applied
3. A product-level carbon footprint is generated

## 6. Recommendation Generation
1. Recommendation engine evaluates alternatives based on carbon reduction, cost, similarity, availability, and preference
2. A ranked list of lower-carbon options is generated
3. Explanations are attached to each suggestion

## 7. Analytics
1. The behavior analytics engine aggregates product and usage patterns
2. User-level sustainability trends and insights are built
3. Summary dashboards are prepared

## 8. Dashboard
1. User sees receipt history, impact metrics, and AI insights
2. Charts and recommendation cards are displayed
3. Filters and report views support deeper exploration

## 9. Report Export
1. User exports analysis as PDF or CSV
2. Reporting engine assembles the data and formatting
3. Export history is tracked for auditing and re-download
