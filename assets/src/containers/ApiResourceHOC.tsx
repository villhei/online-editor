
import * as React from 'react'
import Loading from 'components/Loading'
import { ApiResource, ResourceStatus } from 'service/common'

export interface ApiResourceProps<T> {
  resource: ApiResource<T>,
  resourceId: string,
  getResource: (id: string) => void
}

export default function wrapApiResource<T, P>
  (isValueResolved: (value: ApiResource<T>) => value is T) {
  return function (Component: React.ComponentClass<P & ApiResourceProps<T>>) {
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
        if (isValueResolved(resource)) {
          return <Component {...this.props } />
        }
        if (resource instanceof Error) {
          return <h1>Error {(resource as Error).message}</h1>
        }
        else if (resource === ResourceStatus.NotFound) {
          return (<h1>Not found</h1>)
        } else {
          return (<Loading />)
        }
      }
    }
  }
}