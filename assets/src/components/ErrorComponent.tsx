import { AxiosError } from 'axios'
import { isAxiosError } from 'library/service/common'
import * as React from 'react'

interface Props {
  error: Error | AxiosError
}

function formatError(error: Error | AxiosError) {
  if (isAxiosError(error)) {
    return JSON.stringify(error.response!.data, null, 2)
  }
  return error.stack!
}

export default (props: Props) => {
  const { error } = props
  return (
    < div className='ui container' >
      <div className='ui very padded center aligned segment'>
        <i className='ui massive thumbs down icon' />
        <h1>Error</h1>
        <span>{error.message}</span>
        <div className='ui container left aligned'>
          <pre>
            {formatError(error)}
          </pre>
        </div>
      </div>
    </div >)
}
