export interface Cart {
    id: number;
    product: {
      id: number;
      name: string;
      price: number;
    };
    quantity: number;
  }