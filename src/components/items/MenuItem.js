import { useContext, useState } from "react";
import { CartContext } from "@/components/AppContext"
import ItemBox from '@/components/items/ItemBox'
import Image from "next/image";
import FlyingButton from 'react-flying-item';

export default function MenuItems(menuItem) {
  const {
    image, name, description, price, sizes, extraIngredientsPrices
  } = menuItem;
  const [
    selectedSize, setSelectedSize
  ] = useState(sizes?.[0] || null);
  const [selectedExtras, setSelectedExtras] = useState([])
  const [showPopup, setShowPopup] = useState(false);
  const { addToCart } = useContext(CartContext);
  async function handleAddToCartButton() {
    const hasOptions = sizes.length > 0 || extraIngredientsPrices.length > 0;
    if (hasOptions && !showPopup) {
      setShowPopup(true);
      return;
    }
    addToCart(menuItem, selectedSize, selectedExtras);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setShowPopup(false);
  }
  function handleExtraIngredient(ev, extraIngredient) {
    const checked = ev.target.checked;
    if (checked) {
      setSelectedExtras(prev => [...prev, extraIngredient])
    } else {
      setSelectedExtras(prev => {
        return prev.filter(e => e.name !== extraIngredient.name);
      });
    }
  }

  let selectedPrice = price;
  if (selectedSize) {
    selectedPrice += selectedSize.extraPrice;
  }
  if (selectedExtras?.length > 0) {
    for (const extra of selectedExtras) {
      selectedPrice += extra.extraPrice;
    }
  }

  return (
    <>
      {showPopup && (
        <div onClick={() => setShowPopup(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center ">
          <div className="my-8 bg-white p-2 rounded-lg max-w-md">
            <div onClick={ev => ev.stopPropagation()}
              className=" overflow-y-scroll p-2 "
              style={{ maxHeight: 'calc(100vh - 100px)' }}>
              <Image
                src={image}
                alt={name}
                width={500} height={500}
                className="mx-auto" />
              <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
              <p className="text-center text-gray-500 text-sm mb-2">
                {description}
              </p>
              {sizes?.length > 0 && (
                <div
                  className="py-2">
                  <h3 className="text-center text-gray-700">Pick your size</h3>
                  {sizes.map(size => (
                    <label key={size._id} className="flex gap-2 items-center p-4 border rounded-md mb-1 ">
                      <input
                        type="radio"
                        name="size"
                        onChange={() => setSelectedSize(size)}
                        checked={selectedSize?.name === size.name} />
                      {size.name} ${price + size.extraPrice}
                    </label>
                  ))}
                </div>
              )}
              {extraIngredientsPrices?.length > 0 && (
                <div
                  className="py-2">
                  <h3 className="text-center text-gray-700">Extras</h3>
                  {extraIngredientsPrices.map(extraIngredient => (
                    <label key={extraIngredient._id} className="flex gap-2 items-center p-4 border rounded-md mb-1 ">
                      <input type="checkbox" name={extraIngredient.name}
                        onChange={ev => handleExtraIngredient(ev, extraIngredient)}
                        checked={selectedExtras.map(e => e._id).includes(extraIngredient._id)} />
                      {extraIngredient.name} ${extraIngredient.extraPrice}
                    </label>
                  ))}
                </div>
              )}
              <FlyingButton
                targetTop={'5%'}
                targetLeft={'95%'}
                src={image}
              >
                <div onClick={handleAddToCartButton}
                  className="primary sticky bottom-2">
                  Add to cart ${selectedPrice}
                </div>
              </FlyingButton>

              <button
                onClick={() => setShowPopup(false)}
                className="mt-2">Cancel</button>
            </div>
          </div>
        </div>
      )}
      <ItemBox onAddToCart={handleAddToCartButton} {...menuItem} />
    </>
  );
}