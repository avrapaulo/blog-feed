import Link from 'next/link'
import { Container, Card } from 'react-bootstrap'
import { FormatDate } from 'components/format-date'
import { Post } from 'models/post'
import { motion } from 'framer-motion'
interface Props {
  posts: Post[]
}

const transition = { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }

const frameVariants = {
  hover: { scale: 0.95 }
}

const Feed = ({ posts }: Props) => (
  <Container>
    {posts.map(({ id, title, publish_date, description, author, slug }) => (
      <motion.div whileHover="hover" variants={frameVariants} transition={transition} key={id}>
        <Link href={`/${slug}`}>
          <a className="link-unstyled">
            <Card className="border-left-0 border-right-0 border-top-0 rounded-0">
              <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  <FormatDate publish_date={publish_date} />
                </Card.Subtitle>
                <Card.Text className="mb-1">{description}</Card.Text>
                <Card.Subtitle className="text-right">
                  <p>
                    <small>{author}</small>
                  </p>
                </Card.Subtitle>
              </Card.Body>
            </Card>
          </a>
        </Link>
      </motion.div>
    ))}
  </Container>
)

export { Feed }
