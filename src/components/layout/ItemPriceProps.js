import RemoveIcon from '@/components/icons/RemoveIcon'
import PlusIcon from '@/components/icons/Plus'
import UpDown from '@/components/icons/UpDown'
import { useState } from 'react';

export default function ItemPriceProps({ name, props, setProps, addLabel }) {
  const [isOpen, setIsOpen] = useState(false);

  function addProps() {
    setProps(oldProps => {
      return [...oldProps, { name: '', extraPrice: 0 }];
    });
  }

  function editProps(ev, index, prop) {
    const newValue = ev.target.value;
    setProps(prevSizes => {
      const newProps = [...prevSizes];
      newProps[index][prop] = newValue
      return newProps;
    });
  }

  function removeProp(removeIndex) {
    setProps(prev => prev.filter((v, index) => index !== removeIndex))
  }
  return (
    <div className='bg-gray-200 p-2 rounded-xl mb-2'>
      <div className='flex gap-1 items-center'>
        <div>
          <button type='button' onClick={() => setIsOpen(prev => !prev)}
            className='inline-flex p-1 border-transparent' >
            <UpDown className='h-6 w-6' />
            <span>{name}</span>
            <span> ({props?.length}) </span>
          </button>
        </div>
      </div>
      <div className={isOpen ? 'block' : 'hidden'}>
        {props?.length > 0 && props.map((size, index) => (
          <div key={index} className='flex items-end gap-2'>
            <div>
              <label>Name</label>
              <input type='text'
                placeholder='Size name'
                value={size.name}
                onChange={ev => editProps(ev, index, 'name')} />
            </div>
            <div>
              <label>Extra Price </label>
              <input type='number'
                placeholder='Extra price'
                value={size.extraPrice}
                onChange={ev => editProps(ev, index, 'extraPrice')} />
            </div>
            <div>
              <button type='button'
                onClick={() => removeProp(index)}
                className='bg-white mb-2 px-2 '><RemoveIcon /></button>
            </div>
          </div>
        ))}
        <div>
          <button
            type='button'
            onClick={addProps}
            className='bg-white items-center'>
            <PlusIcon className='w-5 h-5 ' /> {addLabel}
          </button>
        </div>
      </div>



    </div>
  );
}