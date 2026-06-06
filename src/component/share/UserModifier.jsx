import React, { useEffect, useState } from "react";

const UserModifier = ({ order }) => {
  const [openId, setOpenId] = useState(null);

  const [product, setProduct] = useState([]);

  const [select, setSelect] = useState(null);

  console.log(order.modifier);

  useEffect(() => {
    if (order?.modifier) {
      setProduct(order.modifier);
    }
    console.log(product);
  }, [order]);

  const openHandle = (id) => {
    const handleOpen = product.map((item) =>
      item.id == id ? { ...item, open: !item.open } : item,
    );
    setProduct(handleOpen);
  };

  // console.log(openId);

  if (!order?.modifier) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      {product.map((modifier) => (
        <div key={modifier.id}>
          <div
            className="flex justify-between items-center p-4 cursor-pointer bg-gray-100"
            onClick={() => {
              openHandle(modifier.id);
            }}
          >
            <h3>
              {modifier.modifierinfo.mname}
              {modifier.modifierinfo.isrequired === 1 && (
                <span className="text-red-500 ml-1">(Required)</span>
              )}
            </h3>
            <span>{openId === modifier.id ? "-" : "+"}</span>
          </div>
          {modifier.open && (
            <div className="p-4">
              {modifier.modifierinfo.option?.map((option) => (
                <div key={option.id} className="flex justify-between py-2">
                  <div>
                    <input
                      type={
                        (option.isprice == 1) & (option.option_type == 1)
                          ? "checkbox"
                          : "radio"
                      }
                      name={option.modifier_id}
                      // checked={true}
                      disabled={option.qoh === 0}
                      onClick={() => {
                        setSelect(select === option.id ? null : option.id);
                      }}
                    />
                    <span className="ml-2">{option.optionname}</span>

                    {select === option.id &&
                      option.child?.map((childOption) => (
                        <div key={childOption.id}>
                          <input
                            checked={true}
                            type={
                              childOption.option_type == 0
                                ? "checkbox"
                                : "radio"
                            }
                            name={childOption.modifier_id}
                          />
                          <span>{childOption.optionname}</span>
                        </div>
                      ))}

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
