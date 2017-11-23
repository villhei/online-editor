import * as React from 'react'
import { Link } from 'react-router-dom'
import { RootState } from '../reducer'
import { TextDocument } from 'service/document-service'

type Props = {
  documents: RootState['model']['documents']['all']
}
export default class FileList extends React.Component<Props, any> {

  render() {
    const { documents } = this.props
    return (
      <div className='ui twelve wide centered column'>
        <div className='ui four doubling cards'>
          {
            documents.map(document => (
              <Link className='ui padded card' key={document.id} to={`/edit/${document.id}`} >
                <div className='ui left aligned header'><i className='file icon'/>{document.name}</div>
                <div className='ui divider' />
                {document.updated_at}
              </Link>))
          }
        </div>
      </div>)

  }
}