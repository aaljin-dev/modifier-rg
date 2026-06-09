import React, { useEffect, useState } from "react";

const UserModifier = ({ order }) => {
  const [product, setProduct] = useState([]);

  const [showButton, setShowButton] = useState([]);

  const [orderOn, setOrderOn] = useState(1);

  const buttonOpen = (optionId, modifierId) => {
    const updated = product.map((modifier) => {
      if (modifier.id !== modifierId) return modifier;

      return {
        ...modifier,
        modifierinfo: {
          ...modifier.modifierinfo,
          option: modifier.modifierinfo.option.map((option) => {
            const isCheckbox = option.option_type == "1" && option.isprice == 1;

            // Checkbox
            if (isCheckbox) {
              return option.id === optionId
                ? {
                    ...option,
                    checked: !option.checked,
                    open: !option.open,
                  }
                : option;
            }

            // Radio
            return option.id === optionId
              ? {
                  ...option,
                  checked: !option.checked,
                  open: !option.open,
                  child: option.checked
                    ? option.child?.map((child) => ({
                        ...child,
                        checked: false,
                      }))
                    : option.child,
                }
              : {
                  ...option,
                  checked: false,
                  open: false,
                  child: option.child?.map((child) => ({
                    ...child,
                    checked: false,
                  })),
                };
          }),
        },
      };
    });

    setProduct(updated);
  };
  const childButton = (childId, parentId, sectionId) => {
    const update = product.map((modifier) => {
      if (modifier.id !== sectionId) return modifier;

      return {
        ...modifier,
        modifierinfo: {
          ...modifier.modifierinfo,
          option: modifier.modifierinfo.option.map((option) => {
            if (option.id !== parentId) return option;

            return {
              ...option,
              child: option.child.map((child) => {
                const isCheckbox = child.option_type == "0";

                if (isCheckbox) {
                  return child.id === childId
                    ? {
                        ...child,
                        checked: !child.checked,
                      }
                    : child;
                }

                // Radio => single select
                return child.id === childId
                  ? {
                      ...child,
                      checked: true,
                    }
                  : {
                      ...child,
                      checked: false,
                    };
              }),
            };
          }),
        },
      };
    });

    setProduct(update);
  };

  useEffect(() => {
    if (order?.modifier) {
      setProduct(order.modifier);
    }
  }, [order]);

  console.log("ful", product);

  const openHandle = (id) => {
    console.log(id);

    const handleOpen = product.map((item) =>
      item.id == id ? { ...item, open: !item.open } : item,
    );
    setProduct(handleOpen);
  };

  //order count start
  const orderCountAdd = (id) => {
    const updated = product.map((modifier) => ({
      ...modifier,
      modifierinfo: {
        ...modifier.modifierinfo,
        option: modifier.modifierinfo.option.map((parent) =>
          parent.id === id
            ? {
                ...parent,
                quantity: (parent.quantity || 1) + 1,
              }
            : // next logic build here
              parent,
        ),
      },
    }));

    setProduct(updated);
  };

  const orderCountSub = (id) => {
    const updated = product.map((modifier) => ({
      ...modifier,
      modifierinfo: {
        ...modifier.modifierinfo,
        option: modifier.modifierinfo.option.map((parent) =>
          parent.id === id
            ? {
                ...parent,
                quantity: (parent.quantity || 1) - 1,
              }
            : parent,
        ),
      },
    }));

    setProduct(updated);
  };

  if (!order?.modifier) return <div>Loading...</div>;

  return (
    <div className="space-y-4 w-full">
      {/* secation */}
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
            <span>{modifier.open ? "-" : "+"}</span>
          </div>
          {
            <div className="p-4">
              {/* parent */}
              {modifier.open &&
                modifier.modifierinfo.option?.map((option) => (
                  <div key={option.id} className="flex justify-between py-2">
                    <div>
                      <div>
                        <div>
                          <input
                            type={
                              option.isprice == 1 && option.option_type == 1
                                ? "checkbox"
                                : "radio"
                            }
                            name={option.modifier_id}
                            disabled={option.qoh === 0}
                            checked={option.checked || false}
                            readOnly
                            onClick={(e) => {
                              buttonOpen(option.id, modifier.id);
                              console.log(option.qoh);
                            }}
                          />
                          <span className="ml-2">{option.optionname}</span>
                        </div>
                      </div>
                      {/* child */}
                      {option.open &&
                        option.checked &&
                        option.child?.map((childOption) => (
                          <div className="w-[400px] flex justify-between py-2">
                            <div key={childOption.id} className="flex">
                              <input
                                type={
                                  childOption.option_type == 0
                                    ? "checkbox"
                                    : "radio"
                                }
                                name={childOption.modifier_id}
                                checked={childOption.checked || false}
                                readOnly
                                onClick={() =>
                                  childButton(
                                    childOption.id,
                                    option.id,
                                    modifier.id,
                                  )
                                }
                              />
                              <div>{childOption.optionname}</div>
                            </div>
                            <div>
                              <div>
                                {childOption.checked && (
                                  <div>
                                    <div className=" border border-amber-500 flex items-center">
                                      <button className="bg-gray-600 px-2 h-full">
                                        +
                                      </button>

                                      <span className="bg-gray-600 px-2 h-full flex items-center">
                                        {orderOn}
                                      </span>

                                      <button className="bg-gray-600 px-2 h-full">
                                        -
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}

                      {option.qoh == 0 && (
                        <p className="text-red-500 text-sm">out of stock</p>
                      )}
                    </div>

                    {/* price Show and button*/}
                    {!option.child?.[0] && option.open && (
                      <div>
                        <span>{option.price} QAR</span>
                        {
                          <div>
                            <div className=" border border-amber-500 flex items-center">
                              <button
                                className="bg-gray-600 px-2 h-full"
                                onClick={() => orderCountAdd(option.id)}
                              >
                                +
                              </button>

                              <span className="bg-gray-600 px-2 h-full flex items-center">
                                {option.quantity || 1}
                              </span>

                              <button
                                className="bg-gray-600 px-2 h-full"
                                onClick={() => orderCountSub(option.id)}
                              >
                                -
                              </button>
                            </div>
                          </div>
                        }
                      </div>
                    )}
                  </div>
                ))}
            </div>
          }
        </div>
      ))}
      <div>
        <div className="  border border-amber-500 flex items-center text-white text-xl">
          <h1 className="text-black px-5">Quantity</h1>
          <button className="bg-gray-600 px-5 py-2 h-full">+</button>

          <span className="bg-gray-600 px-4 py-2 h-full flex items-center">
            1
          </span>

          <button className="bg-gray-600 px-5 py-2 h-full">-</button>
        </div>

        <span className="text-red-500 text-md">{`Only ${order?.qoh} left in stock.`}</span>
      </div>
    </div>
  );
};

export default UserModifier;
