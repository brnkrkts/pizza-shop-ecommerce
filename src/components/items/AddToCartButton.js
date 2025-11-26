import FlyingButton from 'react-flying-item';


export default function AddToCartButton({ hasSizesOrExtras, onClick, price, image }) {
  if (!hasSizesOrExtras) {
    return (
      <div className='flying-button-parent'>
        <FlyingButton src={image}
          targetTop={'5%'}
          targetLeft={'95%'} >
          <div onClick={onClick}>
            Add to cart ${price}
          </div>
        </FlyingButton>
      </div>

    )
  }
  return (
    <button type="button"
      onClick={onClick}
      className="mt-4 bg-primary text-white rounded-full px-8 py-2 ">
      <span>From ${price}</span>
    </button>
  )
}