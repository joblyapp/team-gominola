import { connect } from 'react-redux'
import EditProduct from '../editProduct'

const mapStateToProps = (state) => {
    return {
        token:state.loginState.token,
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct)