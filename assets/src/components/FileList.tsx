import * as React from 'react'
import { Link } from 'react-router-dom'
import { RootState } from '../reducer'
import { TextDocument } from 'service/document-service'

type Props = {
  documents: RootState['model']['documents']['all'],
  createDocument: () => void
}

function sortDocuments(documents: Array<TextDocument>, descending = true): Array<TextDocument> {
  const sorted: Array<TextDocument> = documents.slice(0)
    .sort((a, b) => {
      return new Date(a.updated_at).valueOf() - new Date(b.updated_at).valueOf()
    })
  if (descending) {
    sorted.reverse()
    return sorted
  } else {
    return sorted
  }
}

export default class FileList extends React.Component<Props, any> {
  render() {
    const { documents, createDocument } = this.props
    const sortedDocuments = sortDocuments(documents as TextDocument[])
    return (
      <div className='ui twelve wide centered column'>
        <div className='ui four doubling cards'>
          <a className='ui padded card' onClick={createDocument} >
            <div className='ui left aligned small header'><i className='plus icon' />Add new</div>
          </a>
          {
            sortedDocuments.map(document => (
              <Link className='ui padded card' key={document.id} to={`/edit/${document.id}`} >
                <div className='ui left aligned small header'><i className='file icon' />{document.name}</div>
                <div className='ui divider' />
                {new Date(document.updated_at).toLocaleString()}
              </Link>))
          }
        </div>
      </div>)
  }
}
