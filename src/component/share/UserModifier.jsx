import React, { useState } from "react";

const UserModifier = ({ order }) => {
  const [openId, setOpenId] = useState(null);

  if (!order?.modifier) return <div>Loading...</div>;

  console.log(order.modifier);
  console.log(openId);

  return (
    <div className="space-y-4">
      {order.modifier.map((modifier) => (
        <div key={modifier.id}>
          <div
            className="flex justify-between items-center p-4 cursor-pointer bg-gray-100"
            onClick={() =>
              setOpenId(openId === modifier.id ? null : modifier.id)
            }
          >
            <h3>
              {modifier.modifierinfo.mname}
              {modifier.modifierinfo.isrequired === 1 && (
                <span className="text-red-500 ml-1">(Required)</span>
              )}
            </h3>
            <span>{openId === modifier.id ? "-" : "+"}</span>
          </div>
          {openId === modifier.id && (
            <div className="p-4">
              {modifier.modifierinfo.option?.map((option) => (
                <div key={option.id} className="flex justify-between py-2">
                  <div>
                    <input type="radio" name={`one-${modifier.id}`} />
                    <span className="ml-2">{option.optionname}</span>
                    {option.qoh == 0 && (
                      <p className="text-red-500 text-sm">out of stock</p>
                    )}
                  </div>
                  <span>{option.price} QAR</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default UserModifier;
