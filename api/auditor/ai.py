import os
from groq import Groq
from typing import List, Dict, Any
import json

class PolicyParser:
    def __init__(self):
        self.client = Groq(
            api_key=os.environ.get("GROQ_API_KEY"),
        )

    def parse_policy(self, policy_text: str) -> List[Dict[str, Any]]:
        """
        Uses Llama3 (via Groq) to convert natural language policy into structured audit rules.
        """
        system_prompt = """
        You are a Cybersecurity Audit Expert. 
        Convert the user's natural language compliance policy into a JSON list of technical checks.
        
        Supported Resource Types: "s3_bucket", "ec2_instance", "iam_policy"
        Supported Checks: 
        - "public_access" (boolean)
        - "encryption" (boolean)
        - "mfa_enabled" (boolean)
        
        Output Format (JSON Only):
        [
            {"resource_type": "s3_bucket", "check": "public_access", "expect": false, "severity": "CRITICAL"},
            {"resource_type": "s3_bucket", "check": "encryption", "expect": true, "severity": "HIGH"}
        ]
        """

        try:
            chat_completion = self.client.chat.completions.create(
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": policy_text}
                ],
                model="llama3-8b-8192",
                temperature=0,
                response_format={"type": "json_object"},
            )
            
            # Extract JSON from response
            content = chat_completion.choices[0].message.content
            # Groq's JSON mode usually returns an object, we need to handle potential wrapping
            data = json.loads(content)
            
            # If the model wraps it in a key like "checks", extract it. Otherwise expect a list.
            if isinstance(data, dict):
                 # Look for common keys if the model decided to wrap the list
                 for key in ["checks", "rules", "policy"]:
                     if key in data:
                         return data[key]
                 # If no known key, maybe the dict itself is a single rule? Unlikely with the prompt.
                 # Fallback: return empty or try to interpret
                 return []
            
            return data

        except Exception as e:
            print(f"AI Parsing Error: {e}")
            # Fallback to keyword matching if AI fails
            return []
