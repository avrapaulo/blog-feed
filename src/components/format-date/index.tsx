import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)

interface Props {
  publish_date: Date
}

const FormatDate = ({ publish_date }: Props) => (
  <>{`${dayjs(publish_date).format('LL')} (${dayjs().to(dayjs(publish_date))})`}</>
)

export { FormatDate }
