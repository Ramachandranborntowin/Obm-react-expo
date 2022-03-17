import { Formik, Field } from "formik";
import * as Yup from "yup";
const empty = "cannot be empty";
const useCustomManageproductValidationYupHooks = Yup.object().shape({
  type: Yup.string().required(`Product type ${empty}`),
  name: Yup.string()
    .required(`Product name ${empty}`)
    .min(3, "product name should be minimum 3 character"),
  category: Yup.string().required(`Product category ${empty}`),
  price: Yup.string().required(`Product price ${empty}`),
  thresholdLimit: Yup.string().required(`Threshold limit ${empty}`),
  description: Yup.string()
    .required(`Product description ${empty}`)
    .min(1, "Product description should be minimum 1 character").max(120, "Product description should be maximum 120 character"),
  productImages: Yup.mixed()
    .test("file", `Product image ${empty}`, (value) => {
      if (value.uri) {
        return value;
      }
    })
    .test("fileSize", "File Size is too large", (value) => {
      return value.size <= 5000000;
    })
    .test("fileType", "Unsupported File Format", (value) => {
      console.log('type', value.type)
      if (value.type == "image") {
        return value;
      }
    }),
});
export default useCustomManageproductValidationYupHooks;

export const useCustomManageproductValidationEditYupHooks = Yup.object().shape({
  // type: Yup.string().required(`Product type ${empty}`),
  name: Yup.string()
    .min(3, "product name should be minimum 3 character"),
  // category: Yup.string().required(`Product category ${empty}`),
  // price: Yup.string().required(`Product Price ${empty}`),
  // thresholdLimit: Yup.string().required(`Threshold limit ${empty}`),
  description: Yup.string()
    .min(1, "Product description should be minimum 1 character").max(120, "Product description should be maximum 10 character"),
  productImages: Yup.mixed()
    .test("fileSize", "File Size is too large", (value) => {
      return value.size <= 5000000;
    })
    .test("fileType", "Unsupported File Format", (value) => {
      if (value.type == "image") {
        return value;
      }
    }),
});

export const useCustomManageProductValidation = (isimageEnabled = true)=>{
  console.log('is imageEnabled', isimageEnabled)
 return Yup.object().shape({
  type: Yup.string().required(`Product type ${empty}`),
  name: Yup.string()
    .required(`Product name ${empty}`)
    .min(3, "product name should be minimum 3 character"),
  category: Yup.string().required(`Product category ${empty}`),
  price: Yup.string().required(`Product price ${empty}`),
  thresholdLimit: Yup.string().required(`Threshold limit ${empty}`),
  description: Yup.string()
    .required(`Product description ${empty}`)
    .min(1, "Product description should be minimum 1 character").max(120, "Product description should be maximum 120 character"),
  productImages: isimageEnabled && Yup.mixed()
    .test("file", `Product image ${empty}`, (value) => {
      if (value.uri) {
        return value;
      }
    })
    .test("fileSize", "File Size is too large", (value) => {
      return value.size <= 5000000;
    })
    .test("fileType", "Unsupported File Format", (value) => {
      console.log('type', value.type)
      if (value.type == "image") {
        return value;
      }
    }),
});
}
