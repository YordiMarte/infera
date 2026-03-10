# Infera.JS

AI Inference Gateway designed to proxy and manage LLM requests with
rate limiting, caching, observability and token-based billing.

## Problem
LLM providers do not offer unified rate limiting, caching or cost control.
Infera.JS acts as an infrastructure gateway to solve this.

## Architecture
Client  
→ Gateway API (NestJS)  
→ Redis (rate limit + cache)  
→ Inference Worker (Go – mock)  
→ PostgreSQL (billing)  

## Features
- API key based rate limiting
- Redis response caching
- Token usage tracking & billing
- OpenTelemetry tracing
- Prometheus-ready metrics
- Kubernetes deploy via Helm
- CI/CD with GitHub Actions

## Tech Stack
Go · TypeScript · NestJS · Redis · PostgreSQL · Docker  
Kubernetes (EKS) · Terraform · Helm · OpenTelemetry

## Status
✅ MVP completed in 5 days