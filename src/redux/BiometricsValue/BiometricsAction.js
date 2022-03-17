import {SHOW_BIOMETRICS, HIDE_BIOMETRICS} from './BiometricsTypes'
export const BiometricsAction = (object)=>{
    return (dispatch) => {
        dispatch(object?.value ? {
            type:SHOW_BIOMETRICS,
            data:object
          }: {
            type: HIDE_BIOMETRICS,
            data: object
          });
    }
  }
  export default BiometricsAction;