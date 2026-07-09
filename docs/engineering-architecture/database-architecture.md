# Database Architecture

## 1. Database Strategy
EcoLens AI uses a relational database as the system of record for transactional, user, and analytics data. A separate object store is used for uploaded files and exported reports.

## 2. Core Tables

### users
- id
- email
- password_hash
- name
- created_at
- updated_at
- is_active
- role

### user_profiles
- id
- user_id
- locale
- currency
- preferences_json
- created_at
- updated_at

### receipts
- id
- user_id
- merchant_name
- receipt_date
- currency
- total_amount
- file_uri
- status
- created_at
- updated_at

### receipt_items
- id
- receipt_id
- product_name
- normalized_name
- category
- quantity
- unit_price
- total_price
- carbon_estimate
- confidence_score
- created_at
- updated_at

### products
- id
- external_id
- name
- normalized_name
- category
- brand
- unit_type
- default_emission_factor
- created_at
- updated_at

### product_matches
- id
- receipt_item_id
- product_id
- match_score
- match_type
- created_at

### carbon_estimates
- id
- receipt_item_id
- base_factor
- packaging_factor
- transportation_factor
- lifecycle_factor
- total_emission
- confidence_score
- created_at

### recommendations
- id
- receipt_item_id
- recommended_product_id
- score
- carbon_reduction
- cost_delta
- explanation
- created_at

### reports
- id
- user_id
- receipt_id
- report_type
- export_uri
- generated_at

### analytics_events
- id
- user_id
- event_type
- event_metadata_json
- created_at

### notifications
- id
- user_id
- type
- payload_json
- is_read
- created_at

## 3. Relationships
- One user has many receipts
- One receipt has many receipt_items
- One receipt_item may match one or more products
- One receipt_item may have many recommendations
- One receipt_item may have one carbon estimate
- One report belongs to one user and one receipt

## 4. Normalization Strategy
- Separate user and profile data
- Normalize products into a catalog table
- Keep receipt-specific extracted data separate from canonical product definitions
- Store event and notification data in dedicated tables

## 5. Indexes
- Index users by email
- Index receipts by user_id and created_at
- Index receipt_items by receipt_id and category
- Index products by normalized_name and category
- Index analytics_events by user_id and created_at

## 6. Scalability Considerations
- Use read replicas for analytics-heavy workload
- Partition large tables such as analytics_events and receipts by time
- Use connection pooling and query optimization
- Keep file storage external to the relational database
- Introduce search indexes for product lookup and OCR matching
