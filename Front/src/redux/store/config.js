import { legacy_createStore, compose, applyMiddleware } from "redux"
import { rootReducer } from "../reducers/rootReducer"
import createSagaMiddleware from "redux-saga"
import { watcherAPI } from "../sagas/sagas"

export const storeAsync = () => {
    const asyncMiddleware = createSagaMiddleware()
    let store = legacy_createStore(
        rootReducer,
        applyMiddleware(asyncMiddleware),
    )
    asyncMiddleware.run(watcherAPI)
    return store
} 