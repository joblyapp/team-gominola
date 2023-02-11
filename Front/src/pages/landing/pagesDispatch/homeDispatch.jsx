import { connect } from 'react-redux'
import { viewCategories } from "../../../redux/actions/actions"
import Home from "../../../components/containers/home"

const mapStateToProps = (state) => {
    return {
        categories:state.categoriesState.categories,
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        getCategories: () => {
            dispatch(viewCategories())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)