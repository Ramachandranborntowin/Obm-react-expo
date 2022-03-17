const useMerchantidExternalid = (portalid, merchantportalsArray)=>{
    let merchant_portals_id;
      let merchant_portals_external_id;
      let merchant_portals_merchant_id;
      merchantportalsArray.data.merchant_portals.map((obj, index) => {
        if (obj.id == portalid) {
          merchant_portals_id = obj.id;
          merchant_portals_external_id = obj.external_id;
          merchant_portals_merchant_id = obj.merchant_id;
        }
      });
      return {
        merchant_portals_id,
        merchant_portals_external_id,
        merchant_portals_merchant_id
      }
}
export default useMerchantidExternalid