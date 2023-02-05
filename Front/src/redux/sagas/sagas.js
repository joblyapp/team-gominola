import { takeLatest, call, put } from 'redux-saga/effects';
import jwt_decode from "jwt-decode";
import axios from "axios"
import { config, instance } from '../../utils/axios';

export function* watcherAPI() {
    yield takeLatest("GETTING_CATEGORIES", workerCategoryiesAPI);
    yield takeLatest("GETTING_CREDENTIALS", workerLoginAPI);
}

export function* workerCategoryiesAPI (action) {
    try {
        const response = yield call(axiosHttp(action.payload.request))
        
        // We Obtain the token from response
        yield put({
            type: action.payload.okAction, // API_CALL_SUCCESS
            payload: {
                categoryes: response.data
            }
        });

    } catch (error) {
        yield put({
            type: action.payload.failAction, // API_CALL_FAILURE
            payload: {
                error: error
            }
        });
    }
}

export function* workerLoginAPI(action){
    try{
        const response = yield call(axiosHttp(action.payload.request))
        yield put({
            type: action.payload.okAction,
            payload:{
                token: response.data.token,
                user: response.data.user
            }
        })
        localStorage.setItem("token", response.data.token);
    }catch(error){
        yield put({
            type: action.payload.failAction,
            payload:{
                error:error
            }
        })
        localStorage.removeItem("token");
    }
}

function axiosHttp(request) {
    return function () {
        return (axios(request))
    }
}