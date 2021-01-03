import { useState, useRef } from 'react'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { Modal, Navbar, Button, Form } from 'react-bootstrap'

interface Errors {
  user: { isInvalid: boolean; message: string }
  password: { isInvalid: boolean; message: string }
}

const defaultForm = {
  user: { isInvalid: true, message: '' },
  password: { isInvalid: true, message: '' }
}

const Header = () => {
  const [form, setForm] = useState<Errors>(defaultForm)
  const [show, setShow] = useState(false)
  const [isLogIn, setIsLogIn] = useState(Cookies.get('name'))
  const inputUser = useRef(null)
  const inputPw = useRef(null)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleLogOut = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    Cookies.remove('name')
    setIsLogIn(null)
    window.location.reload()
  }

  const handleSignIn = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    const user = inputUser.current.value
    const password = inputPw.current.value

    if (user === '') {
      setForm(state => ({ ...state, user: { isInvalid: false, message: 'required field' } }))
      return
    }
    if (password === '') {
      setForm(state => ({ ...state, password: { isInvalid: false, message: 'required field' } }))
      return
    }

    setIsLogIn(user)
    Cookies.set('name', user)
    setShow(false)
    window.location.reload()
  }

  const resetForm = async (e: React.ChangeEvent<HTMLElement>) => {
    e.preventDefault()
    setForm(defaultForm)
  }

  return (
    <>
      <Navbar className="justify-content-between">
        <Navbar.Brand>
          <Link href={'/'}>
            <a className="link-unstyled">Blog</a>
          </Link>
        </Navbar.Brand>
        {/* eslint-disable-next-line multiline-ternary */}
        {isLogIn ? (
          <Navbar.Text>
            Signed in as: {isLogIn}{' '}
            <Button variant="outline-dark" onClick={handleLogOut}>
              Log out
            </Button>
          </Navbar.Text>
        ) : (
          <Navbar.Text>
            <Button variant="outline-dark" onClick={handleShow}>
              Sign in
            </Button>
          </Navbar.Text>
        )}
      </Navbar>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicUser">
              <Form.Label>User</Form.Label>
              <Form.Control
                ref={inputUser}
                type="user"
                placeholder="Enter user"
                isInvalid={!form.user.isInvalid}
                onChange={resetForm}
              />
              <Form.Control.Feedback type="invalid">{form.user.message}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={inputPw}
                placeholder="Password"
                isInvalid={!form.password.isInvalid}
                onChange={resetForm}
              />

              <Form.Control.Feedback type="invalid">{form.password.message}</Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSignIn}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export { Header }
