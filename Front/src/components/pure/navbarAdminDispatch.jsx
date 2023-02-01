import { connect } from 'react-redux'
import {  logOut } from '../../redux/actions/actions'
import NavbarAdmin from './navbarAdmin'

const mapStateToProps = (state) => {
    return {
        categories:state.categoriesState.categories,
        token: state.loginState.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        logOut: () => {
            dispatch(logOut())
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(NavbarAdmin)