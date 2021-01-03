export interface Comment {
  id: number
  postId: number
  parent_id: number
  user: string
  date: Date
  content: string
  dateUpdate?: Date
}
