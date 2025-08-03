import { API_URL } from ".";
import { Rate } from "@/types/api";

// Function to create a new rate
export const createRate = async (
  providerId: string,
  num_star: number,
  comment: string,
  token: string
): Promise<Rate> => {
  try {
    const response = await fetch(`${API_URL}/users/${providerId}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ num_star, comment }),
    });

    if (!response.ok) {
      throw new Error("Failed to create rate");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating rate:", error);
    throw error;
  }
};

// Function to fetch all rates for a specific provider
export const fetchProviderReviews = async (providerId: string, token?: string): Promise<Rate[]> => {
  try {
    const headers: HeadersInit = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/users/${providerId}/reviews`, {
      headers,
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching provider reviews for ${providerId}:`, error);
    throw error;
  }
};
