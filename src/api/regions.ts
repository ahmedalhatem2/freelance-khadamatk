// regions.ts

import { API_BASE_URL } from "@/config/api";

export interface Region {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

// Fetch all regions
export const fetchRegions = async (token: string): Promise<Region[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/regions`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
    });

    if (!response.ok) {
      throw new Error(`Error fetching regions: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch regions:", error);
    throw error;
  }
};

// Fetch a region by ID
export const fetchRegionById = async (id: number, token: string): Promise<Region> => {
  try {
    const response = await fetch(`${API_BASE_URL}/regions/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
    });

    if (!response.ok) {
      throw new Error(`Error fetching region: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch region with ID ${id}:`, error);
    throw error;
  }
};

// Create a new region
export const createRegion = async (regionData: { name: string }, token: string): Promise<Region> => {
  try {
    const response = await fetch(`${API_BASE_URL}/regions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(regionData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error creating region: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to create region:", error);
    throw error;
  }
};

// Update an existing region
export const updateRegion = async (
  id: number,
  regionData: { name: string },
  token: string
): Promise<Region> => {
  try {
    const response = await fetch(`${API_BASE_URL}/regions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(regionData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error updating region: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to update region with ID ${id}:`, error);
    throw error;
  }
};

// Delete a region
export const deleteRegion = async (
  id: number,
  token: string
): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/regions/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error deleting region: ${response.status}`);
    }
  } catch (error) {
    console.error(`Failed to delete region with ID ${id}:`, error);
    throw error;
  }
};
