from fastapi import FastAPI
from pydantic import BaseModel
from .auditor.engine import AuditEngine
from .auditor.provider import MockProvider

app = FastAPI()

# Initialize Engine with Mock Provider for now
# mainly because we don't have real AWS keys yet
provider = MockProvider()
engine = AuditEngine(provider)

@app.get("/api/py/health")
def health_check():
    return {"status": "healthy", "service": "sentinai-backend"}

class AuditRequest(BaseModel):
    policy: str
    cloud_provider: str = "mock"

@app.post("/api/py/audit")
def trigger_audit(request: AuditRequest):
    # In a real app, we'd switch provider based on request.cloud_provider
    # and potentially initialize it with user's keys from DB/Session
    
    results = engine.run_policy(request.policy)
    
    return {
        "status": "completed",
        "policy_received": request.policy,
        "provider": request.cloud_provider,
        "risk_score": results["score"],
        "findings": results["findings"],
        "ai_debug": results.get("ai_parsed_rules", [])
    }
