import { rootReducer } from '../reducer'

console.log(rootReducer)
describe('Root reducer', () => {
  it('should return a valid reducer', () => {
    expect(rootReducer).toEqual(true)
  })
})