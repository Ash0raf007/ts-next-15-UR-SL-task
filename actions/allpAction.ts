"use server"

import { ProductsResponse } from "@/types/types";
import { allProducts } from "../src/app/api/axios";



export const getAllProducts = async (): Promise<ProductsResponse | null> => {
  try {
    const res = await allProducts();
    console.log(res.data, "Fetched Products");
    return res.data;
  } catch (error) {
    console.log("Error fetching products:", error);
    return null;
  }
};