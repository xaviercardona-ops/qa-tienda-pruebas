export type Product = {
  id: string;
  name: string;
  emoji: string;
  price: number;
  stock: number;
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
};

export type CustomerInfo = {
  name: string;
  email: string;
  address: string;
};

export type OrderSummary = {
  orderNumber: number;
  items: CartItem[];
  subtotal: number;
  discountPct: number;
  discountAmount: number;
  iva: number;
  total: number;
  customer: CustomerInfo;
};
