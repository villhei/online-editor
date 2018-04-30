
import NotFoundCard from 'components/notfound/NotFoundCard'
import * as React from 'react'
import { ApiResource, ApiResourceId, ResourceStatus, isAxiosError } from 'service/common'

export interface ApiResourceProps<T> {
  resource: ApiResource<T>,
  resourceId: ApiResourceId,
  getResource: (id: string) => void,
  onResourceNotFound?: (id: string) => void
}

type TypeChecker<T> = (value: ApiResource<T>) => value is T

type ApiResourceContainer<T, P> = React.ComponentClass<P & ApiResourceProps<T>>

type ElementFn = () => JSX.Element
// tslint:disable-next-line
type ComponentWrapper<T, P> = (component: ApiResourceContainer<T, P>, Loading: ElementFn) => any

export default function wrapApiResource<T, P>(
  isValueResolved: TypeChecker<T>): ComponentWrapper<T, P> {
  return function (Component: ApiResourceContainer<T, P>,
    Loading: ElementFn): Function {
    return class ApiResourceWrapper extends React.Component<P & ApiResourceProps<T>> {
      componentDidMount() {
        this.handleGetResource()
      }
      componentDidUpdate() {
        this.handleGetResource()
      }

      handleGetResource = () => {
        const { resource, resourceId, onResourceNotFound, getResource } = this.props
        const isResourceLoaded = (isValueResolved(resource)
          || isAxiosError(resource)
          || resource === ResourceStatus.Loading
          || resource === ResourceStatus.NotFound)
        if (resource === ResourceStatus.NotFound && onResourceNotFound) {
          onResourceNotFound(resourceId)
        }
        if (!isResourceLoaded) {
          if (resourceId) {
            getResource(resourceId)
          }
        }
      }

      render() {
        const { resource } = this.props
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
          return (<NotFoundCard />)
        } else if (resource === ResourceStatus.Loading) {
          return (<Loading />)
        } else {
          return null
        }
      }
    }
  }
}
