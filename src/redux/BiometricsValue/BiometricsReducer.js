const BiometricsReducer = (state = {value: true}, action) => {
    switch (action.type) {
        case "SHOW_BIOMETRICS":
            return action.data;
            break;
        case "HIDE_BIOMETRICS":
            return action.data;
            break;
        default:
            return state;
    }
}

export default BiometricsReducer;