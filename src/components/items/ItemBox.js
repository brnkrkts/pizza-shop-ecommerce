/* eslint-disable @next/next/no-img-element */
import AddToCartButton from '@/components/items/AddToCartButton'

export default function ItemBox({ onAddToCart, ...item }) {
  const { image, description, name, price, sizes, extraIngredientsPrices } = item;
  const hasSizesOrExtras = sizes?.length > 0 || extraIngredientsPrices?.length > 0;
  return (
    <div
      className="bg-gray-300 hover:bg-white transition-all hover:shadow-2xl hover:shadow-black/25 p-4 rounded-lg text-center">
      <div className="text-center">
        <img className="max-h-auto max-w-24 block mx-auto" src={image} alt="pizza" />
      </div>
      <h4 className="font-semibold my-3">{name}</h4>
      <p className="text-gray-500 line-clamp-3">
        {description}
      </p>
      <AddToCartButton
        onClick={onAddToCart}
        price={price}
        hasSizesOrExtras={hasSizesOrExtras}
        image={image} />
    </div>
  )
}