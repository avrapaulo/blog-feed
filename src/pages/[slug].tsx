import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import { Card, Button } from 'react-bootstrap'
import { FormatDate } from 'components/format-date'
import { CommentList } from 'components/comment-list'
import { Post } from 'models/post'
import { motion } from 'framer-motion'

interface Props {
  post: Post
}

const variants = {
  hidden: { opacity: 0.5, x: -250 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { delay: 0.1, duration: 0.4 }
  },
  exit: {
    x: '-100vw',
    transition: { ease: 'easeInOut', duration: 1 }
  }
}

const DetailPage = ({ post: { publish_date, title, content, author, id } }: Props) => (
  <motion.div initial="exit" animate="visible" exit="exit" variants={variants}>
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
    <CommentList postId={id} />
  </motion.div>
)

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`${process.env.API_URL}/posts`)
  const posts: Post[] = await response.json()

  const paths = posts.map(({ slug }) => ({
    params: { slug }
  }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = (params.slug as string).substring(params.slug.lastIndexOf('-') + 1)
  const res = await fetch(`${process.env.API_URL}/posts/${id}`)
  const post = await res.json()

  return { props: { post } }
}

export default DetailPage
