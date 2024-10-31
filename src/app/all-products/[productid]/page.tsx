"user server"
import React from 'react'
import Image from 'next/image'
import AddToCart from '@/components/AddToCart';
import { Product } from '@/types/types';
import { singleProduct } from '@/app/api/axios';



type ProductParams = {
  params: {
    productid: string;
  };
};
const Page = async ({ params }:ProductParams ): Promise<JSX.Element | null> => {


  let data: Product | null = null;
  const { productid } = await params; // Awaiting params here
  const userId: number = parseInt(productid); // Convert to number  
  try {

     const res = await singleProduct(userId);
    console.log(res.data, "Fetched Products");
     data= res.data
    } catch (error) {
    console.log("Error fetching products:", error);
    return null;
  }


return (
  <div className="px-[120px]">
    <div className='bg-slate-100 rounded-xl flex flex-col items-center mt-[20px] '>
<Image
              src={data?.thumbnail as string}
              alt="img"
              width={200}
              height={200}
              className="mb-2 rounded"
            />
            <hr className='w-full'/>

            <p className="text-center">{data?.title}</p>
            <hr className='w-full'/>

<p className="w-[400px] text-left">{data?.description}</p>
<hr className='w-full mb-[20px]'/>
<div className="flex gap-[30px] capitalize">
<p>category: {data?.category}</p>
<p>Price: ${data?.price.toFixed(2)}</p> 
<p>rating: {data?.rating}</p>
</div>

<AddToCart id={userId}/>

    </div>
    </div>
  )
}

export default Page