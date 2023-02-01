import { connect } from 'react-redux'
import CreateProduct from '../createProduct'

const mapStateToProps = (state) => {
    return {
        token:state.loginState.token,
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct)