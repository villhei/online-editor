
import { AxiosError } from 'axios'
import NotFoundCard from 'components/notfound/NotFoundCard'
import { RootState } from 'main/store'
import * as React from 'react'
import { Dispatch } from 'react-redux'
import { ApiResource, ApiResourceId, ByIdParams, ResourceStatus, isAxiosError } from 'service/common'

interface WrapperProps<T> {
  resource: ApiResource<T>,
}

export interface PublicComponentProps<T> extends WrapperProps<T> {
  resourceId: ApiResourceId,
  getResource: (id: string) => void,
  onResourceNotFound?: (id: string) => void
}

export type ChildComponentProps<T> = {
  resourceId: ApiResourceId,
  getResource: (id: string) => void,
  resource: T,
  onResourceNotFound?: (id: string) => void
}

type TypeChecker<T> = (value: ApiResource<T>) => value is T

function wrapApiResource<T, P extends PublicComponentProps<T>>(
  isValueResolved: TypeChecker<T>,
  ChildComponent: React.ComponentType<P & ChildComponentProps<T>>,
  LoadingComponent: React.ComponentType<{}>): React.ComponentClass<P & PublicComponentProps<T>> {
  return class ApiResourceWrapper extends React.Component<P & PublicComponentProps<T>> {
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
        return <ChildComponent {...this.props as ChildComponentProps<T>} />
      }
      if (isAxiosError(resource)) {
        return (
          <div className='ui container'>
            <h1>Error</h1> {(resource as AxiosError).message}
          </div>
        )
      } else if (resource === ResourceStatus.NotFound) {
        return (<NotFoundCard />)
      } else if (resource === ResourceStatus.Loading) {
        return (<LoadingComponent />)
      } else {
        return null
      }
    }
  }
}

export default function createApiResourceWrapper<T, P extends ChildComponentProps<T>>(isValueResolved: TypeChecker<T>) {
  return function (
    childComponent: React.ComponentType<P & ChildComponentProps<T>>,
    loadingComponent: React.ComponentType<{}>):
    React.ComponentClass<P & PublicComponentProps<T>> {
    return wrapApiResource(isValueResolved, childComponent, loadingComponent)
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
