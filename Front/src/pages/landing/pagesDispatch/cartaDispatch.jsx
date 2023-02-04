import { connect } from 'react-redux'
import { viewCategories } from "../../../redux/actions/actions"
import CartaBebidas from '../cartaBebidas'

const mapStateToProps = (state) => {
    return {
        categories:state.categoriesState.categories
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        getCategories: () => {
            dispatch(viewCategories())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartaBebidas)