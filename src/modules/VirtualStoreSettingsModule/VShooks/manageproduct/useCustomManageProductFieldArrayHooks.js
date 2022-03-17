import useCustomManageProductReferenceHook from "./useCustomManageProductReferenceHook";
const useCustomManageProductFieldArrayHooks = () => {
  const { productName, productPrice, productThreshold, productDescription } =
    useCustomManageProductReferenceHook();
  return [
    {
      name: "Type *",
      type: "dropdown",
      dropdownData: [
        {
          Beeppluslabel: "One Brunei",
          Beepplusvalue: "onebrunei",
        },
        // {
        //   Beeppluslabel: "Pasar",
        //   Beepplusvalue: "pasar",
        // },
      ],
      handleBlur: "type",
    },
    {
      name: "Product name *",
      type: "textfield",
      ref: productName,
      returnKeyType: `next`,
      onSubmitEditing: productPrice,
      handleBlur: "name",
      keyboardType: "default",
    },
    {
      name: "Category *",
      type: "dropdown",
      handleBlur: "category",
      dropdownData: [],
    },
    {
      name: "Price *",
      type: "textfield",
      ref: productPrice,
      returnKeyType: `next`,
      onSubmitEditing: productThreshold,
      handleBlur: "price",
      keyboardType: "numeric",
    },
    {
      name: "Threshold limit *",
      type: "textfield",
      ref: productThreshold,
      returnKeyType: `next`,
      onSubmitEditing: productDescription,
      handleBlur: "thresholdLimit",
      keyboardType: "numeric",
    },
    {
      name: "Product Description *",
      type: "description",
      ref: productDescription,
      handleBlur: "description",
      returnKeyType: `next`,
    },
    {
      name: "Product images *",
      type: "image",
      handleBlur: "productImages",
    },
  ];
};
export default useCustomManageProductFieldArrayHooks;
