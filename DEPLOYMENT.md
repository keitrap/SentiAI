# Deployment Guide (Vercel)

## Prerequisites
- A [Vercel Account](https://vercel.com)
- A [GitHub Account](https://github.com)

## Steps

### 1. Push to GitHub
Since you have initialized the project locally, you need to push it to a new GitHub repository.
1. Create a **new repository** on GitHub (e.g., `sentinai-audit`).
2. Run these commands in your terminal:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/sentinai-audit.git
   git branch -M main
   git push -u origin main
   ```

### 2. Import to Vercel
1. Go to your [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **Add New > Project**.
3. Select **Import** next to your `sentinai-audit` repository.

### 3. Configure Project
- **Framework Preset**: Next.js (Automatic)
- **Root Directory**: `.` (Default)
- **Build Command**: `next build` (Default)

### 4. Environment Variables (Critical!)
Copy these values from your `.env.local` file and paste them into the Vercel **Environment Variables** section:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | `pk_test_...` |
| `CLERK_SECRET_KEY` | `sk_test_...` |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://...supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `sb_publishable_...` |
| `GROQ_API_KEY` | `gsk_...` |

### 5. Deploy
Click **Deploy**. Vercel will build the Python backend and Next.js frontend automatically.

## Updates
When you make changes locally:
1. `git add .`
2. `git commit -m "Update message"`
3. `git push`
Vercel will automatically redeploy!
