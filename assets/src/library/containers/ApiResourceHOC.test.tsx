import { shallow } from 'enzyme'
import createApiResourceWrapper from 'library/containers/ApiResourceHOC'
import { ResourceStatus } from 'library/service/common'
import * as React from 'react'

interface ModelEntry {
  id: string,
  someProp: number
}

interface ViewProps {
  resourceId: string,
  resource: ModelEntry,
  getResource: (id: string) => void
}

class ResourceView extends React.Component<ViewProps> {
  render() {
    return <div>{this.props.resource.someProp}</div>
  }
}
const LoadingComponent = () => <div>Loading</div>

function isModelEntry(obj: Object | undefined): obj is ModelEntry {
  const entry = obj as ModelEntry | undefined
  return Boolean(entry && typeof entry.id === 'string' && typeof entry.someProp === 'number')
}

function minimumProps() {
  return {
    resourceId: 'foo',
    getResource: jest.fn(),
    resource: {
      id: 'foo',
      someProp: 0
    }
  }
}
describe('ApiResourceHOC', () => {
  it('should return a usable wrapper', () => {
    const wrapper = createApiResourceWrapper(isModelEntry)
    expect(wrapper).toBeInstanceOf(Function)
  })

  it('should display a the component when the resource is resolved', () => {
    const wrapper = createApiResourceWrapper<ModelEntry, ViewProps>(isModelEntry)
    const Component = wrapper(ResourceView, LoadingComponent)
    const props = minimumProps()
    const element = shallow(<Component {...props} />)
    expect(element.matchesElement(<ResourceView {...props} />)).toBeTruthy()
  })

  it('should display a the component when the resource is resolved', () => {
    const wrapper = createApiResourceWrapper<ModelEntry, ViewProps>(isModelEntry)
    const Component = wrapper(ResourceView, LoadingComponent)
    const props = {
      ...minimumProps(),
      resource: ResourceStatus.Loading
    }
    const element = shallow(<Component {...props} />)
    expect(element.matchesElement(<LoadingComponent />)).toBeTruthy()
  })

  it('should not render anything if the resource is undefined', () => {
    const wrapper = createApiResourceWrapper<ModelEntry, ViewProps>(isModelEntry)
    const Component = wrapper(ResourceView, LoadingComponent)
    const props = {
      ...minimumProps(),
      resource: undefined
    }
    const element = shallow(<Component {...props} />)
    expect(element.children().isEmpty).toBeTruthy()
  })

  it('should attempt to fetch the give resourceId if resource is undefined ', () => {
    const wrapper = createApiResourceWrapper<ModelEntry, ViewProps>(isModelEntry)
    const Component = wrapper(ResourceView, LoadingComponent)
    const props = {
      ...minimumProps(),
      resource: undefined
    }
    shallow(<Component {...props} />)
    expect(props.getResource).toHaveBeenCalledWith(props.resourceId)
  })

  it('should call getResource if the props change ', () => {
    const wrapper = createApiResourceWrapper<ModelEntry, ViewProps>(isModelEntry)
    const Component = wrapper(ResourceView, LoadingComponent)
    const props = {
      ...minimumProps(),
      resource: undefined
    }
    const element = shallow(<Component {...props} />)
    element.setProps({
      ...props,
      resourceId: 'bar'
    })
    expect(props.getResource).toHaveBeenCalledTimes(2)
    expect(props.getResource).toHaveBeenLastCalledWith('bar')
  })
})
