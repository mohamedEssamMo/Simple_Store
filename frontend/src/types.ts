export interface Product {
  _id?: string;       // optional if new product
  name: string;
  description: string;
  price?: number;     // optional if not used
  image?: string;     // optional if your product has an image
}
