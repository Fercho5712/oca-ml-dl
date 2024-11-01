import python_weather
import asyncio
import os
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Location
from .serializers import LocationSerializer
from agml.data import DataLoader
from agml.preprocessing import Preprocessor

class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

    @action(detail=False, methods=['get'])
    async def weather_forecast(self, request):
        client = python_weather.Client(unit=python_weather.METRIC)
        weather_data = []
        
        # Get weather for all unique cities
        for city in Location.objects.values_list('city', flat=True).distinct():
            try:
                weather = await client.get(f"{city}, Colombia")
                weather_data.append({
                    'city': city,
                    'temperature': weather.current.temperature,
                    'description': weather.current.description
                })
            except Exception as e:
                print(f"Error fetching weather for {city}: {str(e)}")
        
        await client.close()
        return Response(weather_data)

    @action(detail=False, methods=['get'])
    def crop_analysis(self, request):
        try:
            # Example using AgML for crop analysis
            data_loader = DataLoader()
            preprocessor = Preprocessor()
            
            # Here you would implement your specific AgML analysis
            # This is a placeholder that returns mock data
            analysis_data = {
                'crop_health_index': 0.85,
                'growth_prediction': 'positive',
                'recommended_actions': [
                    'Optimize irrigation schedule',
                    'Monitor soil nutrients'
                ]
            }
            
            return Response(analysis_data)
        except Exception as e:
            return Response({'error': str(e)}, status=500)