export interface IMedicineTypes {
  id: string;
  name: string;
  description: string;
  price: number;
  stocks: number;
  thumbnail: string | null;
  manufacturer: string;
  isActive: boolean;
  isFeatured: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
  category: {
    id: string;
    name: string;
  };
  seller: {
    id: string;
    name: string;
    email: string;
  };
  reviewCount: number;
  averageRating: number;
}

export interface IMedicineDetailsProps {
  medicine: {
    id: string;
    name: string;
    description: string;
    price: number;
    stocks: number;
    thumbnail: string | null;
    manufacturer: string;
    isActive: boolean;
    isFeatured: boolean;
    views: number;
    createdAt: string;
    updatedAt: string;
    category?: {
      id: string;
      name: string;
    };
    seller?: {
      id: string;
      name: string;
      email: string;
    };
    reviews: Array<{
      id: string;
      rating: number;
      comment: string;
      customer: {
        name: string;
      };
      createdAt: string;
    }>;
    _count: {
      reviews: number;
    };
  };
}
export interface IMedicine {
  id: string;
  name: string;
  description: string;
  price: number;
  stocks: number;
  thumbnail: string | null;
  manufacturer: string;
  isActive: boolean;
  isFeatured: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
  category?: {
    id: string;
    name: string;
  };
}

export interface IMedicineUpdateModelPorops {
  id: string;
  name: string;
  description: string;
  price: number;
  stocks: number;
  manufacturer: string;
  isFeatured: boolean;
  isActive: boolean;
}
