import { connect } from 'react-redux'
import CreateCategory from '../createCategory'

const mapStateToProps = (state) => {
    return {
        token:state.loginState.token,
        errorCategorie:state.categoriesState.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCategory)