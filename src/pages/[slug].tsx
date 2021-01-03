import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import { Card, Button } from 'react-bootstrap'
import { FormatDate } from 'components/format-date'
import { CommentList } from 'components/comment-list'
import { Post } from 'models/post'

interface Props {
  post: Post
}

const DetailPage = ({ post: { publish_date, title, content, author, id } }: Props) => (
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
        <Card.Text className="text-justify">
          <div
            dangerouslySetInnerHTML={{
              __html: content
            }}
          />
        </Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted text-right">{author}</Card.Footer>
    </Card>
    <CommentList postId={id} />
  </>
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
  console.log(id)
  const res = await fetch(`${process.env.API_URL}/posts/${id}`)
  const post = await res.json()

  return { props: { post } }
}

export default DetailPage
