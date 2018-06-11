
import NotFoundCard from 'components/notfound/NotFoundCard'
import { MappedModel } from 'library/reducers/common'
import { ApiResource, ApiResourceId, ByIdParams, ResourceStatus, isAxiosError } from 'library/service/common'
import * as React from 'react'
import { Dispatch } from 'react-redux'

export interface Props<T> {
  resourceId: ApiResourceId,
  resource: ApiResource<T>,
  getResource: (id: string) => void,
  onResourceNotFound?: (id: string) => void
}

export interface ChildProps<T> {
  resourceId: ApiResourceId,
  getResource: (id: string) => void,
  resource: T,
  onResourceNotFound?: (id: string) => void
}

type TypeChecker<T> = (value: ApiResource<T>) => value is T

function wrapApiResource<T, P extends ChildProps<T>>(
  isValueResolved: TypeChecker<T>,
  ChildComponent: React.ComponentType<P>,
  LoadingComponent: React.ComponentType<{}>): React.ComponentClass<Omit<P, 'resource'> & Props<T>> {
  return class ApiResourceWrapper extends React.Component<Omit<P, 'resource'> & Props<T>> {
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
        return <ChildComponent {...this.props as ChildProps<T>} />
      }
      if (isAxiosError(resource)) {
        return (
          <div className='ui container'>
            <h1>Error</h1> {(resource).message}
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

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

export default function createApiResourceWrapper<T, P extends ChildProps<T>>(isValueResolved: TypeChecker<T>) {
  return function (
    childComponent: React.ComponentType<P>,
    loadingComponent: React.ComponentType<{}>):
    React.ComponentClass<Omit<P, 'resource'> & Props<T>> {
    return wrapApiResource(isValueResolved, childComponent, loadingComponent)
  }
}

export type ApiResourceSelection<T> = {
  resourceId: ApiResourceId,
  resource: ApiResource<T>
}

export function selectApiResource<T>(
  model: MappedModel<T>,
  resourceId: ApiResourceId
): ApiResourceSelection<T> {
  const resource: ApiResource<T> | undefined = (model.byId[resourceId])
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
