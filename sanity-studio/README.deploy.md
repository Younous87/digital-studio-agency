# Deploying Sanity Studio

This document explains how to deploy the Sanity Studio to Vercel and to set up automatic deployments triggered on pushes to main.

## What this repo contains
- The studio source is in `sanity-studio/` (has its own `package.json`).
- A `vercel.json` is included under `sanity-studio/` to instruct Vercel to use the `dist` output directory produced by `sanity build`.

## Option 1 — Vercel (Recommended)

1. Create a new Project on Vercel and import your GitHub repo.
   - In the project settings, set the Root Directory to `sanity-studio`.
   - Build Command: `npm run build` (the Vercel static build will pick the `dist` output).
   - Output Directory: `dist`
2. Configure production environment variables if needed (not required if the studio uses the dataset/project ID present in `sanity.config.ts`).
3. Create the project in Vercel and trigger a deploy.

## Option 2 — GitHub Actions automated deployment to Vercel

1. In Vercel, create a new project or take note of the Vercel Org ID and Project ID (Settings → General → Project ID; Dashboard → Org Settings).
2. Add the following secrets to your GitHub repository (Settings → Secrets and variables → Actions):
   - `VERCEL_TOKEN` — Create a token via https://vercel.com/account/tokens
   - `VERCEL_ORG_ID` — Your Vercel organization ID
   - `VERCEL_PROJECT_ID` — The Vercel project ID for the Studio
3. The GitHub Actions workflow `.github/workflows/deploy-sanity-studio.yml` will run automatically on pushes to `sanity-studio/**` and deploy to Vercel using the secrets.

### Webhooks — Near-instant updates for your Next.js front-end

To make your Next.js site reflect Sanity content changes immediately, configure a Sanity webhook that calls a Next.js API route responsible for incremental revalidation. Steps:

1. There is an API endpoint located at `/api/revalidate` in the Next.js app that accepts POST requests and revalidates affected pages. The endpoint requires a secret (env var `SANITYWEBHOOKSECRET`) to authorize requests.
2. Add `SANITYWEBHOOKSECRET` to your Vercel project's Environment Variables (Settings → Environment Variables). Set the same value in the Sanity webhook's URL as `?secret=YOUR_SECRET_VALUE`.
3. Create a Sanity webhook via the Sanity management UI (Project → API → Webhooks) with the webhook URL similar to `https://your-site.vercel.app/api/revalidate?secret=YOUR_SECRET_VALUE`. Choose `create`, `update`, and `delete` triggers for the document types you want to revalidate (e.g., `project`, `service`, `blogPost`).
4. When a document is published from the Studio, Sanity will send a webhook payload that contains the changed document's slug and type; the Next.js webhook route will revalidate the paths related to that document (e.g., `/work/<slug>`, `/services/<slug>`, `/blog/<slug>`), plus index pages like `/work` or `/blog`.

Example Sanity webhook JSON payload (sanitised):

```json
{
   "id": "docId",
   "type": "create|update|delete",
   "document": {
      "_id": "docId",
      "_type": "project",
      "slug": { "current": "project-slug" },
      "title": "Example"
   }
}
```


## Option 3 — Sanity's deploy (sanity deploy)

1. Run the following locally (you must have the Sanity CLI & be authenticated):

```powershell
cd sanity-studio
npm ci
npm run deploy
```

This will upload a static build of the Studio to Sanity-hosted hosting and return a URL.

## Notes / Tips
- The Studio login is still authenticated by Sanity — visitors need to sign in to edit content.
- Sanity Studio build will detect mismatched local/runtime versions; you may upgrade/downgrade per the CLI prompts.
- If you want to make the Studio accessible via a custom subdomain (e.g., studio.yourdomain.com), set that in Vercel or Sanity hosting and configure CORS and CNAME DNS entries accordingly.
