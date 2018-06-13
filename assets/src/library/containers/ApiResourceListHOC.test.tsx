import { shallow } from 'enzyme'
import createApiResourceListWrapper from 'library/containers/ApiResourceListHOC'
import { ResourceStatus } from 'library/service/common'
import * as React from 'react'

import { ModelEntry, isModelEntry } from './ApiResourceHOC.test'

interface ViewProps {
  resourceIds: string[],
  resources: ModelEntry[],
  getResource: (id: string) => void
}

class ResourceView extends React.Component<ViewProps> {
  render() {
    return <div>{this.props.resources}</div>
  }
}
const LoadingComponent = () => <div>Loading</div>

function minimumProps() {
  return {
    resourceIds: [],
    getResource: jest.fn(),
    resources: {}
  }
}
describe('ApiResourceListHOC', () => {
  it('should return a usable wrapper', () => {
    const wrapper = createApiResourceListWrapper(isModelEntry)
    expect(wrapper).toBeInstanceOf(Function)
  })

  it('should display a the component when resources are resolved', () => {
    const wrapper = createApiResourceListWrapper<ModelEntry, ViewProps>(isModelEntry)
    const Component = wrapper(ResourceView, LoadingComponent)
    const props = minimumProps()
    const element = shallow(<Component {...props} />)
    const viewProps = {
      ...props,
      resources: []
    }
    expect(element.matchesElement(<ResourceView {...viewProps} />)).toBeTruthy()
  })

  it('should trigger getResource for unresolved resources', () => {
    const wrapper = createApiResourceListWrapper<ModelEntry, ViewProps>(isModelEntry)
    const Component = wrapper(ResourceView, LoadingComponent)
    const props = {
      ...minimumProps(),
      resourceIds: ['foo', 'bar'],
      resources: {
        foo: undefined,
        bar: {
          id: 'bar',
          someProp: 0
        }
      }
    }
    shallow(<Component {...props} />)
    expect(props.getResource).toHaveBeenCalledTimes(1)
    expect(props.getResource).toHaveBeenCalledWith('foo')
  })
})
