
"use server"
// Next ts project
import AddToCart from "@/components/AddToCart";
import { ProductsResponse, Product } from '@/types/types';
import  Image  from 'next/image';
import { getAllProducts } from "../../../actions/allpAction";
import Link from "next/link";

const Page=async () =>{
  let products: Product[] = [];

  try {
    const productData: ProductsResponse | null = await getAllProducts();
    products = productData?.products || [];
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }

  return (
    <div className="container flex justify-center items-center sm:px-[10px] md:px-[50px] mt-[20px] ">
    <div className="flex flex-wrap items-center justify-center gap-[10px]">
      {products.map((item) => (
        <div key={item.id} className="flex flex-col w-[350px] border py-[10px] rounded-xl transition-transform hover:bg-blue-300 cursor-pointer">
<div  className="flex justify-center overflow-hidden h-[200px]">
<Image
          src={item.images[0]} width={200} height={200} alt="ds"/>
</div>

          <div className="px-[10px]">
          <h1 className="text-center">{item.title}</h1>
          <p className="text-wrap text-clip text-left w-[290px]">{item.description}</p>
          </div>
          <div className="mt-[10px] flex items-center flex-col">
          <Link href={`/all-products/${item.id}`} className="">Show Details</Link>

          <AddToCart id={item.id}/>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Page;
