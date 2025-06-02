import React, { useState } from "react";

const DeliveryDetails = ({
  errorsfirstname,
  errorslastname,
  errorscity,
  errorsaddress,
  errorsphone,
  onChange,
}: {
  errorsfirstname: string;
  errorslastname: string;
  errorsaddress: string;
  errorscity: string;
  errorsphone: string;
  onChange: (
    country: string,
    firstname: string,
    lastname: string,
    address: string,
    city: string,
    postalcode: string,
    phone: string
  ) => void;
}) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalcode, setPostalcode] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("Kenya");
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">Delivery</h2>
      <form className="grid grid-cols-2 gap-4">
        <select
          onChange={(e) => {
            setCountry(e.target.value);
            onChange(
              e.target.value,
              firstname,
              lastname,
              address,
              city,
              postalcode,
              phone
            );
          }}
          className="col-span-2 border p-2 rounded-md"
        >
          <option value="kenya">Kenya</option>
          <option value="uganda">Uganda</option>
        </select>

        <div>
          <input
            type="text"
            onChange={(e) => {
              setFirstname(e.target.value);
              onChange(
                country,
                e.target.value,
                lastname,
                address,
                city,
                postalcode,
                phone
              );
            }}
            placeholder="First name"
            className="border p-2 rounded-md w-full"
          />
          {errorsfirstname && (
            <p className="text-red-500 text-sm mt-1">{errorsfirstname}</p>
          )}
        </div>
        <div>
          <input
            type="text"
            onChange={(e) => {
              setLastname(e.target.value);
              onChange(
                country,
                firstname,
                e.target.value,
                address,
                city,
                postalcode,
                phone
              );
            }}
            placeholder="Last name"
            className="border p-2 rounded-md w-full"
          />
          {errorslastname && (
            <p className="text-red-500 text-sm mt-1">{errorslastname}</p>
          )}
        </div>
        <div className="col-span-2 w-full">
          <input
            type="text"
            onChange={(e) => {
              setAddress(e.target.value);
              onChange(
                country,
                firstname,
                lastname,
                e.target.value,
                city,
                postalcode,
                phone
              );
            }}
            placeholder="Address"
            className="col-span-2 border p-2 rounded-md w-full"
          />
          {errorsaddress && (
            <p className="text-red-500 text-sm mt-1">{errorsaddress}</p>
          )}
        </div>
        <div>
          <input
            type="text"
            onChange={(e) => {
              setCity(e.target.value);
              onChange(
                country,
                firstname,
                lastname,
                address,
                e.target.value,
                postalcode,
                phone
              );
            }}
            placeholder="City"
            className="border p-2 rounded-md w-full"
          />
          {errorscity && (
            <p className="text-red-500 text-sm mt-1">{errorscity}</p>
          )}
        </div>
        <input
          type="text"
          onChange={(e) => {
            setPostalcode(e.target.value);
            onChange(
              country,
              firstname,
              lastname,
              address,
              city,
              e.target.value,
              phone
            );
          }}
          placeholder="Postal code (optional)"
          className="border p-2 rounded-md"
        />
        <div className="col-span-2 w-full">
          <input
            type="text"
            onChange={(e) => {
              setPhone(e.target.value);
              onChange(
                country,
                firstname,
                lastname,
                address,
                city,
                postalcode,
                e.target.value
              );
            }}
            placeholder="Phone"
            className="border p-2 rounded-md w-full"
          />
          {errorsphone && (
            <p className="text-red-500 text-sm mt-1">{errorsphone}</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default DeliveryDetails;
