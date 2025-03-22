
import { API_BASE_URL } from "@/config/api";

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  status: string;
  role_id: number;
  region_id: number;
  city: string;
  street: string;
  image: string | null;
  address: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  user_id: number;
  about: string;
  created_at: string;
  updated_at: string;
}

// Fetch all users
export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`);
    
    if (!response.ok) {
      throw new Error(`Error fetching users: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw error;
  }
};

// Fetch a specific user by ID
export const fetchUserById = async (id: number): Promise<User> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${id}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching user: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch user with ID ${id}:`, error);
    throw error;
  }
};

// Fetch all profiles
export const fetchProfiles = async (): Promise<Profile[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/profiles`);
    
    if (!response.ok) {
      throw new Error(`Error fetching profiles: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch profiles:", error);
    throw error;
  }
};

// Fetch a specific profile by user ID
export const fetchProfileByUserId = async (userId: number): Promise<Profile> => {
  try {
    const response = await fetch(`${API_BASE_URL}/profiles/${userId}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching profile: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch profile for user ID ${userId}:`, error);
    throw error;
  }
};
