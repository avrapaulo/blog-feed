import Link from 'next/link'
import { Card, Button } from 'react-bootstrap'
import { FormatDate } from 'components/format-date'
import { Post } from 'models/post'

const CommentDetails = ({ publish_date, title, content, author }: Post) => (
  <>
    <Button variant="outline-light" className="mb-2">
      <Link href="/">
        <a>🔙</a>
      </Link>
    </Button>
    <Card className="text-center">
      <Card.Header className="text-right">
        <FormatDate publish_date={publish_date} />
      </Card.Header>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <div
          className="text-justify"
          dangerouslySetInnerHTML={{
            __html: content
          }}
        />
      </Card.Body>
      <Card.Footer className="text-muted text-right">{author}</Card.Footer>
    </Card>
  </>
)

export { CommentDetails }
