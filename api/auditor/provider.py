from abc import ABC, abstractmethod
from typing import List, Dict, Any

class CloudProvider(ABC):
    @abstractmethod
    def list_buckets(self) -> List[Dict[str, Any]]:
        """List all storage buckets (S3, Blob, etc.)"""
        pass

    @abstractmethod
    def list_instances(self) -> List[Dict[str, Any]]:
        """List all compute instances (EC2, VM, etc.)"""
        pass

    @abstractmethod
    def get_iam_policies(self) -> List[Dict[str, Any]]:
        """List IAM policies/roles"""
        pass

class MockProvider(CloudProvider):
    def list_buckets(self) -> List[Dict[str, Any]]:
        return [
            {"name": "production-logs", "public": True, "encryption": False},
            {"name": "backup-2025", "public": False, "encryption": True},
            {"name": "static-assets", "public": True, "encryption": False}
        ]

    def list_instances(self) -> List[Dict[str, Any]]:
        return [
            {"id": "i-123456", "state": "running", "public_ip": "1.2.3.4"},
            {"id": "i-789012", "state": "stopped", "public_ip": None}
        ]

    def get_iam_policies(self) -> List[Dict[str, Any]]:
        return [
            {"name": "AdminAccess", "effect": "Allow", "resource": "*"},
            {"name": "ReadOnly", "effect": "Allow", "resource": "s3:*"}
        ]
