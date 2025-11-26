'use client'
import Left from '@/components/icons/Left';
import UserTabs from '@/components/layout/UserTabs';
import { useProfile } from '@/components/UseProfile';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';
import {redirect} from "next/navigation";
import ItemForm from '@/components/layout/ItemForm';

export default function NewMenuItemPage() {
  const [redirectToItems, setRedirectToItems] = useState(false);
  const { loading, data } = useProfile();

  async function hadleFormSubmit(ev, data) {
    ev.preventDefault();
    const savingPromise = new Promise(async (
      resolve, reject) => {
      const response = await fetch(
        '/api/menu-items',
        {
          method: 'POST',
          body: JSON.stringify(data),
          headers: { 'Contet-Type': 'application/json' }
        });
      if (response.ok)
        resolve();
      else
        reject();
    });
    await toast.promise(savingPromise, {
      loading: 'Saving item...',
      success: 'Saved!',
      error: 'Sorry an error has occurred. Please try again.',
    });

    setRedirectToItems(true);
  }
  if (redirectToItems) {
    return redirect('/menu-items')
  }
  if (loading) {
    return 'Loading user info...'
  }
  if (!data.admin) {
    return 'Not an admin.'
  }
  return (
    <section>
      <UserTabs isAdmin={true} />
      <div className='max-w-2xl mx-auto mt-8 '>
        <Link href={'/menu-items'} className='button bg-primary'>
          <Left/>
          <span>Show all</span>
        </Link>
      </div>
      <ItemForm menuItem={null} onSubmit={hadleFormSubmit}/>
    </section>
  );
}