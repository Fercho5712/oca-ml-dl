from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework import status
from ..models import Location

class PrivacyTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username='testuser', 
            password='testpass123'
        )
        self.client.force_authenticate(user=self.user)
        
        self.location = Location.objects.create(
            department='Test Department',
            city='Test City',
            distribution_center='Test Center',
            crop_type='Test Crop',
            humidity=75.5
        )

    def test_data_access_control(self):
        """Test that users can only access their authorized data"""
        # Create another user
        other_user = User.objects.create_user(
            username='otheruser', 
            password='otherpass123'
        )
        
        # Try to access data as unauthorized user
        self.client.force_authenticate(user=other_user)
        response = self.client.get(f'/api/locations/{self.location.id}/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_data_encryption(self):
        """Test that sensitive data is properly encrypted"""
        # Add sensitive data
        sensitive_location = Location.objects.create(
            department='Sensitive Dept',
            city='Sensitive City',
            distribution_center='Secret Center',
            crop_type='Special Crop',
            humidity=80.0
        )
        
        # Verify data is not stored in plain text
        from django.db import connection
        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT * FROM supply_chain_location WHERE id = %s",
                [sensitive_location.id]
            )
            row = cursor.fetchone()
            # Check that sensitive fields are not in plain text
            self.assertNotEqual(row[1], 'Sensitive Dept')