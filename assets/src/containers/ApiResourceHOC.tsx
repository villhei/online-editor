
import * as React from 'react'
import LoadingComponent from 'components/Loading'
import { ApiResource, ResourceStatus } from 'service/common'

export interface ApiResourceProps<T> {
  resource: ApiResource<T>,
  resourceId: string,
  getResource: (id: string) => any
}

type TypeChecker<T> = (value: ApiResource<T>) => value is T

type ApiResourceContainer<T, P> = React.ComponentClass<P & ApiResourceProps<T>>

type ElementFn = () => JSX.Element

export default function wrapApiResource<T, P>(isValueResolved: TypeChecker<T>) {
  return function (Component: ApiResourceContainer<T, P>,
    Loading: ElementFn = LoadingComponent) {
    return class ApiResourceWrapper extends React.Component<P & ApiResourceProps<T>> {
      componentDidMount() {
        this.handleGetResource()
      }

      componentDidUpdate() {
        this.handleGetResource()
      }

      handleGetResource = () => {
        const { resource, resourceId, getResource } = this.props
        if (!isValueResolved(resource)) {
          this.props.getResource(resourceId)
        }
      }

      render() {
        const { resource } = this.props
        if (isValueResolved(resource)) {
          return <Component {...this.props} />
        }
        if (resource instanceof Error) {
          return <h1>Error {(resource).message}</h1>
        } else if (resource === ResourceStatus.NotFound) {
          return (<h1>Not found</h1>)
        } else {
          return (<Loading />)
        }
      }
    }
  }
}
