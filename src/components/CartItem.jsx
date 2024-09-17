import React from "react";

export default function CartItem({ cart }) {
  return (
    <>
      <li className="flex justify-between items-center">
        <div className="flex items-center gap-5">
          <img
            className="h-14 border p-1 w-14 object-cover rounded-full"
            src={cart.product.image}
            alt=""
          />
          <div>{cart.product.name}</div>
        </div>
        <div className="flex items-center gap-5">
          <div className="flex gap-3">
            <button className="h-6 leading-4 px-2 border rounded">+</button>
            <span>{cart.quantity}</span>
            <button className="h-6 leading-4 px-2 border rounded">-</button>
          </div>
          <i className="fa-solid fa-trash cursor-pointer p-2 hover:bg-slate-50 rounded-full hover:text-black" />
        </div>
      </li>
    </>
  );
}
