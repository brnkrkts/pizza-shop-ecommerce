import ImageHandle from '@/components/layout/ImageHandle'
import { useEffect, useState } from 'react';
import ItemPriceProps from '@/components/layout/ItemPriceProps'

export default function ItemForm({ onSubmit, menuItem }) {
  const [image, setImage] = useState(menuItem?.image || '');
  const [name, setName] = useState(menuItem?.name || '');
  const [description, setDescription] = useState(menuItem?.description || '');
  const [price, setPrice] = useState(menuItem?.price || '');
  const [sizes, setSizes] = useState(menuItem?.sizes || []);
  const [category, setCategory] = useState(menuItem?.category || '');
  const [extraIngredientsPrices, setExtraIngredientsPrices] = useState(menuItem?.extraIngredientsPrices || []);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('/api/categories').then(res => {
      res.json().then(categories => {
        setCategories(categories);
      });
    });
  }, []);

  return (
    <form
      onSubmit={ev =>
        onSubmit(ev, {
          image, name, description, price, sizes, extraIngredientsPrices, category,
        })
      }
      className='mt-8 max-w-2xl mx-auto'>
      <div className='md:grid items-start gap-4' style={{ gridTemplateColumns: '.3fr .7fr' }}>
        <div>
          <ImageHandle link={image} setLink={setImage} />
        </div>
        <div className='grow'>
          <label>Items Name</label>
          <input type='text'
            value={name}
            onChange={ev => setName(ev.target.value)} />
          <label>Item Description</label>
          <input type='text'
            value={description}
            onChange={ev => setDescription(ev.target.value)} />
          <label>Category</label>
          <select value={category} onChange={ev => setCategory(ev.target.value)}>
            {categories?.length > 0 && categories.map(x => (
              <option key={x._id} value={x._id}>{x.name}</option>
            ))}
          </select>
          <label>Item Price</label>
          <input type='text'
            value={price}
            onChange={ev => setPrice(ev.target.value)} />
          <ItemPriceProps
            name={"Sizes"}
            addLabel={'Add Size'}
            props={sizes}
            setProps={setSizes} />
          <ItemPriceProps
            name={"Ingredients"}
            addLabel={'Add Ingredients'}
            props={extraIngredientsPrices}
            setProps={setExtraIngredientsPrices} />
          <button type='submit'>Save</button>
        </div>
      </div>
    </form>
  );
}