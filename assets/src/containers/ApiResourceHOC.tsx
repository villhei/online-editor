
import * as React from 'react'
import { ApiResource, ApiResourceId, ResourceStatus, isAxiosError } from 'service/common'

export interface ApiResourceProps<T> {
  resource: ApiResource<T>,
  resourceId: ApiResourceId,
  getResource: (id: string) => any,
  error?: any
}

type TypeChecker<T> = (value: ApiResource<T>) => value is T

type ApiResourceContainer<T, P> = React.ComponentClass<P & ApiResourceProps<T>>

type ElementFn = () => JSX.Element | undefined

type ComponentWrapper<T, P> = (component: ApiResourceContainer<T, P>, Loading: ElementFn) => any

export default function wrapApiResource<T, P>(
  isValueResolved: TypeChecker<T>): ComponentWrapper<T, P> {
  return function (Component: ApiResourceContainer<T, P>,
    Loading: ElementFn) {
    return class ApiResourceWrapper extends React.Component<P & ApiResourceProps<T>> {
      componentDidMount() {
        this.handleGetResource()
      }
      componentDidUpdate() {
        this.handleGetResource()
      }

      handleGetResource = () => {
        const { resource, resourceId, getResource } = this.props
        const isResourceLoaded = !(isValueResolved(resource) || isAxiosError(resource))
        if (isResourceLoaded) {
          if (resourceId) {
            this.props.getResource(resourceId)
          }
        }
      }

      render() {
        const { resource, error } = this.props
        if (isValueResolved(resource)) {
          return <Component {...this.props} />
        }
        if (isAxiosError(resource)) {
          return (
            <div className='ui container'>
              <h1>Error</h1> {resource.message}
            </div>
          )
        } else if (resource === ResourceStatus.NotFound) {
          return (<h1>Not found</h1>)
        } else {
          return null
        }
      }
    }
  }
}
