'use client'
import Image from "next/image";
import MenuItems from "../items/MenuItem";
import SectionHeader from "./SectionHeader";
import { useEffect, useState } from "react";

export default function HomeMenu() {
  const [latestItems, setLatestItems] = useState([]);
  useEffect(() => {
    fetch('/api/menu-items').then(res => {
      res.json().then(MenuItems => {
        setLatestItems(MenuItems.slice(-3));
      });
    })
  }, [])

  return (
    <section className="">
      <div className="absolute left-0 right-0 w-full justify-start">
        <div className=" absolute left-0 -top-[70px] text-left -z-10">
          <Image src={'/sallad1.png'} width={109} height={189} alt={'sallad1'} />
        </div>
        <div className=" absolute -top-36 right-0 -z-10 " >
          <Image src={'/sallad2.png'} width={107} height={195} alt={'sallad2'} />
        </div>
      </div>
      <div className="text-center mb-4">
        <SectionHeader subHeader={'OUR BEST SELLERS'} mainHeader={'Menu'} />
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        {latestItems?.length > 0 && latestItems.map(item => (
          <MenuItems key={item._id} {...item} />
        ))}
      </div>
    </section>
  )
}