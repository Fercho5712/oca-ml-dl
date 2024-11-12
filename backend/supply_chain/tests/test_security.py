from django.test import TestCase, Client
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
import json

class SecurityTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(
            username='testuser', 
            password='testpass123'
        )
        self.client.login(username='testuser', password='testpass123')

    def test_sql_injection_prevention(self):
        """Test SQL injection prevention"""
        malicious_input = "' OR '1'='1"
        response = self.client.get(
            f"/api/locations/?search={malicious_input}"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.json()), 0)

    def test_xss_prevention(self):
        """Test XSS prevention"""
        xss_payload = "<script>alert('xss')</script>"
        data = {
            'department': xss_payload,
            'city': 'Test City',
            'distribution_center': 'Test Center',
            'crop_type': 'Test Crop'
        }
        response = self.client.post(
            reverse('location-list'),
            data=json.dumps(data),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertNotIn('<script>', response.json()['department'])

    def test_csrf_protection(self):
        """Test CSRF protection"""
        # Try to post without CSRF token
        client = Client(enforce_csrf_checks=True)
        response = client.post(
            reverse('location-list'),
            {'department': 'Test'}
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)