import { connect } from 'react-redux'
import { viewCategories } from "../../../redux/actions/actions"
import AdminCategories from '../adminCategories'

const mapStateToProps = (state) => {
    return {
        categories:state.categoriesState.categories,
        token: state.loginState.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        getCategories: () => {
            dispatch(viewCategories())
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AdminCategories)