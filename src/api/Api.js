import axios from "axios";

export const ModifierPage = async () => {
  try {
    const product = await axios.get(
      "https://multibranch.raregroup.info/api/v2/getSingleProduct/11805",
    );

    return product.data.data;
  } catch (error) {
    console.log(error, "error find ");
  }
};
