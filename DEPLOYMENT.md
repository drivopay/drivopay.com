# DrivoPay Deployment Documentation

## Overview

DrivoPay is deployed to GitHub Pages using an automated CI/CD pipeline with GitHub Actions. The website is accessible at:
- **Primary Domain**: https://drivopay.com
- **Subdomain**: https://www.drivopay.com (redirects to primary)
- **GitHub Pages URL**: https://drivopay.github.io/drivopay.com (redirects to primary)

## Architecture

### Technology Stack
- **Framework**: Next.js 15.1.5 (React 19)
- **Styling**: Tailwind CSS 3.4
- **Animations**: Framer Motion 11.15
- **UI Components**: Radix UI + shadcn/ui
- **Build Output**: Static HTML/CSS/JS (Static Site Generation)
- **Hosting**: GitHub Pages
- **CI/CD**: GitHub Actions

### Deployment Method
- **Type**: Static site deployment via gh-pages branch
- **Build Type**: Legacy (automatic builds from gh-pages branch)
- **Custom Domain**: Configured with CNAME
- **HTTPS**: Enabled with GitHub-managed certificate

## Deployment Pipeline

### Trigger Conditions

The deployment pipeline (`/.github/workflows/deploy.yml`) is triggered by:

1. **Direct Push to Main Branch**
   ```bash
   git push origin main
   ```
   - Builds and deploys immediately

2. **Pull Request Merge to Main**
   ```bash
   # After PR is approved and merged via GitHub UI
   ```
   - Automatically builds and deploys

3. **Pull Request to Main** (Build Only)
   - Runs build to verify changes before merge
   - Does NOT deploy (only validates)

4. **Manual Trigger**
   ```bash
   # Via GitHub Actions UI or gh CLI
   gh workflow run deploy.yml --repo drivopay/drivopay.com
   ```

### Pipeline Stages

#### Stage 1: Build (Runs on all triggers)
1. **Checkout** - Clone repository code
2. **Setup Node.js** - Install Node.js 20 with npm cache
3. **Restore Next.js Cache** - Restore previous build cache for faster builds
4. **Install Dependencies** - Run `npm ci` to install exact versions
5. **Build Application** - Run `npm run build` to generate static files in `./out/`
6. **Upload Artifact** - Save build output for deployment stage

#### Stage 2: Deploy (Only on push to main or manual trigger)
1. **Download Artifact** - Retrieve build output from build stage
2. **Deploy to gh-pages** - Push build output to gh-pages branch
   - Adds CNAME file for custom domain
   - Commits with descriptive message
   - Pushes to gh-pages branch

#### Stage 3: GitHub Pages (Automatic)
1. **Build from gh-pages** - GitHub Pages automatically builds from gh-pages branch
2. **Deploy to CDN** - Content distributed globally
3. **Update DNS** - Content accessible via drivopay.com

### Build Configuration

**next.config.js**:
```javascript
const nextConfig = {
  output: 'export',           // Static site generation
  images: {
    unoptimized: true,        // Required for static export
  },
  trailingSlash: true,        // Required for GitHub Pages
  // GitHub Pages configuration
}
```

## DNS Configuration

### Domain: drivopay.com

**Required DNS Records**:

1. **Apex Domain (drivopay.com)**
   - Type: A
   - Name: @
   - Values (all 4 required):
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153

2. **WWW Subdomain (www.drivopay.com)**
   - Type: CNAME
   - Name: www
   - Value: drivopay.github.io

### HTTPS Certificate

