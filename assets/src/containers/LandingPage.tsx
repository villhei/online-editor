import { resolveCurrentUser } from 'actions/page-actions'
import { RootState } from 'main/store'
import * as React from 'react'
import { connect } from 'react-redux'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

interface Props {
  resolveCurrentUser: () => void
}
class LandingPage extends React.Component<Props> {
  componentDidMount() {
    console.log('didmount', this.props.resolveCurrentUser)
    this.props.resolveCurrentUser()
  }
  render() {
    return (
      <div className='ui container' >
        <div className='ui very padded center aligned segment'>
          <i className='ui massive tasks icon' />
          <h1>Online editor!</h1>
          <p>This is an online text editor application. Please log in to get started</p>
          <a href='/api/auth/google'>Login with google</a>
      </div>
    </div >)
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, {}, Action>) => ({
  resolveCurrentUser: () => {
    dispatch(resolveCurrentUser({}))
  }
})

export default connect(undefined, mapDispatchToProps)(LandingPage)
