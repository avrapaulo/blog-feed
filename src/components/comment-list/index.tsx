import { Card } from 'react-bootstrap'
import useSWR from 'swr'
import { AddComment } from 'components/form/add-comment'
import { FormatDate } from 'components/format-date'
import { Comment } from 'models/comment'

interface Props {
  postId: number
}

const CommentList = ({ postId }: Props) => {
  const comments = useSWR(`api/posts/${postId}/comments`).data?.sort((a: Comment, b: Comment) => {
    if (a.date === b.date) return 0
    return a.date < b.date ? 1 : -1
  })

  return (
    <>
      <div className="mt-4">Comments: </div>
      <AddComment postId={postId} />
      {/* eslint-disable-next-line multiline-ternary */}
      {comments?.length === 0 ? (
        <div className="text-center">No comments</div>
      ) : (
        comments?.map(({ id, content, user, date }) => (
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
