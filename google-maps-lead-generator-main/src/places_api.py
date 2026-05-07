import os
import json
import requests
from .utils import USER_AGENTS


def get_coordinates(city):
    """
    Convert a city name to latitude and longitude coordinates.
    
    Args:
        city (str): Name of the city to geocode
        
    Returns:
        tuple: (latitude, longitude) if successful, (None, None) if not
    """
    try:
        response = requests.get(
            "https://nominatim.openstreetmap.org/search", 
            params={"q": city, "format": "json"}, 
            headers={"User-Agent": USER_AGENTS[2]}
        )
        data = response.json()
        if data:
            return {"lat": data[0]['lat'], "lon": data[0]['lon']}
        else:
            return None
    except Exception as e:
        print(f"Error getting coordinates: {e}")
        return None


def search_places(query, coords, num_pages=1):
    """
    Search for places using Serper Maps API.
    
    Args:
        query (str): Search query (e.g., "restaurants", "dentists")
        coords (dict): Latitude and longitude dict
        num_pages (int): Number of pages to request (20 results per page)
        
    Returns:
        list: List of places data from all pages combined
    """
    lat, lon = coords['lat'], coords['lon']
    
    headers = {
        'X-API-KEY': os.getenv("SERPER_API_KEY"),
        'Content-Type': 'application/json'
    }
    
    all_results = []
    
    try:
        # Make a separate request for each page
        for page in range(1, num_pages + 1):
            payload = {
                "q": query,
                "location": f"{lat},{lon}",
                "page": page
            }
            
            response = requests.post(
                "https://google.serper.dev/maps", 
                headers=headers, 
                data=json.dumps(payload)
            )
            
            if response.status_code == 200:
                result = response.json()
                if result:
                    all_results.append(result)
            else:
                print(f"Error: API returned status code {response.status_code} for page {page}")
        
        return all_results if all_results else []
            
    except Exception as e:
        print(f"Error making API request: {e}")
        return []
