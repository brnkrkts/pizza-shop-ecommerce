import Image from "next/image";
import RemoveIcon from "@/components/icons/RemoveIcon";
import { CartContext, cartProductPrice } from "@/components/AppContext";

export default function CartProduct({ product, onRemove }) {
  return (
    <div key={product._id} className="flex items-center gap-4 mb-2 py-2 border-b" >
      <div className="w-24">
        <Image src={product.image} width={240} height={240} alt={""} />
      </div>
      <div className="grow">
        <h3 className="font-bold">
          {product.name}
        </h3>
        {product.size && (
          <div className="text-md ">
            Size: <span>{product.size.name}</span>
          </div>
        )}
        {product.extras?.length > 0 && (
          <div>
            Extras:
            {product.extras.map(extra => (
              <div key={extra._id} className="text-sm text-gray-500">
                {extra.name}: ${extra.extraPrice}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="text-lg font-semibold">
        ${cartProductPrice(product)}
      </div>
      {!!onRemove && (
        <div className="ml-2">
          <button type="button"
            onClick={() => onRemove(index)}
            className="p-2" >
            <RemoveIcon />
          </button>
        </div>
      )}

    </div>
  )
}