import React from "react";
import { useState } from "react";

const UserModifier = ({ order }) => {
  console.log(order.modifier);

  if (!order?.modifier) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {order.modifier.map((item) => {
        return (
          <select key={item.id} className="w-full">
            <option value="">{item.modifierinfo.mname}</option>
            {item.modifierinfo?.option?.map((itemOption) => (
              <option key={itemOption.id}>{itemOption.optionname}</option>
            ))}
          </select>
        );
      })}
    </div>
  );
};

export default UserModifier;
