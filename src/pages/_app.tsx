import { AppProps } from 'next/app'
import { Container } from 'react-bootstrap'
import { Header } from 'components/header'
import 'styles/index.scss'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Container className="md-container">
    <Header />
    <Component {...pageProps} />
  </Container>
)

export default MyApp
