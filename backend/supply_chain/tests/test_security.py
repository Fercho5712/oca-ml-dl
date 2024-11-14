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
        self.login_url = reverse('login')

    def test_brute_force_prevention(self):
        """Test brute force attack prevention"""
        for _ in range(6):  # Attempt more than allowed login tries
            response = self.client.post(self.login_url, {
                'username': 'testuser',
                'password': 'wrongpass'
            })
        
        # Next attempt should be blocked
        response = self.client.post(self.login_url, {
            'username': 'testuser',
            'password': 'testpass123'
        })
        self.assertEqual(response.status_code, status.HTTP_429_TOO_MANY_REQUESTS)

    def test_sql_injection_prevention(self):
        """Test SQL injection prevention in login"""
        malicious_inputs = [
            "' OR '1'='1",
            "admin'--",
            "' UNION SELECT username, password FROM users--",
            "'; DROP TABLE users--"
        ]
        
        for malicious_input in malicious_inputs:
            response = self.client.post(self.login_url, {
                'username': malicious_input,
                'password': malicious_input
            })
            self.assertNotEqual(response.status_code, status.HTTP_200_OK)

    def test_xss_prevention(self):
        """Test XSS prevention in login form"""
        xss_payload = "<script>alert('xss')</script>"
        response = self.client.post(self.login_url, {
            'username': xss_payload,
            'password': 'testpass123'
        })
        self.assertNotIn(xss_payload, str(response.content))

    def test_csrf_protection(self):
        """Test CSRF protection"""
        client = Client(enforce_csrf_checks=True)
        response = client.post(self.login_url, {
            'username': 'testuser',
            'password': 'testpass123'
        })
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_password_complexity(self):
        """Test password complexity requirements"""
        weak_passwords = ['123456', 'password', 'qwerty', 'abc123']
        for password in weak_passwords:
            response = self.client.post('/api/register/', {
                'username': 'newuser',
                'password': password
            })
            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)