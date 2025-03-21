
export interface Category {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Region {
  id: number;
  name: string;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  region_id: number;
  region: Region;
}

export interface ProviderProfile {
  user_id: number;
  about: string;
  user: User;
}

export interface Rate {
  id: number;
  num_star: number;
  comment: string;
  service_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: number;
  title: string;
  desc: string;
  image: string | null;
  status: string;
  price: number;
  category_id: number;
  profile_provider_id: number;
  created_at: string;
  updated_at: string;
  rates_count: number;
  category: Category;
  profile: ProviderProfile;
  rates: Rate[];
}
