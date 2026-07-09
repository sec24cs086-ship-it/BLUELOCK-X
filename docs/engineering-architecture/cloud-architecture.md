# Cloud Architecture

## 1. Cloud-Native Design
The platform is designed to be portable across AWS, Azure, and GCP. The architecture uses containerized services, managed data stores, event-driven processing, and environment-based configuration.

## 2. Deployment Model
- Frontend hosted behind a CDN and static hosting platform
- Backend services deployed as containers or serverless functions where appropriate
- Databases managed as cloud-native relational services
- Object storage for uploaded media and exports

## 3. Portability Strategy
- Use container images and infrastructure-as-code templates
- Keep business logic independent from cloud-specific services
- Use standard interfaces for queues, storage, and observability

## 4. Cloud Service Mapping
### AWS
- ECS or EKS for backend services
- RDS for PostgreSQL
- S3 for object storage
- SQS/SNS for messaging
- CloudFront for CDN

### Azure
- AKS for container deployment
- Azure Database for PostgreSQL
- Blob Storage for object storage
- Service Bus for messaging
- Azure Front Door for CDN/CDN-like delivery

### GCP
- GKE for container deployment
- Cloud SQL for PostgreSQL
- Cloud Storage for object storage
- Pub/Sub for messaging
- Cloud CDN for delivery
