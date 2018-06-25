
import DefaultErrorComponent from 'components/ErrorComponent'
import { Status, TypeChecker, getResourceStatus } from 'library/containers/common'
import { MappedModel } from 'library/reducers/common'
import { ApiResource, ApiResourceId } from 'library/service/common'
import * as React from 'react'

export interface Props<T> {
  resourceId: ApiResourceId,
  resource: ApiResource<T>,
  getResource: (id: string) => void,
  onResourceNotFound?: (id: string) => void
}

export interface ErrorProps {
  error: Error
}

export interface ChildProps<T> {
  resourceId: ApiResourceId,
  getResource: (id: string) => void,
  resource: T,
  onResourceNotFound?: (id: string) => void
}

const {
  LOADED,
  LOADING,
  NOT_LOADED,
  NOT_FOUND,
  ERROR
} = Status

function wrapApiResource<T, P extends ChildProps<T>>(
  isValueResolved: TypeChecker<T>,
  ChildComponent: React.ComponentType<P>,
  LoadingComponent: React.ComponentType<{}>,
  NotFound: React.ComponentType<{}>,
  ErrorComponent: React.ComponentType<ErrorProps>): React.ComponentClass<Omit<P, 'resource'> & Props<T>> {

  return class ApiResourceWrapper extends React.Component<Omit<P, 'resource'> & Props<T>> {
    componentDidMount() {
      this.handleGetResource()
    }
    componentDidUpdate() {
      this.handleGetResource()
    }

    handleGetResource = () => {
      const { resource, resourceId, onResourceNotFound, getResource } = this.props
      switch (getResourceStatus(resource, isValueResolved)) {
        case NOT_LOADED: {
          getResource(resourceId)
          break
        }
        case NOT_FOUND: {
          onResourceNotFound && getResource(resourceId)
          break
        }
      }
    }

    render() {
      const { resource } = this.props
      const status = getResourceStatus(resource, isValueResolved)

      switch (status) {
        case LOADED: {
          return <ChildComponent {...this.props as ChildProps<T>} />
        }
        case NOT_FOUND: {
          return <NotFound />
        }
        case LOADING: {
          return <LoadingComponent />
        }
        case ERROR: {
          return <ErrorComponent error={resource as Error} />
        }
        default: {
          return null
        }
      }
    }
  }
}

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

export default function createApiResourceWrapper<T, P extends ChildProps<T>>(isValueResolved: TypeChecker<T>) {
  return function (
    childComponent: React.ComponentType<P>,
    loadingComponent: React.ComponentType<{}>,
    notFoundComponent: React.ComponentType<{}>,
    errorComponent: React.ComponentType<ErrorProps> = DefaultErrorComponent):
    React.ComponentClass<Omit<P, 'resource'> & Props<T>> {
    return wrapApiResource(isValueResolved, childComponent, loadingComponent, notFoundComponent, errorComponent)
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
