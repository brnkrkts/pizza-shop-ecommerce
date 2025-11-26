'use client'
import ImageHandle from "@/components/layout/ImageHandle"
import { useState } from "react";
import { useProfile } from "../UseProfile";
import AddressInputs from "@/components/layout/AddressInputs"

export default function UserForm({ user, onSave }) {
  const [userName, setUserName] = useState(user?.name || '');
  const [image, setImage] = useState(user?.image || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || '');
  const [city, setCity] = useState(user?.city || '');
  const [admin, setAdmin] = useState(user?.admin || false);
  const { data: loggedInUserData } = useProfile();

  function handleAddressChange(propName, value) {
    if (propName === 'city') setCity(value);
    if (propName === 'streetAddress') setStreetAddress(value);
    if (propName === 'phone') setPhone(value);
  }

  return (
    <div className="flex gap-4 items-start">
      <div>
        <div className=" p-4 rounded-xl ">
          <ImageHandle link={image} setLink={setImage} />
        </div>
      </div>
      <form className="grow"
        onSubmit={ev => onSave(ev, {
          name: userName, image, phone, streetAddress, city, admin
        })
        }>

        {loggedInUserData.admin && (
          <div>
            <label htmlFor="adminCb" className="p-2 gap-2 inline-flex mb-2 items-center " >
              <input id="adminCb" type="checkbox" value={'1'}
                checked={admin}
                onChange={ev => setAdmin(ev.target.checked)}
              />
              <span>Admin</span>
            </label>
          </div>
        )}
        <label>
          First and last name
        </label>
        <input type="text" placeholder="First and Last name"
          value={userName} onChange={ev => setUserName(ev.target.value)} />
        <label>Email</label>
        <input type="email" placeholder={"email"}
          disabled={true}
          value={user?.email} />
        <AddressInputs
          addressPorps={{ streetAddress, phone, city }}
          setAddressProp={handleAddressChange} />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}