import { GetStaticPaths, GetStaticProps } from 'next'
import { motion } from 'framer-motion'
import Head from 'next/head'
import { CommentList } from 'components/comment-list'
import { CommentDetails } from 'components/comment-details'
import { Post } from 'models/post'

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

export const DetailPage = ({ post }: Props) => (
  <motion.div initial="exit" animate="visible" exit="exit" variants={variants}>
    <Head>
      <title>{post.title}</title>
    </Head>
    <CommentDetails {...post} />
    <CommentList postId={post.id} />
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
