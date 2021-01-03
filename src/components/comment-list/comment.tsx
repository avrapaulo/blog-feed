import { Card, Button, Form } from 'react-bootstrap'
import Cookies from 'js-cookie'
import { FormatDate } from 'components/format-date'
import { Comment } from 'models/comment'
import { useState, useRef } from 'react'
import { trigger } from 'swr'

const CommentCart = ({ id, date, content, user, postId, dateUpdate }: Comment) => {
  const [openEdit, setOpenEdit] = useState(false)
  const inputComment = useRef(null)

  const userName = Cookies.get('name')

  const handleEdit = async () => {
    if (openEdit) {
      await fetch(`/api/comments/${id}`, {
        body: JSON.stringify({
          user,
          date,
          postId,
          content: inputComment.current.value,
          dateUpdate: new Date()
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'PUT'
      })
      trigger(`api/posts/${postId}/comments`)
    }

    setOpenEdit(!openEdit)
  }

  return (
    <Card className="border border-white bg-light">
      <Card.Body>
        <Card.Subtitle className="mt-1 text-muted text-left">
          <FormatDate publish_date={date} />
        </Card.Subtitle>
        {/* eslint-disable-next-line multiline-ternary */}
        {openEdit ? (
          <Form.Group>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Small text"
              defaultValue={content}
              ref={inputComment}
            />
          </Form.Group>
        ) : (
          content
        )}
        <Card.Subtitle className="mt-1 text-muted text-right">
          {user}{' '}
          {userName === user && (
            <Button variant="secondary" size="sm" onClick={handleEdit}>
              {openEdit ? 'save' : 'edit'}
            </Button>
          )}
        </Card.Subtitle>
        {dateUpdate && (
          <p className="mt-1 text-muted text-right h6">
            <small>
              edited: <FormatDate publish_date={dateUpdate} />
            </small>
          </p>
        )}
      </Card.Body>
    </Card>
  )
}

export { CommentCart }
