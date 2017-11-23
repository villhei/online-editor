import * as React from 'react'
import { Link } from 'react-router-dom'
import { RootState } from '../reducer'
import { TextDocument } from 'service/document-service'

type Props = {
  documents: RootState['model']['documents']['all'],
  createDocument: () => void
}
export default class FileList extends React.Component<Props, any> {

  render() {
    const { documents, createDocument } = this.props
    return (
      <div className='ui twelve wide centered column'>
        <div className='ui four doubling cards'>
          <a className='ui padded card' onClick={createDocument} >
            <div className='ui left aligned header'><i className='plus icon' />Add new</div>
          </a>
          {
            documents.map(document => (
              <Link className='ui padded card' key={document.id} to={`/edit/${document.id}`} >
                <div className='ui left aligned header'><i className='file icon' />{document.name}</div>
                <div className='ui divider' />
                {document.updated_at}
              </Link>))
          }
        </div>
      </div>)

  }
}