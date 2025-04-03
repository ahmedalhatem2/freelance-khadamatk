
import { API_BASE_URL } from "@/config/api";

export interface Category {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

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
export const fetchCategoryById = async (id: number): Promise<Category> => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching category: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch category with ID ${id}:`, error);
    throw error;
  }
};

// Create a new category
export const createCategory = async (categoryData: { name: string }, token: string): Promise<Category> => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(categoryData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error creating category: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to create category:", error);
    throw error;
  }
};

// Update an existing category
export const updateCategory = async (
  id: number,
  categoryData: { name: string },
  token: string
): Promise<Category> => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(categoryData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error updating category: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to update category with ID ${id}:`, error);
    throw error;
  }
};

// Delete a category
export const deleteCategory = async (
  id: number,
  token: string
): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error deleting category: ${response.status}`);
    }
  } catch (error) {
    console.error(`Failed to delete category with ID ${id}:`, error);
    throw error;
  }
};
