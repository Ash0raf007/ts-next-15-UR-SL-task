import React from 'react'
import Image from 'next/image'; // Import Image from Next.js
import { CartItems } from '@/app/api/axios';
import { CartsResponse } from '@/types/CartTypes';
// import Loader from '@/components/Loader';

const Page = async() => {
  let data:CartsResponse|null=null

try{
const res=await CartItems()
data=res.data;

console.log(res,"dfdfdfdfd")
}catch(error){
  console.log(error,"dfdfdfdfd")
}  

  return (

    <div>
      <div className='h-[500px] overflow-y-scroll mt-[10px]'>
      {data?.carts?.map((cart) => (
        <div key={cart.id}>
          {cart.products.map((product) => (
            <div key={product.id}>
              <Image
                src={product?.thumbnail}
                alt="img"
                width={100} // Adjust width/height as needed
                height={100}
                className="mb-2 rounded"
              />
              <hr className="w-full" />

              <p className="">{product?.title}</p>
              <hr className="w-full" />

              <hr className="w-full mb-[20px]" />
              <div className="flex gap-[30px] capitalize">
                <p>Price: {product?.price}</p>
                <p>DiscountedTotal: {product?.discountedTotal}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
      </div>
      
      
      
    </div>
  )
}

export default Page