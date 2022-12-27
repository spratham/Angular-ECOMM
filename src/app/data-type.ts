export interface SignUp {
  name: string;
  password: string;
  email: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface Product {
  name: string;
  color: string;
  category: string;
  price: number;
  image: string;
  description: string;
}
