import React, {
    Component,
    useCallback,
    useEffect,
    useMemo,
    useState,
    memo,
    useRef,
  } from "react";
  const useCustomCategoryReferenceHooks = () => {
  const categoryName = useRef(null);
  const categoryDescription = useRef(null);
  return {
    categoryName,
    categoryDescription,
  };
};
export default useCustomCategoryReferenceHooks;