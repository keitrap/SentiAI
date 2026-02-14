# SentinAI - Quickstart Guide

## Prerequisites
- Node.js & npm
- Python 3.9+

## Setup Steps

1. **Install Python Dependencies**
   ```bash
   pip install -r api/requirements.txt
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```
   This starts the Next.js frontend at `http://localhost:3000` and the Python backend via Vercel Rewrites locally.

3. **Mock Mode**
   By default, the system runs in "Mock Mode" if no AWS keys are provided. You can test the audit flow by typing any policy into the dashboard (e.g., "Check S3 buckets").

4. **Authentication**
   To sign in, you need to configure Clerk keys in `.env.local`.

## Project Structure
- `src/app`: Frontend pages (Next.js)
- `src/components`: UI Components
- `api/`: Python Backend Logic
- `api/auditor`: Core compliance engine
