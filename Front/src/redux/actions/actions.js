const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/api";

export const viewCategories = () => {
    return {
        type: "GETTING_CATEGORIES",
        payload: {
            request:{
                method:"GET",
                url:`${API_URL}/category`,
            },
            okAction:"CATEGORIES_SUCCESS",
            failAction:"CATEGORIES_FAILED"
        }
    }
}

export const loginAction = (email,password) => {
    return {
        type: "GETTING_CREDENTIALS",
        payload: {
            request:{
                method:"POST",
                url:`${API_URL}/auth/login`,
                data:{
                    email,
                    password
                }
            },
            okAction:"LOGIN_SUCCESS",
            failAction:"LOGIN_FAILED"
        }
    }
}
export const logOut = () => {
    return {
        type: "LOGOUT",
        payload: {
        }
    }
}





