import axios from "axios"

export const configSimple = (token) => {
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}

export const config = (token) => {
    return {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }
}
export const configForm = (token) => {
    return {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
        }
    }
}

