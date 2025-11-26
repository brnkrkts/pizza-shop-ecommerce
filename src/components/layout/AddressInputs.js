export default function AddressInputs({ addressPorps, setAddressProp, disabled = false }) {
  const { phone, streetAddress, city } = addressPorps;
  return (
    <>
      <div>
        <label>Phone number</label>
        <input disabled={disabled} type="tel" placeholder="Phone number"
          value={phone || ''}
          onChange={ev => setAddressProp('phone', ev.target.value)} />
        <label>Street Address</label>
        <input disabled={disabled} type="text" placeholder="Street Address"
          value={streetAddress || ''}
          onChange={ev => setAddressProp('streetAddress', ev.target.value)} />
        <label>City</label>
        <input disabled={disabled} type="text" placeholder="City"
          value={city || ''}
          onChange={ev => setAddressProp('city', ev.target.value)} />
      </div>
    </>
  )
}