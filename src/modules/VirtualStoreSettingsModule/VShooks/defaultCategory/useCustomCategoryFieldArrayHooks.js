import useCustomCategoryReferenceHooks from "./useCustomCategoryReferenceHooks"
const useCustomCategoryFieldArrayHooks = ()=>{
    const {categoryName, categoryDescription} = useCustomCategoryReferenceHooks()
    return [
        {
          name: "Category name *",
          type: "textfield",
          ref: categoryName,
          returnKeyType: `next`,
          onSubmitEditing: categoryDescription,
          handleBlur: "categoryname",
          keyboardType: "default",
        },
        {
          name: "Category description *",
          type: "description",
          ref: categoryDescription,
          returnKeyType: `next`,
          onSubmitEditing: null,
          handleBlur: "categoryDescription",
          keyboardType: "default",
        },
        {
          name: "Product images *",
          type: "image",
          handleBlur: "categoreyImage",
        },
      ];
}
export default useCustomCategoryFieldArrayHooks