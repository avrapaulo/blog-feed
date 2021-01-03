import { render } from 'test/test-utils'
import { DetailPage } from 'pages/[slug]'
import { posts } from 'test/__mocks__/'

describe('Home page', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<DetailPage post={posts[0]} />, {})
    expect(asFragment()).toMatchSnapshot()
  })
})
