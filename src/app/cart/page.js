'use client'
import { CartContext, cartProductPrice } from "@/components/AppContext";
import SectionHeader from "@/components/layout/SectionHeader";
import { useContext, useEffect, useState } from "react";
import AddressInputs from "@/components/layout/AddressInputs"
import { useProfile } from "@/components/UseProfile";
import toast from "react-hot-toast";
import CartProduct from '@/components/items/CartProduct'

export default function CartPage() {
  const { cartProducts, removeCartItem } = useContext(CartContext);
  const [address, setAddress] = useState({});
  const { data: profileData } = useProfile();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.href.includes('canceled=1')) {
        toast.error('Payment failed')
      }
    }
  }, [])

  useEffect(() => {
    if (profileData?.city) {
      const { phone, streetAddress, city } = profileData;
      const addressFromProfile = {
        phone, streetAddress, city
      }
      setAddress(addressFromProfile);
    }
  }, [profileData])

  let subTotal = 0;
  for (const p of cartProducts) {
    subTotal += cartProductPrice(p);
  }
  function handleAddressChange(propName, value) {
    setAddress(prevAddress => ({ ...prevAddress, [propName]: value }));
  }

  async function proceedToCheckout(ev) {
    ev.preventDefault();
    // address and shopping cart products

    const promise = new Promise((resolve, reject) => {
      fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          address,
          cartProducts,
        }),
      }).then(async (response) => {
        if (response.ok) {
          resolve();
          window.location = await response.json();
        } else {
          reject();
        }
      });
    });

    await toast.promise(promise, {
      loading: 'Preparing your order...',
      success: 'Redirecting to payment...',
      error: 'Something went wrong... Please try again later',
    })
  }

  if (cartProducts?.length === 0) {
    return (
      <section className="mt-8 text-center">
        <SectionHeader mainHeader="Cart" />
        <p className="mt-4">
          Your shopping cart is empty
        </p>
      </section>

    )
  }

  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeader mainHeader="Cart" />
      </div>
      <div className="mt-8 grid grid-cols-2 gap-8">
        <div>
          {cartProducts?.length === 0 && (
            <div>No product in your cart </div>
          )}
          {cartProducts?.length > 0 && cartProducts.map((product, index) => (
            <CartProduct key={index} product={product} onRemove={removeCartItem} />
          ))}
          <div className="py-2 pr-16 flex justify-end items-center">
            <div className="text-gray-500">
              Total: <br />
              Delivery: <br />
              Total:
            </div>
            <div className="font-semibold pl-2 text-right">
              ${subTotal} <br />
              $5 <br />
              $ {subTotal + 5}
            </div>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2>Checkout</h2>
          <form onSubmit={proceedToCheckout}>
            <AddressInputs
              addressPorps={address}
              setAddressProp={handleAddressChange}
            />
            <button type="submit">
              Pay ${subTotal + 5}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}