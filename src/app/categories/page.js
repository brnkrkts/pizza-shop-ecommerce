'use client';
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DeleteButton from '@/components/DeleteButton';

export default function CategoriesPage() {

  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const {
    loading: profileLoading, data: profileData } = useProfile();
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    fetchCategory();
  }, []);

  function fetchCategory() {
    fetch('/api/categories').then(res => {
      res.json().then(categories => {
        setCategories(categories);
      });
    });
  }

  async function handleNewCategorySubmit(ev) {
    ev.preventDefault();
    const creationPromise = new Promise(async (resolve, reject) => {
      const data = { name: categoryName };
      if (activeCategory) {
        data._id = activeCategory._id;
      }
      const response = await fetch('/api/categories', {
        method: activeCategory ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setCategoryName('');
      fetchCategory();
      setActiveCategory(null)
      if (response.ok)
        resolve();
      else
        reject();
    });
    toast.promise(creationPromise, {
      loading:
        activeCategory ? 'Updating category...' : 'Creating your new category...',
      success:
        activeCategory ? 'Category updated!' : 'Category created!',
      error: 'Something went wrong, please try again again.',
    });
  }

  async function handleDeleteClick(_id) {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/categories?_id=' + _id, {
        method: 'DELETE',
      });
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });
    await toast.promise(promise, {
      loading: 'Deleting...',
      success: 'Deleted',
      error: 'Error',
    });
    fetchCategory();
  }

  if (profileLoading) {
    return 'Loading user info...'
  };
  if (!profileData.admin) {
    return 'Not a admin'
  };

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />
      <form className="mt-8" onSubmit={handleNewCategorySubmit}>
        <div
          className="flex gap-2 items-end">
          <div className="grow">
            <label >
              {activeCategory ? 'Update Category' : 'New category name'}
              {activeCategory && (
                <>: <b>{activeCategory.name}</b>  </>
              )}
            </label>
            <input type="text" value={categoryName}
              onChange={ev => setCategoryName(ev.target.value)} />
          </div>
          <div className="pb-2 gap-1 flex">
            <button type="submit"
              className="border border-primary" >
              {activeCategory ? 'Update' : 'Create'}
            </button>
            <button type="button"
              onClick={() => {
                setActiveCategory(null)
                setCategoryName('')
              }} >
              Cancel
            </button>
          </div>
        </div>
      </form>
      <div>
        <h2 className="mt-8 text-sm text-gray-500">Existing Categories:</h2>
        {categories?.length > 0 && categories.map(x => (
          <div key={x._id}
            className="bg-primary rounded-full p-2 px-4 flex gap-2  mb-2 text-white border-gray-300 items-center">
            <div className="grow">
              {x.name}
            </div>
            <div className="flex gap-1">
              <button className="text-white" type="button"
                onClick={() => {
                  setActiveCategory(x);
                  setCategoryName(x.name);
                }}>
                Edit
              </button>
              <DeleteButton
                label='Delete'
                onDelete={()=>  handleDeleteClick(x._id)} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

