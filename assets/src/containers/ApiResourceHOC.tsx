
import NotFoundCard from 'components/notfound/NotFoundCard'
import { RootState } from 'main/store'
import * as React from 'react'
import { Dispatch } from 'react-redux'
import { ApiResource, ApiResourceId, ByIdParams, ResourceStatus, isAxiosError } from 'service/common'

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

export type ApiResourceSelection<T> = {
  resourceId: ApiResourceId,
  resource: ApiResource<T>
}

export function selectApiResource<T>(
  { model }: RootState,
  modelKey: 'folders' | 'documents',
  resourceId: ApiResourceId
): ApiResourceSelection<T> {
  const resource: ApiResource<T> = (model[modelKey].byId[resourceId] as ApiResource<T>)
  return {
    resource,
    resourceId
  }
}

export type ResourceFetcher<T> = (dispatch: Dispatch, params: ByIdParams) => Promise<T>

export type ApiResourceDispatch = {
  getResource: (id: ApiResourceId) => void
}

export function mapGetResource<T>(dispatch: Dispatch, getResource: ResourceFetcher<T>): ApiResourceDispatch {
  return {
    getResource: (id: ApiResourceId) => getResource(dispatch, { id })
  }
}
