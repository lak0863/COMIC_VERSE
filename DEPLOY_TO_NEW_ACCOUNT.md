# Deploy to New GitHub Account - Step by Step

## Current Setup
- **Current Account:** Rohit232516
- **Current Repository:** COMIC_VERSE
- **New Account:** lak0863 (or your preferred account)

---

## Step 1: Create Repository in New Account

1. **Log in to your new GitHub account** (lak0863)
2. Click the **"+"** icon → **"New repository"**
3. Fill in:
   - **Repository name:** `COMIC_VERSE` (or any name you prefer)
   - **Description:** (optional) "Marvel & DC Comic Store"
   - **Visibility:** Public or Private
   - **DO NOT** initialize with README, .gitignore, or license
4. Click **"Create repository"**

**Note the repository name** - you'll need it in the next step!

---

## Step 2: Update Repository Name in Config (if different)

If your new repository has a **different name** than `COMIC_VERSE`, update `vite.config.js`:

1. Open `vite.config.js`
2. Change line 12:
   ```javascript
   base: process.env.GITHUB_PAGES === 'true' ? '/YOUR_NEW_REPO_NAME/' : '/',
   ```

**Example:** If your repo is `my-comic-store`:
```javascript
base: process.env.GITHUB_PAGES === 'true' ? '/my-comic-store/' : '/',
```

---

## Step 3: Update Git Remote

Run these commands (replace `lak0863` and `COMIC_VERSE` with your actual username and repo name):

```bash
# Remove old remote
git remote remove origin

# Add new remote
git remote add origin https://github.com/lak0863/COMIC_VERSE.git

# Verify it's set correctly
git remote -v
```

---

## Step 4: Push to New Repository

```bash
# Push all code to new repository
git push -u origin main
```

If you get authentication errors, you may need to:
- Use a Personal Access Token instead of password
- Or set up SSH keys

---

## Step 5: Enable GitHub Pages

1. Go to your new repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select **"GitHub Actions"**
4. Save

---

## Step 6: Wait for Deployment

1. Go to **Actions** tab
2. Wait for the workflow to complete (1-2 minutes)
3. Your site will be live at: `https://lak0863.github.io/COMIC_VERSE/`

---

## Alternative: Keep Both Accounts

If you want to keep the project in BOTH accounts:

### Option A: Add Second Remote
```bash
# Keep original remote
git remote -v  # Should show origin pointing to Rohit232516

# Add second remote with different name
git remote add newaccount https://github.com/lak0863/COMIC_VERSE.git

# Push to new account
git push newaccount main
```

### Option B: Fork the Repository
1. Go to https://github.com/Rohit232516/COMIC_VERSE
2. Click **"Fork"** button
3. Select your new account (lak0863)
4. The fork will automatically have the same setup

---

## Troubleshooting

### Authentication Issues
If `git push` fails:
- Use Personal Access Token: Settings → Developer settings → Personal access tokens → Generate new token
- Or use SSH: `git remote set-url origin git@github.com:lak0863/COMIC_VERSE.git`

### Repository Name Mismatch
- Make sure `vite.config.js` base path matches your repository name
- Update `getImagePath()` function in `ui.js` if repo name is different

### Images Not Loading
- Check that repository name in `vite.config.js` matches GitHub repo name
- Clear browser cache after deployment

---

## Quick Command Summary

```bash
# 1. Remove old remote
git remote remove origin

# 2. Add new remote (replace with your username/repo)
git remote add origin https://github.com/lak0863/COMIC_VERSE.git

# 3. Push code
git push -u origin main

# 4. Verify
git remote -v
```

---

**After deployment, your site will be at:**
`https://YOUR_NEW_USERNAME.github.io/YOUR_REPO_NAME/`

