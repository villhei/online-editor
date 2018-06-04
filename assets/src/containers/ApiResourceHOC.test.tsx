import createApiResourceWrapper from 'containers/ApiResourceHOC'
import { shallow } from 'enzyme'
import * as React from 'react'
import { ApiResource, ResourceStatus } from 'service/common'

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

function isModelEntry(obj: Object): obj is ModelEntry {
  const entry = obj as ModelEntry
  return Boolean(entry.id && entry.someProp)
}

describe('ApiResourceWrapping', () => {
  it('should return a usable wrapper', () => {
    const wrapper = createApiResourceWrapper(isModelEntry)
    expect(wrapper).toBeInstanceOf(Function)
  })

  it('should display a loading component on ResourceStatus.Loading', () => {
    const wrapper = createApiResourceWrapper<ModelEntry, ViewProps>(isModelEntry)
    const Component = wrapper(ResourceView, LoadingComponent)
    const props = {
      resourceId: 'foo',
      getResource: jest.fn(),
      resource: ResourceStatus.Loading
    }
    const element = shallow(<Component {...props} />)
  })
})
