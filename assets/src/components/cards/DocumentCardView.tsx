import * as React from 'react'
import CardDisplay from './CardDisplay'
import { TextDocument } from 'service/document-service'

type Props = {
  document: TextDocument,
  editDocument: () => any
}

export default (props: Props) => {
  const { document, editDocument } = props
  return (<CardDisplay
    header={document.name}
    buttonText='Edit'
    icon={{
      name: 'file',
      color: 'teal'
    }}
    buttonAction={editDocument} />
  )
}
