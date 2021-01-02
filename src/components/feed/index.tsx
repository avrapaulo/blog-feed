import { Container, Card } from 'react-bootstrap'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { Blog } from 'models/blog'
import Link from 'next/link'
interface Props {
  blogs: Blog[]
}

dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)

const Feed = ({ blogs }: Props) => (
  <Container>
    {blogs.map(({ id, title, publish_date, description, author, slug }) => (
      <Link key={id} href={slug}>
        <a className="link-unstyled">
          <Card className="border-left-0 border-right-0 border-top-0 rounded-0">
            <Card.Body>
              <Card.Title>{title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {dayjs(publish_date).format('LL')} ({dayjs().to(dayjs(publish_date))})
              </Card.Subtitle>
              <Card.Text className="mb-1">{description}</Card.Text>
              <Card.Subtitle className="text-right">
                <small>{author}</small>
              </Card.Subtitle>
            </Card.Body>
          </Card>
        </a>
      </Link>
    ))}
  </Container>
)

export { Feed }
