let initialState
if (localStorage.getItem("token") === null) {
    initialState = {
        getting: false,
        error: null,
        token: null
    }
}
else {
    initialState = {
        getting: false,
        error: null,
        token: localStorage.getItem("token")
    }
}


export const LoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GETTING_CREDENTIALS":
            return {
                ...state,
                getting: true,
                token: null,
                user: null,
                error: null
            }
        case "LOGIN_SUCCESS":
            return {
                ...state,
                getting: false,
                token: action.payload.token,
                user: action.payload.user,
                error: null
            }
        case "LOGIN_FAILED":
            return {
                ...state,
                getting: false,
                token: null,
                user: null,
                error: action.payload.error
            }
        case "LOGOUT":
            localStorage.removeItem("token")
            return {
                ...state,
                getting: false,
                token: null,
                user: null,
                error: null
            }
        default:
            return state
    }
}