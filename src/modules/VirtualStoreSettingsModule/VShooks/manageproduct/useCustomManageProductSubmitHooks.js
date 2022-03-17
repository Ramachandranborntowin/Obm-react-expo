import { AddProduct } from "../../../../services/VirtualStoreSettingsApi";
import React, { memo } from "react";
import Toast from "react-native-root-toast";
const useCustommanageproductSubmitHooks = (
  values,
  portalId,
  externalId,
  merchantId,
  actionType,
  action,
  product_id,
  appendImage
) => {
  console.log("hello world", values);
  let data = new FormData();
  data.append("portal_id", portalId);
  data.append("external_id", externalId);
  data.append("merchant_id", merchantId);
  data.append("proname", values?.name);
  data.append("procate", values?.category);
  data.append("proprice", values?.price);
  data.append("prodesc", values?.description);
  data.append("prosku", values?.thresholdLimit);
  data.append("action", actionType);
  if (action == "Edit") {
    data.append("edit_id", product_id);
  }
  if (Object.keys(values.productImages).length !== 0) {
    data.append("idProfile", { ...values?.productImages, type: "image/jpeg" });
  }
  return AddProduct(data);
};
export default useCustommanageproductSubmitHooks;

export const useCustommanageproductSubmitAddHooks = (
  values,
  portalId,
  externalId,
  merchantId
) =>
  useCustommanageproductSubmitHooks(
    values,
    portalId,
    externalId,
    merchantId,
    "AddProduct"
  );
export const useCustommanageproductSubmitEditHooks = (
  values,
  portalId,
  externalId,
  merchantId,
  product_id,
  action,
) =>
  useCustommanageproductSubmitHooks(
    values,
    portalId,
    externalId,
    merchantId,
    "EdiTProduct",
    action,
    product_id,
  );
