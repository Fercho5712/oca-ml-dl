from django.test import TestCase
from ..models import Location

class LocationModelTests(TestCase):
    def setUp(self):
        self.location = Location.objects.create(
            department='Test Department',
            city='Test City',
            distribution_center='Test Center',
            crop_type='Test Crop',
            humidity=75.5
        )

    def test_location_creation(self):
        """Test the creation of a Location instance"""
        self.assertTrue(isinstance(self.location, Location))
        self.assertEqual(str(self.location), 'Test City, Test Department')

    def test_location_fields(self):
        """Test Location model fields"""
        self.assertEqual(self.location.department, 'Test Department')
        self.assertEqual(self.location.city, 'Test City')
        self.assertEqual(self.location.distribution_center, 'Test Center')
        self.assertEqual(self.location.crop_type, 'Test Crop')
        self.assertEqual(float(self.location.humidity), 75.5)