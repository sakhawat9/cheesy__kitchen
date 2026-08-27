export interface IFood {
  _id: string;
  name: string;
  slug: string;
  category: string;
  shortDesc: string;
  description: string;
  image: string;
  price: number;
  rating: number;
  countInStock: number;
  /** Featured on the homepage. Field name kept for database compatibility. */
  prichard: boolean;
  quantity?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface IReview {
  _id: string;
  name: string;
  email: string;
  description: string;
  img: string;
  createdAt?: string;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  user: boolean;
  img?: string;
  token?: string;
}
