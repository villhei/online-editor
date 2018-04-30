import * as React from 'react'
import { TextDocument } from 'service/document-service'

import CardDisplay from './CardDisplay'
import SelectedButton from './SelectedButton'

type Props = {
  document: TextDocument,
  selected: boolean,
  selectDocument: (event: React.MouseEvent<HTMLElement>) => void,
  editDocument: () => void
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
  const { document, editDocument, selected, selectDocument } = props
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
      <SelectedButton
        selected={selected}
        onSelect={selectDocument} />
    </>
  </CardDisplay >
  )
}
