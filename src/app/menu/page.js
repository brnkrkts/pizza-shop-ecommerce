'use client'

import MenuItems from "@/components/items/MenuItem";
import SectionHeader from "@/components/layout/SectionHeader";
import { useEffect, useState } from "react"

export default function MenuPage() {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    fetch('api/categories').then(res => {
      res.json().then(categories => setCategories(categories));
    });
    fetch('/api/menu-items').then(res => {
      res.json().then(menuItems => setMenuItems(menuItems));
    })
  }, [])

  return (
    <section className="mt-8 ">
      {categories?.length > 0 && categories.map(c => (
        <div key={c._id}>
          <div className="text-center">
            <SectionHeader mainHeader={c.name} />
          </div>
          <div className="grid sm:grid-cols-3 gap-4 mt-8 mb-12">
            {menuItems.filter(item => item.category === c._id).map(item => (
              <MenuItems key={item._id} {...item} />
            ))}
          </div>

        </div>
      ))}
    </section>
  )
}