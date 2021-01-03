import { useRef, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { trigger } from 'swr'
import Cookies from 'js-cookie'

interface Props {
  postId: number
}

interface Errors {
  isInvalid: boolean
  message: string
}

const AddComment = ({ postId }: Props) => {
  const inputEl = useRef(null)
  const [form, setForm] = useState<Errors>({ isInvalid: false, message: '' })
  const handleClick = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    const content = inputEl.current.value
    const userName = Cookies.get('name')

    if (content === '') {
      setForm({ isInvalid: true, message: 'required field' })
      return
    }

    if (content.length < 6) {
      setForm({ isInvalid: true, message: 'Needs to be at least 6 characters' })
      return
    }

    if (!userName) {
      setForm({ isInvalid: true, message: 'You need to Sign in' })
      return
    }

    await fetch(`api/posts/${postId}/comments`, {
      body: JSON.stringify({
        content,
        user: userName
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })

    trigger(`api/posts/${postId}/comments`)

    inputEl.current.value = ''
  }

  const resetForm = async (e: React.ChangeEvent<HTMLElement>) => {
    e.preventDefault()
    setForm({ isInvalid: false, message: '' })
  }

  return (
    <Form className="mt-5">
      <Form.Group>
        <Form.Label htmlFor="inlineFormInputName2" srOnly>
          Comment
        </Form.Label>
        <Form.Control
          className="mb-2 mr-sm-2"
          id="inlineFormInputName2"
          placeholder="Leave here your opinion"
          ref={inputEl}
          isInvalid={form.isInvalid}
          onChange={resetForm}
        />
        <Form.Control.Feedback type="invalid">{form.message}</Form.Control.Feedback>
      </Form.Group>
      <Button type="submit" className="mb-2" onClick={handleClick}>
        Submit
      </Button>
    </Form>
  )
}

export { AddComment }
