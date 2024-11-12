from django.test import TestCase, Client
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from ..models import Location
from django.contrib.auth.models import User

class LocationViewSetTests(APITestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(
            username='testuser', 
            password='testpass123'
        )
        self.client.login(username='testuser', password='testpass123')
        
        self.location = Location.objects.create(
            department='Test Department',
            city='Test City',
            distribution_center='Test Center',
            crop_type='Test Crop',
            humidity=75.5
        )

    def test_get_locations(self):
        """Test retrieving locations list"""
        response = self.client.get(reverse('location-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(response.data) > 0)

    def test_create_location(self):
        """Test creating a new location"""
        data = {
            'department': 'New Department',
            'city': 'New City',
            'distribution_center': 'New Center',
            'crop_type': 'New Crop',
            'humidity': 80.0
        }
        response = self.client.post(reverse('location-list'), data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Location.objects.count(), 2)

    def test_weather_forecast(self):
        """Test weather forecast endpoint"""
        response = self.client.get(reverse('location-weather-forecast'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(isinstance(response.data, list))

    def test_crop_analysis(self):
        """Test crop analysis endpoint"""
        response = self.client.get(reverse('location-crop-analysis'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('crop_health_index', response.data)