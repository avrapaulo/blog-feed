import dayjs from 'dayjs'
import { render } from 'test/test-utils'
import { FormatDate } from '.'

describe('Format date component', () => {
  it('Given a date', () => {
    const { getByText } = render(<FormatDate publish_date={dayjs('2020-02-23').toDate()} />, {})
    expect(getByText(/February 23, 2020/)).toBeInTheDocument()
  })
})
