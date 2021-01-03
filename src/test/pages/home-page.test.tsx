import { render } from 'test/test-utils'
import { HomePage } from 'pages'
import { posts } from 'test/__mocks__/'

describe('Home page', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<HomePage posts={posts} />, {})
    expect(asFragment()).toMatchSnapshot()
  })
})
