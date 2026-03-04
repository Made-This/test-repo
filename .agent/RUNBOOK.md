# RUNBOOK — Deploy & Troubleshooting

## Deploy Process

### Convex (Backend)
```bash
npx convex deploy --yes
```

### Vercel (Frontend)
Triggered via Vercel API or git push to main.

## Common Issues

### Build Fails
- Check TypeScript errors: `npx tsc --noEmit`
- Check Convex schema: `npx convex dev` locally

### Deploy Key Issues
- Verify CONVEX_DEPLOY_KEY is set
- Regenerate if expired

### Environment Variables
- Convex: set via dashboard or CLI
- Vercel: set via API or dashboard

## Rollback
- Vercel: promote previous deployment in dashboard
- Convex: redeploy previous commit
