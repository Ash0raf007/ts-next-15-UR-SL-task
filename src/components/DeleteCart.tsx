"use client";

import { deleteCartItems } from '@/app/api/axios';
import React from 'react';

type DeleteCartProps ={
  handleReset: () => void;
  id: number;
}

const DeleteCart = ({ handleReset, id }:DeleteCartProps) => {

const handelDelete=async()=>{
  try{
    const res=await deleteCartItems(id)
    console.log(res)
    handleReset()

  }catch(error){
    console.log(error)
  }

}
  return (
    <div onClick={handelDelete} className="cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2M6 6h12l-1 14H7L6 6z" />
      </svg>
    </div>
  );
};

export default DeleteCart;
