
import { API_BASE_URL } from "@/config/api";
import { Service, Category } from "@/types/api";

// Fetch all services
export const fetchServices = async (): Promise<Service[]> => {
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
    const response = await fetch(`${API_BASE_URL}/service/servicescard/${id}`);
    
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
