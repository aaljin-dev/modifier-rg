import React, { useEffect, useState } from "react";

const UserModifier = ({ order }) => {
  const [product, setProduct] = useState([]);
  const [parent, setParent] = useState([]);
  const [child, setChild] = useState([]);

  const [select, setSelect] = useState(null);

  const [showButton, setShowButton] = useState([]);

  // addOn section
  const [orderOn, setOrderOn] = useState(1);

  useEffect(() => {
    if (order?.modifier) {
      setProduct(order.modifier);
    }
    // console.log(product);
    // console.log(parent);
  }, [order]);
  console.log(product);

  const openHandle = (id) => {
    console.log(id);

    const handleOpen = product.map((item) =>
      item.id == id ? { ...item, open: !item.open } : item,
    );
    setProduct(handleOpen);
    // console.log("check", handleOpen);
  };

  // console.log(select);

  let array = [];

  // console.log(openId);

  if (!order?.modifier) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      {/* sesstion */}
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
          {modifier.open && (
            <div className="p-4">
              {/* parent */}
              {modifier.modifierinfo.option?.map((option) => (
                <div key={option.id} className="flex justify-between py-2">
                  <div>
                    <div>
                      <div>
                        <input
                          type={
                            (option.isprice == 1) & (option.option_type == 1)
                              ? "checkbox"
                              : "radio"
                          }
                          name={option.modifier_id}
                          disabled={option.qoh === 0}
                          // start with button show function
                          onClick={() => {
                            console.log(option);
                            setParent(option);
                            console.log("parent", parent);
                          }}
                        />
                        <span className="ml-2">{option.optionname}</span>
                      </div>
                    </div>
                    {/* child */}
                    {option.child?.map((childOption) => (
                      <div key={childOption.id}>
                        <input
                          type={
                            childOption.option_type == 0 ? "checkbox" : "radio"
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

                  {/* price Show and button*/}
                  {
                    <div>
                      <span>{option.price} QAR</span>
                      {select === option.id && (
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
                  }
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      <div>
        <div className="  border border-amber-500 flex items-center text-white text-xl">
          <h1 className="text-black px-5">Quantity</h1>
          <button className="bg-gray-600 px-5 py-2 h-full">+</button>

          <span className="bg-gray-600 px-4 py-2 h-full flex items-center">
            {orderOn}
          </span>

          <button className="bg-gray-600 px-5 py-2 h-full">-</button>
        </div>

        <span className="text-red-500 text-md">{`Only ${order?.qoh} left in stock.`}</span>
      </div>
    </div>
  );
};

export default UserModifier;
