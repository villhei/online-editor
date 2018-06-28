import * as React from 'react'

class LandingPage extends React.Component<{}> {
  render() {
    return (
      <div className='ui container'>
        <h1>Hello</h1>
        <a href='/api/auth/google'>Login with google</a>
      </div>
    )
  }
}

export default LandingPage
