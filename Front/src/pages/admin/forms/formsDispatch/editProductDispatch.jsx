import { connect } from 'react-redux'
import EditProduct from '../editProduct'
import {viewCategories} from "../../../../redux/actions/actions"
const mapStateToProps = (state) => {
    return {
        token:state.loginState.token,
        categories: state.categoriesState.categories,
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        getCategories: () => {
            dispatch(viewCategories())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct)