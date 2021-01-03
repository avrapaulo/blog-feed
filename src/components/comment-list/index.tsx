import useSWR from 'swr'
import { AddComment } from 'components/form/add-comment'
import { Comment } from 'models/comment'
import { CommentCart } from './comment'

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
        comments?.map((comment: Comment) => <CommentCart key={comment.id} {...comment} />)
      )}
    </>
  )
}

export { CommentList }
