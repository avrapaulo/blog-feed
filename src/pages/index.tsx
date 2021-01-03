import Head from 'next/head'
import { Feed } from 'components/feed'
import { GetServerSideProps } from 'next'
import { Post } from 'models/post'

interface Props {
  posts: Post[]
}

const HomePage = ({ posts }: Props) => (
  <>
    <Head>
      <title>Blog Feed</title>
    </Head>
    <Feed posts={posts} />
  </>
)

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch(`${process.env.API_URL}/posts`)
  const posts: Post[] = await response.json().then(e =>
    e.sort((a: Post, b: Post) => {
      if (a.publish_date === b.publish_date) return 0

      return a.publish_date < b.publish_date ? 1 : -1
    })
  )

  return {
    props: {
      posts
    }
  }
}

export default HomePage
