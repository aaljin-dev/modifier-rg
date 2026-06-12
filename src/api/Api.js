import axios from "axios";

export const ModifierPage = async () => {
  // jjhuhguhybguyguyguyhbuyhbuhbuyb
  try {
    const product = await axios.get(
      "https://multibranch.raregroup.info/api/v2/getSingleProduct/11805",
      // "https://multibranch.raregroup.info/api/v2/getSingleProduct/9315",
    );

    return product.data.data;
  } catch (error) {
    console.log(error, "error find ");
  }
};
