"use client";
import { Target } from "lucide-react";
import React, { useState } from "react";

const ContactForm = ({
  onChange,
  errorscontact,
}: {
  errorscontact: string;
  onChange: (value: string | null, check: boolean) => void;
}) => {
  const [email, setemail] = useState("");
  const [checked, setChecked] = useState<boolean>(true);
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">Contact</h2>
      <form>
        <div className="col-span-2 w-full mb-1">
          <input
            type="email"
            onChange={(e) => {
              setemail(e.target.value);
              onChange(e.target.value, checked);
            }}
            placeholder="Email or mobile phone number"
            className="w-full border p-2 rounded-md mb-3"
          />
          {errorscontact && (
            <p className="text-red-500 text-sm mt-1">{errorscontact}</p>
          )}
        </div>
        <label className="flex text-sm items-center mb-4">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => {
              setChecked(e.target.checked);
              onChange(email, e.target.checked);
            }}
            className="mr-2"
          />
          Email me with news and offers
        </label>
      </form>
    </div>
  );
};

export default ContactForm;
