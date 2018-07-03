import * as React from 'react'

class LandingPage extends React.Component<{}> {
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

export default LandingPage
