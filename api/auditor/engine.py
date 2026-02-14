from typing import List, Dict, Any
from .provider import CloudProvider
from .ai import PolicyParser

class AuditEngine:
    def __init__(self, provider: CloudProvider):
        self.provider = provider
        self.ai = PolicyParser()

    def run_policy(self, policy_text: str) -> Dict[str, Any]:
        """
        Executes the audit based on natural language policy.
        1. AI parses text -> structured rules.
        2. Engine executes rules against Provider.
        """
        # Step 1: Parse Policy
        try:
            rules = self.ai.parse_policy(policy_text)
        except Exception:
            # Fallback for demo/error
            rules = []

        findings = []
        score = 100

        # Step 2: Execute Rules
        # If AI failed or returned empty, we might want a fallback or just return empty.
        
        for rule in rules:
            resource_type = rule.get("resource_type")
            check = rule.get("check")
            expect = rule.get("expect")
            severity = rule.get("severity", "MEDIUM")

            if resource_type == "s3_bucket":
                buckets = self.provider.list_buckets()
                for b in buckets:
                    # Check: public_access
                    if check == "public_access":
                        # If we expect public_access=False, but bucket has True
                        if b.get("public", False) != expect:
                            findings.append({
                                "id": "AI-S3-PUB",
                                "severity": severity,
                                "resource": b['name'],
                                "message": f"Policy violation: Bucket public access is {b.get('public')} (expected {expect})."
                            })
                            score -= 20 if severity == "CRITICAL" else 10
                    
                    # Check: encryption
                    elif check == "encryption":
                         if b.get("encryption", False) != expect:
                            findings.append({
                                "id": "AI-S3-ENC",
                                "severity": severity,
                                "resource": b['name'],
                                "message": f"Policy violation: Bucket encryption is {b.get('encryption')} (expected {expect})."
                            })
                            score -= 10

        # Heuristic scoring correction
        score = max(0, score)

        return {
            "score": score,
            "findings": findings,
            "ai_parsed_rules": rules 
        }
