# Deployment Guide

This project is configured for deployment on Google Cloud Platform (GCP) using Cloud Run.

## Prerequisites

- Google Cloud Platform account
- `gcloud` CLI installed and authenticated
- Docker installed (for local testing)

## Local Development

To run the application locally:

```bash
npm run dev
```

To build and run the production container locally:

```bash
docker build -t nextjs-app .
docker run -p 8080:8080 nextjs-app
```

## Deploying to Cloud Run

1. **Build the container image:**

   ```bash
   gcloud builds submit --tag gcr.io/[PROJECT-ID]/nextjs-app
   ```

   Replace `[PROJECT-ID]` with your GCP project ID.

2. **Deploy to Cloud Run:**

   ```bash
   gcloud run deploy nextjs-app \
     --image gcr.io/[PROJECT-ID]/nextjs-app \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated
   ```

   - Ensure you set the correct region.
   - `--allow-unauthenticated` makes the service publicly accessible. Remove this flag if you want to restrict access.

## Environment Variables

The application uses the following environment variables. Ensure these are set in your Cloud Run revision:

- `SENTINEL_1_CLOUD_RUN_URL`: URL for the Sentinel 1 service
- `INVOICE_AGENT_URL`: URL for the Invoice Agent service
- `TRAVEL_AGENT_URL`: URL for the Travel Agent service
- `AUDIT_AGENT_URL`: URL for the Audit Agent service

You can set these during deployment:

```bash
gcloud run deploy nextjs-app \
  --image gcr.io/[PROJECT-ID]/nextjs-app \
  --set-env-vars SENTINEL_1_CLOUD_RUN_URL=value,INVOICE_AGENT_URL=value \
  ...
```
