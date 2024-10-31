import axios from "axios"

const axiosInstance = axios.create({
  baseURL: `https://dummyjson.com`, 
  timeout: 50000,
})

type LoginCredentials = {
  username: string;
  password: number | string; 
}

export async function login ({
  username,
  password,
}:LoginCredentials) {
  return await axiosInstance.post(
    `/auth/login`,
    { username , password },
  );
}

export async function allProducts() {
  return await axiosInstance.get(`/products`)
}

export async function singleProduct(id:number) {

    return await axiosInstance.get(`/products/${id}`)

}

export async function addCart(userId: number, products: { id: number; quantity: number }[] | string) {
  const productArray = typeof products === 'string' ? [{ id: Number(products), quantity: 1 }] : products;

  return await axiosInstance.post(`/carts/add`, {
    userId,
    products: productArray,
  });
}

export async function CartItems() {
  return await axiosInstance.get(`/carts`)
}

export async function deleteCartItems(id:number) {
  return await axiosInstance.get(`/carts/${id}`)
}




    