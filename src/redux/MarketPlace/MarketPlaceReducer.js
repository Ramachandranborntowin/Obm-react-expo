const MarketPlaceReducer = (state = "Pasar", action) => {
    switch (action.type) {
        case "marketplacePortalSelection":
            return action.data;
            break;
        default:
            return state;
    }
}

export default MarketPlaceReducer;