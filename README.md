# itemset-external-test

# itemset-external-test

Simple public test website for validating the external itemset integration flow outside Walmart VPN.

## Purpose

This repo exists to verify that the itemset experience can work from a real external website, similar to Yahoo DSP or another external DSP platform.

It is used to test:

- public website hosting outside Walmart VPN
- browser loading of the itemset UI or test bundle
- connectivity to public-facing API endpoints
- CORS behavior
- authentication flow
- end-to-end request/response behavior for external consumption

## What this is not

This is not a production application.  
It is only a lightweight test harness for external integration validation.

## Expected flow

External website  
→ browser loads this site  
→ site calls public-facing API / gateway  
→ gateway routes to protected backend services

## Main goal

Prove that the external-consumer path works without depending on Walmart internal-only hosting or VPN access.

## Deployment

This repo is intended to be deployed to a public host such as Vercel so it can be accessed from outside Walmart network.

## Notes

If an API call fails here, it usually indicates one of these issues:

- API is not actually public
- CORS is not configured correctly
- authentication flow is not suitable for browser-based external use
- internal-only assumptions still exist in the backend path
