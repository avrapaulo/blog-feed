import Head from 'next/head'
import { Feed } from 'components/feed'
import { GetServerSideProps } from 'next'
import { Blog } from 'models/blog'

interface Props {
  blogs: Blog[]
}

const HomePage = ({ blogs }: Props) => (
  <>
    <Head>
      <title>Blog Feed</title>
    </Head>
    <Feed blogs={blogs} />
  </>
)

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch(`${process.env.API_URL}/posts`)
  const blogs: Blog[] = await response.json().then(e =>
    e.sort((a: Blog, b: Blog) => {
      if (a.publish_date === b.publish_date) return 0

      return a.publish_date < b.publish_date ? 1 : -1
    })
  )

  return {
    props: {
      blogs
    }
  }
}

export default HomePage
