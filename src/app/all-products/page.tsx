"use server"
// Next ts project
import { ProductsResponse, Product } from '@/types/types';
import { getAllProducts } from "../../../actions/allpAction";
import ProductsItems from "@/components/ProductsItems";

const Page=async () =>{
  let products: Product[] = [];

  try {
    const productData: ProductsResponse | null = await getAllProducts();
    products = productData?.products || [];
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }

  return (
    <>
    <ProductsItems products={products} />
</>
  );
};

export default Page;