- **Provider**: GitHub Pages (Let's Encrypt)
- **Status**: Approved
- **Domains**: drivopay.com, www.drivopay.com
- **Expiration**: 2026-04-12 (auto-renews)
- **Enforcement**: Enabled

## GitHub Pages Configuration

### Repository Settings

Navigate to: `Settings` → `Pages`

**Current Configuration**:
- **Source**: Deploy from a branch
- **Branch**: gh-pages
- **Folder**: / (root)
- **Custom domain**: drivopay.com
- **Enforce HTTPS**: Enabled

### Environment Configuration

**Environment**: `github-pages`
- **Protection Rules**: Branch policy (main branch only)
- **Deployment Branch Policy**: Custom (main branch)
- **Can admins bypass**: Yes

## Manual Deployment

### Using GitHub CLI

```bash
# Trigger deployment manually
gh workflow run deploy.yml --repo drivopay/drivopay.com

# Check deployment status
gh run list --repo drivopay/drivopay.com --limit 5

# View specific run logs
gh run view <RUN_ID> --repo drivopay/drivopay.com --log
```

### Using GitHub UI

1. Navigate to: https://github.com/drivopay/drivopay.com/actions
2. Select "Deploy to GitHub Pages" workflow
3. Click "Run workflow" button
4. Select branch: `main`
5. Click "Run workflow"

### Manual GitHub Pages Build Trigger

```bash
# Trigger GitHub Pages rebuild
gh api --method POST repos/drivopay/drivopay.com/pages/builds

# Check build status
gh api repos/drivopay/drivopay.com/pages/builds/latest
```

## Troubleshooting

### Build Failures

**Check logs**:
```bash
gh run list --repo drivopay/drivopay.com
gh run view <RUN_ID> --repo drivopay/drivopay.com --log
```

**Common issues**:
1. **TypeScript errors**: Fix type errors in code
2. **Missing dependencies**: Run `npm install` locally and test
3. **Build timeout**: Optimize build process or check for infinite loops

### Deployment Stuck

**Check GitHub Pages status**:
```bash
gh api repos/drivopay/drivopay.com/pages
```

**Solution**:
```bash
# Cancel stuck workflow
gh run cancel <RUN_ID> --repo drivopay/drivopay.com

# Trigger new deployment
gh workflow run deploy.yml --repo drivopay/drivopay.com
```

### Site Not Updating

**Clear cache and verify**:
1. Hard refresh browser: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. Check build completed: `gh run list --repo drivopay/drivopay.com`
3. Verify gh-pages branch: `git fetch origin gh-pages && git log origin/gh-pages -1`
4. Check GitHub Pages status: `gh api repos/drivopay/drivopay.com/pages`

### DNS Issues

**Verify DNS records**:
```bash
# Check apex domain
dig drivopay.com A +short

# Check www subdomain
dig www.drivopay.com CNAME +short

# Check HTTPS
curl -I https://drivopay.com
```

**Expected output**:
- Apex: 185.199.108.153 (and 3 others)
- WWW: drivopay.github.io
- HTTPS: HTTP/2 200

## Performance Optimization

### Build Time Optimization

1. **Next.js Cache**: Automatically cached via GitHub Actions
2. **Node Modules Cache**: npm dependencies cached by node-version
3. **Incremental Builds**: Only changed files are rebuilt

### Runtime Performance

1. **Static Generation**: All pages pre-rendered at build time
2. **CDN Distribution**: GitHub Pages CDN for global delivery
3. **Image Optimization**: Next.js Image component with priority loading
4. **Code Splitting**: Automatic by Next.js
5. **CSS Optimization**: Tailwind CSS purged and minified

## Monitoring

### Check Site Status

```bash
# Check main domain
curl -I https://drivopay.com

# Check www redirect
curl -I https://www.drivopay.com

# Check GitHub Pages URL redirect
curl -I https://drivopay.github.io/drivopay.com
```

### Check Build Status

```bash
# Recent deployments
gh run list --repo drivopay/drivopay.com --workflow="deploy.yml" --limit 5

# Pages build status
gh api repos/drivopay/drivopay.com/pages/builds/latest
```

### Analytics

- GitHub provides basic traffic analytics under: `Insights` → `Traffic`
- Add Google Analytics or similar for detailed metrics

## Rollback Procedure

### Rollback to Previous Deployment

```bash
# View recent commits on gh-pages
git fetch origin gh-pages
git log origin/gh-pages -5 --oneline

# Rollback gh-pages to previous commit
git checkout gh-pages
git reset --hard <PREVIOUS_COMMIT_HASH>
git push origin gh-pages --force

# Trigger GitHub Pages rebuild
gh api --method POST repos/drivopay/drivopay.com/pages/builds
```

### Rollback to Specific Version

```bash
# Find the commit you want to deploy
git log main --oneline

# Create a new branch from that commit
git checkout -b rollback-to-version <COMMIT_HASH>

# Push and deploy
git push origin rollback-to-version:main --force

# Or create a revert commit (safer)
git revert <BAD_COMMIT_HASH>
git push origin main
```

## Security

### Secrets Management

- **GITHUB_TOKEN**: Automatically provided by GitHub Actions
- **No custom secrets required**: All configuration is public

### Branch Protection

**Recommended settings for main branch**:
- Require pull request reviews before merging
- Require status checks to pass (build must succeed)
- Require branches to be up to date
- Restrict who can push to matching branches

### Dependency Security

```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Update dependencies
npm update
```

## Maintenance

### Regular Updates

```bash
# Update Next.js and dependencies
npm update next react react-dom

# Update all dependencies to latest
npx npm-check-updates -u
npm install

# Test locally
npm run dev
npm run build
```

### Clean Up Old Builds

```bash
# Delete old workflow runs (manually via GitHub UI)
# Or use gh CLI to delete old runs
gh run list --repo drivopay/drivopay.com --json databaseId -q '.[].databaseId' | \
  head -n -10 | \
  xargs -I {} gh api --method DELETE repos/drivopay/drivopay.com/actions/runs/{}
```

## Contact & Support

- **Repository**: https://github.com/drivopay/drivopay.com
- **Issues**: https://github.com/drivopay/drivopay.com/issues
- **GitHub Pages Docs**: https://docs.github.com/en/pages

## Changelog

### 2026-01-12
- Switched from GitHub Actions workflow deployment to gh-pages branch method
- Added mobile menu functionality
- Updated GitHub Actions to build on PRs and deploy on merge
- Created comprehensive deployment documentation
- Updated README with project information

### 2026-01-12 (Initial)
- Initial deployment setup
- Configured custom domain (drivopay.com)
- Set up HTTPS certificate
- Configured DNS records
