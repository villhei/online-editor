
import * as React from 'react'
import { ApiResource, ResourceStatus } from 'service/common'

export interface ApiResourceProps<T> {
  resource: ApiResource<T>,
  resourceId: string,
  getResource: (id: string) => void
}

export default function wrapApiResource<T, P>
  (Component: React.ComponentClass<P & ApiResourceProps<T>>) {
  return class ApiResourceWrapper extends React.Component<P & ApiResourceProps<T>> {
    componentDidMount() {
      this.props.getResource(this.props.resourceId)
    }

    componentWillReceiveProps(nextProps: ApiResourceProps<T>) {
      if (nextProps.resourceId !== this.props.resourceId) {
        this.props.getResource(nextProps.resourceId)
      }
    }

    render() {
      const { resource } = this.props
      if (resource instanceof Error) {
        return <h1>Error {(resource as Error).message}</h1>
      }
      else if (resource === ResourceStatus.NotFound) {
        return (<h1>Not found</h1>)
      }
      else if (resource && resource !== ResourceStatus.Loading) {
        return <Component {...this.props } />
      } else {
        return (<div className='ui segment'>
          <p></p>
          <div className='ui active inverted dimmer'>
            <div className='ui loader'></div>
          </div>
        </div>)
      }
    }
  }
}
