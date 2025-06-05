import { useQuery } from "@apollo/client";
import React from "react";
import { FIND_ALL_CART_PRODUCTS } from "../graphql/queries";
import { Link } from "react-router-dom";

const Pay = () => {
  const { data, loading, error } = useQuery(FIND_ALL_CART_PRODUCTS);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error)
    return (
      <p className="text-center text-red-500">Error loading cart items.</p>
    );

  const cartItems = data?.findAllCartProduct || [];
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + Number(item.product.price) * Number(item.quantity),
    0
  );

  if (totalAmount == 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-gray-600">No items selected to buy.</p>
      </div>
    );
  }
  return (
    <div className="min-h-[80vh] bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-2xl font-bold mb-4">Payment</h2>
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow p-4 flex gap-4"
            >
              <img
                src={item.product.link}
                alt={item.product.name}
                width="170"
                style={{ maxHeight: "100px" }}
                className="object-contain"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{item.product.name}</h3>
                <p className="text-gray-700">Price: ${item.product.price}</p>
                <p className="text-gray-700">Quantity: {item.quantity}</p>
                <p className="text-blue-600 font-medium">
                  Subtotal: $
                  {Number(item.product.price) * Number(item.quantity)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="sticky top-6 h-fit bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex justify-between text-gray-700 text-sm"
              >
                <span>
                  {item.product.name} (x{item.quantity})
                </span>
                <span>{(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <hr className="my-4" />

          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Items ({cartItems.length})</span>
              <span>$ {totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span className="text-green-600">Free</span>
            </div>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>$ {totalAmount.toFixed(2)}</span>
          </div>

          <button className="cursor-pointer w-full mt-6 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded">
            Pay
          </button>

          <Link
            to="/products"
            className="block text-center text-sm text-blue-600 mt-4 hover:underline"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Pay;
