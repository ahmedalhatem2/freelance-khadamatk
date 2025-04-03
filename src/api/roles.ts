
import { API_BASE_URL } from "@/config/api";

export interface Role {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

// Fetch all roles
export const fetchRoles = async (token: string): Promise<Role[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/roles`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`Error fetching roles: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch roles:", error);
    throw error;
  }
};

// Fetch a role by ID
export const fetchRoleById = async (id: number, token: string): Promise<Role> => {
  try {
    const response = await fetch(`${API_BASE_URL}/roles/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`Error fetching role: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch role with ID ${id}:`, error);
    throw error;
  }
};

// Create a new role
export const createRole = async (roleData: { name: string }, token: string): Promise<Role> => {
  try {
    const response = await fetch(`${API_BASE_URL}/roles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(roleData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error creating role: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to create role:", error);
    throw error;
  }
};

// Update an existing role
export const updateRole = async (
  id: number,
  roleData: { name: string },
  token: string
): Promise<Role> => {
  try {
    const response = await fetch(`${API_BASE_URL}/roles/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(roleData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error updating role: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to update role with ID ${id}:`, error);
    throw error;
  }
};

// Delete a role
export const deleteRole = async (
  id: number,
  token: string
): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/roles/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error deleting role: ${response.status}`);
    }
  } catch (error) {
    console.error(`Failed to delete role with ID ${id}:`, error);
    throw error;
  }
};
