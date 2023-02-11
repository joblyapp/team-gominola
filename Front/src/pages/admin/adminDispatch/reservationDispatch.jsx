import { connect } from 'react-redux'
import ReservationPage from '../reservationPage'


const mapStateToProps = (state) => {
    return {
        token: state.loginState.token,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReservationPage)