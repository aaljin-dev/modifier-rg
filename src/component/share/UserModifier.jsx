import React, { useEffect, useState } from "react";
import customLetter from "../CustomLetter";
import CustomLetter from "../CustomLetter";
import { GrRefresh } from "react-icons/gr";

const UserModifier = ({ order, fullScreen, setFullScreen, userInput }) => {
  const [product, setProduct] = useState([]);

  const [showButton, setShowButton] = useState([]);

  const [rate, setRate] = useState(0);

  // jhgvhvhvhv vgh vygvjgvj

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
              if (option.id !== optionId) return option;

              const checked = !option.checked;
              const open = !option.open;

              return {
                ...option,
                checked,
                open,
                quantity: !checked && !open ? 0 : option.quantity,
                child: !checked
                  ? option.child?.map((child) => ({
                      ...child,
                      checked: false,
                      quantity: 0,
                    }))
                  : option.child,
              };
            }

            // Radio
            return option.id === optionId
              ? (() => {
                  const checked = !option.checked;
                  const open = !option.open;

                  return {
                    ...option,
                    checked,
                    open,
                    quantity: !checked && !open ? 0 : option.quantity,
                    child: !checked
                      ? option.child?.map((child) => ({
                          ...child,
                          checked: false,
                          quantity: 0,
                        }))
                      : option.child,
                  };
                })()
              : {
                  ...option,
                  checked: false,
                  open: false,
                  quantity: 0,
                  child: option.child?.map((child) => ({
                    ...child,
                    checked: false,
                    quantity: 0,
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

                // Checkbox Child
                if (isCheckbox) {
                  if (child.id !== childId) return child;

                  const checked = !child.checked;

                  return {
                    ...child,
                    checked,
                    quantity: checked ? child.quantity || 1 : 0,
                  };
                }

                // Radio Child
                return child.id === childId
                  ? {
                      ...child,
                      checked: true,
                      quantity: child.quantity || 1,
                    }
                  : {
                      ...child,
                      checked: false,
                      quantity: 0,
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
    setRate(calculatePrice());
    console.log("Done");
  }, [product]);

  useEffect(() => {
    if (order?.modifier) {
      setProduct(order.modifier);
    }
  }, [order]);

  console.log("full", product);

  const openHandle = (id) => {
    console.log(id);

    const handleOpen = product.map((item) =>
      item.id == id ? { ...item, open: !item.open } : item,
    );
    setProduct(handleOpen);
  };

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
            : parent,
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

  const orderCountChildAdd = (id) => {
    const updated = product.map((modifier) => ({
      ...modifier,
      modifierinfo: {
        ...modifier.modifierinfo,
        option: modifier.modifierinfo.option.map((parent) => ({
          ...parent,
          child: parent.child?.map((child) =>
            child.id === id
              ? {
                  ...child,
                  quantity: (child.quantity || 1) + 1,
                }
              : child,
          ),
        })),
      },
    }));

    setProduct(updated);
  };

  const orderCountChildSub = (id) => {
    const updated = product.map((modifier) => ({
      ...modifier,
      modifierinfo: {
        ...modifier.modifierinfo,
        option: modifier.modifierinfo.option.map((parent) => ({
          ...parent,
          child: parent.child?.map((child) =>
            child.id === id
              ? {
                  ...child,
                  quantity: Math.max(0, (child.quantity || 1) - 1),
                }
              : child,
          ),
        })),
      },
    }));

    setProduct(updated);
  };
  const calculatePrice = () => {
    let total = Number(order.saleprice || 0);

    product.forEach((modifier) => {
      modifier.modifierinfo.option.forEach((option) => {
        if (option.checked) {
          total += (option.price || 0) * (option.quantity || 1);
        }

        option.child?.forEach((child) => {
          if (child.checked) {
            total += (child.price || 0) * (child.quantity || 1);
          }
        });
      });
    });

    return total;
  };

  if (!order?.modifier) return <div>Loading...</div>;

  return (
    <div className="">
      <div className="py-4 w-full">
        {/* secation */}
        {product?.map((modifier) => (
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
                    <div key={option.id} className="flex justify-between py-2 ">
                      <div className=" w-full">
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
                            <div className="w-full flex justify-between py-2">
                              <div
                                key={childOption.id}
                                className="flex justify-baseline"
                              >
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
                                {/* look */}
                                <span>{`${childOption.price} QAR`}</span>
                                {childOption.checked && (
                                  <div>
                                    <div className=" flex items-center">
                                      <button
                                        className="bg-gray-600 px-2 h-full"
                                        onClick={() =>
                                          orderCountChildAdd(childOption.id)
                                        }
                                      >
                                        +
                                      </button>

                                      <span className="bg-gray-600 px-2 h-full flex items-center">
                                        {childOption.quantity || 1}
                                      </span>

                                      <button
                                        className="bg-gray-600 px-2 h-full"
                                        onClick={() =>
                                          orderCountChildSub(childOption.id)
                                        }
                                      >
                                        -
                                      </button>
                                    </div>
                                  </div>
                                )}
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
                              <div className=" flex items-center">
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
          <div className="flex justify-between">
            <div className=" flex items-center text-white text-xl">
              <h1 className="text-black px-5">Quantity</h1>
              <button
                className="bg-black px-2 py-1 h-full"
                onClick={() =>
                  setOrderOn((prev) => Math.min(prev + 1, order.qoh))
                }
              >
                +
              </button>

              <span className="bg-black px-2 py-1 h-full flex items-center">
                {orderOn}
              </span>

              <button
                className="bg-black px-2 py-1 h-full"
                onClick={() => setOrderOn(Math.max(0, (orderOn || 1) - 1))}
              >
                -
              </button>
            </div>
            <div>
              <div
                className="border border-gray-400 rounded-2xl py-1 p-2 flex items-center gap-2 cursor-pointer hover:bg-gray-300"
                onClick={() => setProduct(order.modifier)}
              >
                <GrRefresh />
                <span className="text-gray-400">Reset Selection</span>
              </div>
            </div>
          </div>

          <span className="text-red-500 text-md">{`Only ${order?.qoh} left in stock.`}</span>

          {orderOn >= order.qoh && (
            <p className="text-orange-500 text-sm mt-1">out of stock</p>
          )}
        </div>
      </div>

      <div>
        <CustomLetter
          userInput={userInput}
          fullScreen={fullScreen}
          setFullScreen={setFullScreen}
        />
      </div>

      <div className="">
        <button className="bg-gray-600 py-2 px-5 text-white ">{rate}</button>
      </div>
    </div>
  );
};

export default UserModifier;
