
import { API_BASE_URL } from "@/config/api";
import { Service, Category } from "@/types/api";

// Fetch all services
export const fetchServices = async (token?: string): Promise<Service[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/service/servicescard`);
    
    if (!response.ok) {
      throw new Error(`Error fetching services: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch services:", error);
    throw error;
  }
};

// Fetch a single service by ID
export const fetchServiceById = async (id: string | number): Promise<Service> => {
  try {
    const response = await fetch(`${API_BASE_URL}/service/servicecard/${id}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching service: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch service with ID ${id}:`, error);
    throw error;
  }
};

// Fetch services for a specific provider
export const fetchProviderServices = async (providerId: number, token: string): Promise<Service[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/services?provider_id=${providerId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`Error fetching provider services: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch services for provider ${providerId}:`, error);
    throw error;
  }
};

// Create a new service
export const createService = async (
  serviceData: FormData,
  token: string
): Promise<Service> => {
  try {
    const response = await fetch(`${API_BASE_URL}/services`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: serviceData,
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error creating service: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to create service:", error);
    throw error;
  }
};

// Update an existing service
export const updateService = async (
  id: number,
  serviceData: FormData,
  token: string
): Promise<Service> => {
  try {
    // For FormData with PUT requests, we need to append the _method field
    serviceData.append('_method', 'PUT');
    
    const response = await fetch(`${API_BASE_URL}/services/${id}`, {
      method: 'POST', // Actually using POST with _method=PUT for FormData
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: serviceData,
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error updating service: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to update service with ID ${id}:`, error);
    throw error;
  }
};

// Delete a service
export const deleteService = async (
  id: number,
  token: string
): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/services/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error deleting service: ${response.status}`);
    }
  } catch (error) {
    console.error(`Failed to delete service with ID ${id}:`, error);
    throw error;
  }
};

// Fetch all categories
export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`);
    
    if (!response.ok) {
      throw new Error(`Error fetching categories: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    throw error;
  }
};

// Fetch a category by ID
export const fetchCategoryById = async (id: string | number): Promise<Category> => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching category: ${response.status}`);
    }
    
    const data = await response.json();
    return Array.isArray(data) ? data[0] : data; // Handle the array response
  } catch (error) {
    console.error(`Failed to fetch category with ID ${id}:`, error);
    throw error;
  }
};
