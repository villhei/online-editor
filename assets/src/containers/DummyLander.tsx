import { selectRootFolder } from 'actions/page-actions'
import Loading from 'components/Loading'
import * as React from 'react'
import { Dispatch, connect } from 'react-redux'

import { RootState } from '../reducer'

type Props = {
  selectRootFolder: () => any
}

class LandingPage extends React.Component<Props, any> {
  componentDidMount() {
    this.props.selectRootFolder()
  }
  render() {
    return <Loading />
  }
}

const mapStateToProps = ({ }: RootState) => ({})

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => {
  return {
    selectRootFolder: () => dispatch(selectRootFolder(undefined))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LandingPage)
