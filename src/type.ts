export interface IFood {
  name: string;
  _id: number;
  slug: string;
  category: string;
  image: string;
  price: number;
  quantity?: number;
  prichard: boolean;
  rating: number;
  countInStock: number;
  description: string;
}
