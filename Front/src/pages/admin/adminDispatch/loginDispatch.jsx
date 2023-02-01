import { connect } from 'react-redux'
import { loginAction } from "../../../redux/actions/actions"
import Login from '../login'

const mapStateToProps = (state) => {
    return {
        token:state.loginState.token,
        user:state.loginState.user,
        getting:state.loginState.getting,
        errorState:state.loginState.error,

    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        loginAction: (email,password) => {
            dispatch(loginAction(email,password))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)