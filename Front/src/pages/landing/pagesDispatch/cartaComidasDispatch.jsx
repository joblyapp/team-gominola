import { connect } from 'react-redux'
import { viewCategories } from "../../../redux/actions/actions"
import CartaComidas from '../cartaComidas'

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

export default connect(mapStateToProps, mapDispatchToProps)(CartaComidas)