"use client";

import React, { useReducer } from 'react';
import Link from 'next/link';
import DeleteCart from './DeleteCart';
import { ID } from '@/types/types';
import { addCart } from '@/app/api/axios';

type CounterState = {
  count: number;
};
type UpdateCounter = {
  type: "increment" | "decrement";
  payload: number;
};
type ResetCounter = {
  type: "reset";
};
type CounterAction = UpdateCounter | ResetCounter;

const initialState: CounterState = { count: 0 };

const reducer = (state: CounterState, action: CounterAction): CounterState => {
  switch (action.type) {
    case "increment":
      return { count: state.count + action.payload };
    case "decrement":
      return { count: state.count - action.payload };
    case "reset":
      return initialState;
    default:
      return state;
  }
};

const AddToCart = ({ id }: ID) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleAdd =async()=>{
    try{
      const res =await  addCart(id, [{ id, quantity: 1 }])
      dispatch({ type: "increment", payload: 1 });

      console.log(res)

    }catch(error){
      console.log(error)
    }

  }


  const handleReset = () => {
    dispatch({ type: "reset" });
  };

  return (
    <div className="flex">
      <div className="mt-[5px]">
        {state.count === 0 ? (
          <div className="mt-[20px]">
            <button
              className="rounded-xl text-white bg-red-500 p-[10px] mb-[20px]"
          onClick={handleAdd}
          >
              Add To Cart
            </button>
          </div>
        ) : null}
      </div>
      {state.count > 0 && (
        <div className="flex gap-[20px] flex-col items-center">
          <div className="flex items-center gap-[10px] text-center">
            <p className="text-lg cursor-pointer rounded-xl bg-slate-300 w-[30px]" onClick={() => dispatch({ type: "increment", payload: 1 })}>+</p>
            <p className="text-lg mx-2">{state.count}</p>
            <p className="text-lg cursor-pointer rounded-xl bg-slate-300 w-[30px]" onClick={() => dispatch({ type: "decrement", payload: 1 })}>-</p>
          </div>
          <div className="flex items-center gap-[20px]">
            <DeleteCart
              handleReset={handleReset}
              id={id}
            />
            <Link href="/all-product/cart" className="bg-red-500 p-[10px] flex justify-end text-white rounded-xl">Go TO Cart</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddToCart;
