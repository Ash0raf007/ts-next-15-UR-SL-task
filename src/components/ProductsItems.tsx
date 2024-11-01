"use client"
import React, { useState } from 'react'
import AddToCart from "@/components/AddToCart";
import  Image  from 'next/image';
import Link from "next/link";
import { Product } from '@/types/types';

interface ProductsItemsProps {
  products: Product[];
}

const ProductsItems: React.FC<ProductsItemsProps> = ({ products }) => {
  const itemsPerPage:number = 4;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  
  
    // Filter products based on the search query
    const filteredProducts = products.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
  const currentProducts:Product[] = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);

  };
  return (
    <div>
      <div className='flex items-center justify-center'>
          <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search products..."
          className="mb-4 mt-[20px] p-2 border border-blue-400 focus:outline-lime-700 rounded w-full max-w-[400px]"
        />
</div>
      <div className="container flex justify-center items-center sm:px-[10px] md:px-[50px] mt-[20px] ">
      
    <div className="flex flex-wrap items-center justify-center gap-[10px]">
      {currentProducts?.map((item) => (
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
          <Link href={`/all-products/${item.id}`} className="bg-slate-700 rounded-xl px-[5px] py-[5px] text-white">Show Details</Link>

          <AddToCart id={item.id}/>
          </div>
        </div>
      ))}
    </div>


    </div>

<div className="flex gap-4 items-center justify-center mt-[50px] mb-[20px]">
<button 
onClick={handlePrevious} disabled={currentPage === 1}
 className="w-[120px] py-2 border rounded disabled:opacity-50">
  Previous
</button>
<button
 onClick={handleNext}
  className="w-[120px] py-2 border rounded">
  Next
</button>
</div>
    </div>
  )
}

export default ProductsItems
