import Link from 'next/link'
import { Navbar } from 'react-bootstrap'

const Header = () => (
  <Navbar>
    <Navbar.Brand>
      <Link href={'/'}>
        <a className="link-unstyled">Blog</a>
      </Link>
    </Navbar.Brand>
  </Navbar>
)

export { Header }
