import { connect } from 'react-redux'
import { viewCategories } from "../../../redux/actions/actions"
import AdminProducts from '../adminProducts'

const mapStateToProps = (state) => {
    return {
        token: state.loginState.token,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCategories: () => {
            dispatch(viewCategories())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminProducts)