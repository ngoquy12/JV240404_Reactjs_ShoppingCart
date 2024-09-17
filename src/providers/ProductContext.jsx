import React, { useState } from "react";
import ProductJson from "../db.json";
import { saveData } from "../utils/common";

// B1: Tạo ngữ cảnh
export const ProductProvider = React.createContext();

export default function ProductContext({ children }) {
  const [listProduct, setListProduct] = useState(() => {
    return ProductJson;
  });

  const [listCart, setListCart] = useState(() => {
    const cartLocals = JSON.parse(localStorage.getItem("carts")) || [];

    return cartLocals;
  });

  /**
   * Hàm thêm sản phẩm vào giỏ hàng
   * @param {*} product Đối tượng product
   * Auth: NVQUY (17/09/2024)
   */
  const handleAddToCart = (product) => {
    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
    const findProductByCarts = listCart.find(
      (item) => item.product.id === product.id
    );

    if (!findProductByCarts) {
      // Nếu chưa thì thêm vào kèm theo quantity = 1
      const updateCarts = [...listCart, { product, quantity: 1 }];

      setListCart(updateCarts);

      // Lưu dữ liệu lên local và state
      saveData("carts", updateCarts);
    } else {
      // Nếu đã tồn tại thì tăng quantity lên 1

      const updateCarts = listCart.map((cart) => {
        if (cart.product.id === product.id) {
          return { ...cart, quantity: (cart.quantity += 1) };
        }

        return cart;
      });

      setListCart(updateCarts);

      // Lưu dữ liệu lên local và state
      saveData("carts", updateCarts);
    }
  };

  const handleIncrease = () => {};

  return (
    <>
      <ProductProvider.Provider
        value={{ listProduct, handleAddToCart, listCart }}
      >
        {children}
      </ProductProvider.Provider>
    </>
  );
}
