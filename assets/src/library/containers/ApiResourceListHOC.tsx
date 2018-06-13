
import { Status, StatusFlagged, getResourceStatuses } from 'library/containers/common'
import { MappedModel, ResourceMap } from 'library/reducers/common'
import { ApiResource, ApiResourceId, ResourceStatus, isAxiosError } from 'library/service/common'
import * as React from 'react'

const {
  NOT_LOADED,
  NOT_FOUND
} = Status

export interface Props<T> {
  resourceIds: ApiResourceId[],
  resources: ResourceMap<T>
  getResource: (id: ApiResourceId) => void,
  onResourceNotFound?: (ids: ApiResourceId) => void
}

export interface ChildProps<T> {
  resourceIds: ApiResourceId[],
  resources: T[],
  getResource: (id: ApiResourceId) => void,
  onResourceNotFound?: (ids: ApiResourceId) => void
}

type TypeChecker<T> = (value: ApiResource<T>) => value is T

function filter<T>(resources: StatusFlagged<T>[], desiredStatus: Status): StatusFlagged<T>[] {
  return resources.filter(({ status }) => status === desiredStatus)
}

function wrapApiResources<T, P extends ChildProps<T>>(
  isValueResolved: TypeChecker<T>,
  ChildComponent: React.ComponentType<P>,
  LoadingComponent: React.ComponentType<{}>): React.ComponentClass<Omit<P, 'resources'> & Props<T>> {

  return class ApiResourceWrapper extends React.Component<Omit<P, 'resources'> & Props<T>> {
    componentDidMount() {
      this.handleGetResources()
    }
    componentDidUpdate() {
      this.handleGetResources()
    }

    handleGetResources = () => {
      const { resources, getResource, onResourceNotFound } = (this.props as Props<T>)
      const flaggedResources = getResourceStatuses(resources, isValueResolved)

      const notLoaded = filter(flaggedResources, NOT_LOADED)
      const notFound = filter(flaggedResources, NOT_FOUND)

      notLoaded.forEach(({ id }) => getResource(id))
      if (onResourceNotFound) {
        notFound.forEach(({ id }) => onResourceNotFound(id))
      }
    }

    render() {
      const { resources } = this.props as Props<T>
      const loadedResources: T[] = Object.entries(resources)
        .filter(([, resource]) => isValueResolved(resource))
        .map(([, resource]) => resource as T)
      const props = Object.assign({}, this.props, { resources: loadedResources })
      return <ChildComponent {...props} />
    }
  }
}

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

export default function createApiResourceListWrapper<T, P extends ChildProps<T>>(isValueResolved: TypeChecker<T>) {
  return function (
    childComponent: React.ComponentType<P>,
    loadingComponent: React.ComponentType<{}>):
    React.ComponentClass<Omit<P, 'resources'> & Props<T>> {
    return wrapApiResources(isValueResolved, childComponent, loadingComponent)
  }
}

export type ApiResourceSelection<T> = {
  resourceId: ApiResourceId,
  resource: ApiResource<T>
}

export function selectApiResources<T>(
  model: MappedModel<T>,
  resourceId: ApiResourceId
): ApiResourceSelection<T> {
  const resource: ApiResource<T> | undefined = (model.byId[resourceId])
  return {
    resource,
    resourceId
  }
}
