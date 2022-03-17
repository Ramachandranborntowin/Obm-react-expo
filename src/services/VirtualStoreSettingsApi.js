import updatedAccessToken from "../common_utilites/Apiconnector";
export const manageproductList = (...props) => {
  const [merchant_id, portal_id, external_id, dissableLoader] = props;
  return updatedAccessToken(
    "Get",
    `onebrunei/manageproduct?portal_id=${portal_id}&merchant_id=${merchant_id}&external_id=${external_id}`,
    "","",dissableLoader
  );
};
export const manageproductCategory = (...props) => {
  const [merchant_id, portal_id, external_id] = props;
  return updatedAccessToken(
    "Get",
    `onebrunei/category?portal_id=${portal_id}&merchant_id=${merchant_id}&external_id=${external_id}&cat_type=0`
  );
};
export const manageserviceCategory = (...props) => {
  const [merchant_id, portal_id, external_id] = props;
  return updatedAccessToken(
    "Get",
    `onebrunei/category?portal_id=${portal_id}&merchant_id=${merchant_id}&external_id=${external_id}&cat_type=1`
  );
};
export const AddProduct = (data) => {
  return updatedAccessToken("Post", `onebrunei/addproduct`, data, {
    headers: {
      "Content-Type": `multipart/form-data`,
    },
  });
};
export const addCategory = (data) => {
  return updatedAccessToken("Post", `onebrunei/addcategory`, data, {
    headers: {
      "Content-Type": `multipart/form-data`,
    },
  });
};

export const deleteItems = (data) => {
  return updatedAccessToken("Post", `onebrunei/delete/item`, data, {
    headers: {
      "Content-Type": `multipart/form-data`,
    },
  });
};
export const updateStoreApi = (data) => {
  return updatedAccessToken("Post", `onebrunei/store`, data, {
    headers: {
      "Content-Type": `multipart/form-data`,
    },
  });
};

export const getStoreDetails = (...props)=>{
  const [merchant_id, portal_id, external_id] = props;
  return updatedAccessToken("Get",`onebrunei/store?portal_id=${portal_id}&merchant_id=${merchant_id}&external_id=${external_id}`)
}

export const getProductDetails = (...props)=>{
  const [merchant_id, portal_id, external_id, product_id] = props;
  return updatedAccessToken("Get",`onebrunei/product?product_id=${product_id}&portal_id=${portal_id}&merchant_id=${merchant_id}&external_id=${external_id}`)
}