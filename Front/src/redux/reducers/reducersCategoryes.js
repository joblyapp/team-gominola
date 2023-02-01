const initialState = {
    getting: false,
    error: null,
    categories: null,
}

export const CategoriesReducer = (state = initialState, action ) => {
    switch (action.type) {
        case "GETTING_CATEGORIES":
            return {
                ...state,
                getting: true,
                error: null,
                categories: null
            }
        case "CATEGORIES_SUCCESS":
            return {
                ...state,
                getting: false,
                error: null,
                categories: action.payload.categoryes
            }
        case "CATEGORIES_FAILED":
            return {
                ...state,
                getting: false,
                error: action.payload.error,
                categories: null,
            }
        default:
            return state
    }
}