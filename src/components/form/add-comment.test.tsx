import { render, fireEvent } from 'test/test-utils'
import { AddComment } from './add-comment'

describe('Add comment component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<AddComment postId={1} />, {})
    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot with submit', () => {
    const { asFragment, getByText } = render(<AddComment postId={1} />, {})
    fireEvent.click(getByText('Submit'))
    expect(asFragment()).toMatchSnapshot()
  })
})
