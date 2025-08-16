
import { API_BASE_URL } from "@/config/api";

export interface Rate {
  id: number;
  num_star: number;
  comment: string;
  service_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
}

// Fetch all rates
export const fetchRates = async (token: string): Promise<Rate[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/rates`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`Error fetching rates: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch rates:", error);
    throw error;
  }
};

// Fetch a rate by ID
export const fetchRateById = async (id: number, token: string): Promise<Rate> => {
  try {
    const response = await fetch(`${API_BASE_URL}/rates/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`Error fetching rate: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch rate with ID ${id}:`, error);
    throw error;
  }
};

// Fetch rates for a specific provider
export const fetchProviderRates = async (providerId: number, token: string): Promise<any[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/rates?provider_id=${providerId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`Error fetching provider rates: ${response.status}`);
    }
    
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error(`Failed to fetch rates for provider ${providerId}:`, error);
    throw error;
  }
};
