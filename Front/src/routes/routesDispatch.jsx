import { connect } from 'react-redux'
import Views from './routes'

const mapStateToProps = (state) => {
    return {
        token: state.loginState.token,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Views)