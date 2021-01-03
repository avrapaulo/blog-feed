import Link from 'next/link'
import { Container, Card } from 'react-bootstrap'
import { FormatDate } from 'components/format-date'
import { Post } from 'models/post'
interface Props {
  posts: Post[]
}

const Feed = ({ posts }: Props) => (
  <Container>
    {posts.map(({ id, title, publish_date, description, author, slug }) => (
      <Link key={id} href={slug}>
        <a className="link-unstyled">
          <Card className="border-left-0 border-right-0 border-top-0 rounded-0">
            <Card.Body>
              <Card.Title>{title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                <FormatDate publish_date={publish_date} />
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
