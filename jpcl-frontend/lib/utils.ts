// Utility functions for API calls and data handling
export const API_URL = "http://localhost:1337";

// Handle different image file extensions dynamically
export const getImageUrl = (imageData: any) => {
  if (!imageData) return null;
  
  // Handle both array and single image formats
  const image = Array.isArray(imageData) ? imageData[0] : imageData;
  if (!image?.url) return null;
  
  return `${API_URL}${image.url}`;
};

// Fetch data with error handling
export const fetchApiData = async (endpoint: string) => {
  try {
    const response = await fetch(`${API_URL}/api/${endpoint}?populate=*`);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    const json = await response.json();
    return json.data || [];
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
    return [];
  }
};

// Check if tender is expired
export const getTenderStatus = (closingDate: string, currentStatus?: string) => {
  const now = new Date();
  const deadline = new Date(closingDate);
  
  if (currentStatus === 'cancelled' || currentStatus === 'awarded') {
    return currentStatus;
  }
  
  return now > deadline ? 'expired' : 'active';
};

// Format date for display
export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};