import Head from 'next/head'
import { Container } from 'react-bootstrap'

const HelloComponent = () => (
  <Container className="md-container">
    <Head>
      <title>Blog Feed</title>
    </Head>
    <Container>
      <h1>Hello</h1>
    </Container>
  </Container>
)

export { HelloComponent }
