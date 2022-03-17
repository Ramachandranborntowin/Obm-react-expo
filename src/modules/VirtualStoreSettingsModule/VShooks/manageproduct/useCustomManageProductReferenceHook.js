import React, {
  Component,
  useCallback,
  useEffect,
  useMemo,
  useState,
  memo,
  useRef,
} from "react";
const useCustomManageProductReferenceHook = () => {
  const productName = useRef(null);
  const productPrice = useRef(null);
  const productThreshold = useRef(null);
  const productDescription = useRef(null);
  return {
    productName,
    productPrice,
    productThreshold,
    productDescription,
  };
};
export default useCustomManageProductReferenceHook;
