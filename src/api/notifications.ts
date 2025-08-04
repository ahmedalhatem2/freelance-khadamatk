import { API_BASE_URL } from "@/config/api";

export interface NotificationData {
  type: string;
  title: string;
  message: string;
  data: {
    order_id?: number;
    user_name?: string;
    service_name?: string;
    order_status?: string;
    created_at?: string;
  };
}

export interface Notification {
  id: string;
  type: string;
  notifiable_type: string;
  notifiable_id: number;
  data: NotificationData;
  read_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface NotificationsResponse {
  notifications: Notification[];
  message: string;
}

export interface UnreadCountResponse {
  count: number;
  message: string;
}

// Get all notifications for the authenticated user
export const fetchNotifications = async (token: string): Promise<Notification[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/notifications`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error fetching notifications: ${response.status}`);
    }

    const data: NotificationsResponse = await response.json();
    return data.notifications || [];
  } catch (error) {
    console.error("Failed to fetch notifications:", error);
    throw error;
  }
};

// Get unread notifications count
export const fetchUnreadNotificationsCount = async (token: string): Promise<number> => {
  try {
    const response = await fetch(`${API_BASE_URL}/notification/unread-count`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error fetching unread count: ${response.status}`);
    }

    const data: UnreadCountResponse = await response.json();
    return data.count || 0;
  } catch (error) {
    console.error("Failed to fetch unread notifications count:", error);
    throw error;
  }
};

// Mark notification as read
export const markNotificationAsRead = async (notificationId: string, token: string): Promise<{ success: boolean }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/notification/${notificationId}/read`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Error marking notification as read: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to mark notification as read:", error);
    throw error;
  }
};