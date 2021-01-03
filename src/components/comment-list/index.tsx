import { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { FormatDate } from 'components/format-date'
import { Comment } from 'models/comment'

interface Props {
  postId: number
}

const CommentList = ({ postId }: Props) => {
  const [comments, setComments] = useState([])

  useEffect(() => {
    const fetchComments = async () => {
      const body = await fetch(`api/posts/${postId}/comments`)
      const result: Comment[] = await body.json().then(e =>
        e.sort((a: Comment, b: Comment) => {
          if (a.date === b.date) return 0

          return a.date < b.date ? 1 : -1
        })
      )
      setComments(result)
    }

    // if (postId)
    fetchComments()
  }, [])

  return (
    <>
      <div className="mt-4">Comments: </div>
      {/* eslint-disable-next-line multiline-ternary */}
      {comments.length === 0 ? (
        <div className="text-center">No comments</div>
      ) : (
        comments.map(({ id, content, user, date }) => (
          <Card key={id} className="border border-white bg-light">
            <Card.Body>
              <Card.Subtitle className="mt-1 text-muted text-left">
                <FormatDate publish_date={date} />
              </Card.Subtitle>
              {content}
              <Card.Subtitle className="mt-1 text-muted text-right">{user}</Card.Subtitle>
            </Card.Body>
          </Card>
        ))
      )}
    </>
  )
}

export { CommentList }
