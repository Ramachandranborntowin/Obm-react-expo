import { Formik, Field } from "formik";
import * as Yup from "yup";
const empty = "cannot be empty";
const useCustomCategoryValidationYupHooks = Yup.object().shape({
  categoryname: Yup.string()
    .required(`Category Name ${empty}`)
    .min(3, "Catrgory Name should be minimum 3 character"),
  categoryDescription: Yup.string()
    .required(`Category Description ${empty}`)
    .min(1, "Category Description should be minimum 10 character")
    .max(120, "Category Description should be maximum 120 character"),
  categoreyImage: Yup.mixed()
    .test("file", `Category image ${empty}`, (value) => {
      if (value.uri) {
        return value;
      }
    })
    .test("fileSize", "File Size is too large", (value) => {
      return value.size <= 5000000;
    })
    .test("fileType", "Unsupported File Format", (value) => {
      if (value.type == "image") {
        return value;
      }
    }),
});
export default useCustomCategoryValidationYupHooks;

export const useCustomCategoryEditValidationYupHooks = Yup.object().shape({
  categoryname: Yup.string().min(
    3,
    "Catrgory Name should be minimum 3 character"
  ),
  categoryDescription: Yup.string()
    .min(1, "Category Description should be minimum 1 character")
    .max(120, "Category Description should be maximum 120 character"),
  categoreyImage: Yup.mixed()
    .test("fileSize", "File Size is too large", (value) => {
      return value.size <= 5000000;
    })
    .test("fileType", "Unsupported File Format", (value) => {
      if (value.type == "image") {
        return value;
      }
    }),
});

export const useCustomCategoryValidation = (isimageEnabled = true)=>{
  return Yup.object().shape({
    categoryname: Yup.string()
      .required(`Category name ${empty}`)
      .min(3, "Catrgory name should be minimum 3 character"),
    categoryDescription: Yup.string()
      .required(`Category description ${empty}`)
      .min(1, "Category description should be minimum 10 character")
      .max(120, "Category description should be maximum 120 character"),
    categoreyImage: isimageEnabled && Yup.mixed()
      .test("file", `Category image ${empty}`, (value) => {
        if (value.uri) {
          return value;
        }
      })
      .test("fileSize", "File Size is too large", (value) => {
        return value.size <= 5000000;
      })
      .test("fileType", "Unsupported File Format", (value) => {
        if (value.type == "image") {
          return value;
        }
      }),
  });
}
