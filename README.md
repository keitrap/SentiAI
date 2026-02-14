# SentinAI - The Autonomous Cloud Compliance Auditor 🛡️

**SentinAI** is a next-generation security tool that lets you audit cloud infrastructure using **Natural Language**. 

Instead of writing complex SQL queries or navigating AWS dashboards, you simply tell SentinAI: 
> *"Ensure all S3 buckets are private and encrypted."*

## 🚀 How it Works
1.  **Natural Language Input**: You describe your compliance policy in plain English.
2.  **AI Parsing (Groq/Llama3)**: The AI translates your request into precise technical rules (e.g., `s3_bucket.public_access == False`).
3.  **Audit Engine**: The Python backend runs these rules against your cloud infrastructure (Mocked for this demo).
4.  **Risk Analysis**: The system calculates a security score and highlights critical violations.

## ⚡ Tech Stack (2026 Ready)
-   **Frontend**: Next.js 14, TypeScript, TailwindCSS, Framer Motion (Glassmorphism UI).
-   **Backend**: Python FastAPI (Serverless).
-   **AI**: Groq API (Llama 3 8b) for sub-second NLP parsing.
-   **Database**: Supabase (PostgreSQL) for audit history.
-   **Auth**: Clerk for secure user management.

## 🛠️ Features
-   **AI-Driven Policy Engine**: No need to learn Rego or custom query languages.
-   **Real-time Risk Scoring**: Instant feedback on your security posture.
-   **Mock Cloud Mode**: Simulates a real AWS environment for safe testing and demos.
-   **Audit History**: Tracks compliance over time.

## 📦 Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/your-username/sentinai.git
cd sentinai
npm install
pip install -r requirements.txt
```

### 2. Configure Environment
Create `.env.local` with your Clerk, Supabase, and Groq keys (see `.env.example`).

### 3. Run Locally
```bash
npm run dev
```
Visit `http://localhost:3000`.

## 🔮 Future Roadmap
-   Active AWS/Azure Integration (Boto3).
-   Auto-Remediation (AI fixes the bugs it finds).
-   PDF Report Generation.
