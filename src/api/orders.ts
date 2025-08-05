import { API_BASE_URL } from "@/config/api";
import { Service } from "@/types/api";

export interface Order {
  id: number;
  user_id: number;
  service_provider_id: number;
  service_id: number;
  status: "pending" | "cancelled" | "in_progress" | "accepted" | "completed";
  comment: string | null;
  execution_time: string | null;
  accepted_at: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
  service?: Service;
}

export interface CreateOrderData {
  user_id: number;
  service_provider_id: number;
  service_id: number;
  comment?: string;
  execution_time?: string | null;
  status: "pending" | "cancelled" | "in_progress" | "accepted" | "completed";
  accepted_at?: string | null;
  completed_at?: string | null;
}

export interface UpdateOrderData {
  status?: "pending" | "cancelled" | "in_progress" | "accepted" | "completed";
  comment?: string;
  execution_time?: string | null;
  accepted_at?: string | null;
  completed_at?: string | null;
}

// Create a new order
export const createOrder = async (
  orderData: CreateOrderData,
  token: string
): Promise<Order> => {
  try {
    const response = await fetch(`${API_BASE_URL}/order/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `Error creating order: ${response.status}`
      );
    }

    const data = await response.json();
    return data[0]; // API returns order in index 0
  } catch (error) {
    console.error("Failed to create order:", error);
    throw error;
  }
};

// Update an existing order
export const updateOrder = async (
  orderId: number,
  orderData: UpdateOrderData,
  token: string
): Promise<Order> => {
  try {
    const response = await fetch(`${API_BASE_URL}/order/update/${orderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      // محاولة قراءة رسالة الخطأ
      let errorMessage = `Error updating order: ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (jsonError) {
        // إذا فشل في قراءة JSON، نستخدم النص العادي
        try {
          const errorText = await response.text();
          errorMessage = errorText || errorMessage;
        } catch (textError) {
          console.error("Failed to read error response:", textError);
        }
      }
      throw new Error(errorMessage);
    }

    // محاولة قراءة البيانات
    let data;
    try {
      const responseText = await response.text();

      if (responseText.trim()) {
        data = JSON.parse(responseText);
      } else {
        // إذا كانت الاستجابة فارغة، نرجع كائن فارغ
        data = [{}];
      }
    } catch (jsonError) {
      console.error("Failed to parse response JSON:", jsonError);
      // إذا فشل في تحليل JSON، نرجع كائن فارغ
      data = [{}];
    }

    return data[0] || {};
  } catch (error) {
    console.error("Failed to update order:", error);
    throw error;
  }
};

// Get order by ID
export const fetchOrderById = async (
  orderId: number,
  token: string
): Promise<Order> => {
  try {
    const response = await fetch(`${API_BASE_URL}/order/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `Error fetching order: ${response.status}`
      );
    }

    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error("Failed to fetch order:", error);
    throw error;
  }
};

// Get orders for provider (where user is the provider)
export const fetchProviderOrders = async (token: string): Promise<Order[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/order/provider`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message ||
          `Error fetching provider orders: ${response.status}`
      );
    }

    const data = await response.json();
    const orders = Array.isArray(data)
      ? data
      : data.data ||
        Object.values(data).filter((item) => typeof item === "object");
    return orders as Order[];
  } catch (error) {
    console.error("Failed to fetch provider orders:", error);
    throw error;
  }
};

// Get orders for client (where user is the client)
export const fetchClientOrders = async (token: string): Promise<Order[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/order/client`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      // محاولة قراءة رسالة الخطأ
      let errorMessage = `Error fetching client orders: ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (jsonError) {
        // إذا فشل في قراءة JSON، نستخدم النص العادي
        try {
          const errorText = await response.text();
          errorMessage = errorText || errorMessage;
        } catch (textError) {
          console.error("Failed to read error response:", textError);
        }
      }
      throw new Error(errorMessage);
    }

    // محاولة قراءة البيانات
    let data;
    try {
      const responseText = await response.text();

      if (responseText.trim()) {
        data = JSON.parse(responseText);
      } else {
        // إذا كانت الاستجابة فارغة، نرجع مصفوفة فارغة
        data = [];
      }
    } catch (jsonError) {
      console.error("Failed to parse response JSON:", jsonError);
      // إذا فشل في تحليل JSON، نرجع مصفوفة فارغة
      data = [];
    }

    const orders = Array.isArray(data)
      ? data
      : data.data ||
        Object.values(data).filter((item) => typeof item === "object");

    return orders as Order[];
  } catch (error) {
    console.error("Failed to fetch client orders:", error);
    throw error;
  }
};

// Get all orders (admin only)
export const fetchAllOrders = async (token: string): Promise<Order[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/order/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `Error fetching all orders: ${response.status}`
      );
    }

    const data = await response.json();
    const orders = Array.isArray(data)
      ? data
      : Object.values(data).filter((item) => typeof item === "object");
    return orders as Order[];
  } catch (error) {
    console.error("Failed to fetch all orders:", error);
    throw error;
  }
};
