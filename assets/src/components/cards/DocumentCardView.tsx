import * as React from 'react'
import CardDisplay from './CardDisplay'
import { TextDocument } from 'service/document-service'

type Props = {
  document: TextDocument,
  editDocument: () => any
}

function formatDate(isoString: string): string {
  const date = new Date(isoString)
  return [
    date.getDate(),
    date.getMonth() + 1,
    date.getFullYear()
  ].join('.') + ' ' +
    [
      date.getHours(),
      ('0' + date.getMinutes()).slice(-2)
    ].join(':')
}

export default (props: Props) => {
  const { document, editDocument } = props
  return (<CardDisplay
    header={document.name}
    icon={{
      name: 'file',
      color: 'teal'
    }}
    buttonAction={editDocument}>
    <>
      <div className='meta'>
        Last modified {formatDate(document.updated_at)}
      </div>
      <div className='ui divider' />
    </>
  </CardDisplay >
  )
}
