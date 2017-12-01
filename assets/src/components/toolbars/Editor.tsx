import * as React from 'react'
import { Link } from 'react-router-dom'

type Props = {
  title: string,
  refreshDocument: () => void
  updateDocument: () => void,
  deleteDocument: () => void,
}
export default (props: Props) => (
  <div className='ui fixed inverted massive menu'>
    <Link to='/' className='ui item'>
      <i className='ui icon file text outline' />
    </Link>
    <div className='header item'>{props.title}</div>
    <a className='ui item'>
      <i onClick={props.refreshDocument} className='ui icon refresh text outline' />
    </a>
    <a className='ui item'>
      <i onClick={props.updateDocument} className='ui icon save text outline' />
    </a>
    <a className='ui item'>
      <i onClick={props.deleteDocument} className='ui icon delete text outline' />
    </a>
  </div>
)

