import { AppProps } from 'next/app'
import { Container } from 'react-bootstrap'
import { SWRConfig } from 'swr'
import { Header } from 'components/header'
import 'styles/index.scss'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <SWRConfig value={{ fetcher: (url: string) => fetch(url).then(r => r.json()) }}>
    <Container className="md-container">
      <Header />
      <Component {...pageProps} />
    </Container>
  </SWRConfig>
)

export default MyApp
