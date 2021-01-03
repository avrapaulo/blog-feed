import { Post } from 'models/post'
import dayjs from 'dayjs'

export const posts: Post[] = [
  {
    id: 1,
    title: 'title',
    author: 'author',
    publish_date: dayjs('2020-02-23').toDate(),
    slug: 'slug',
    description: 'description',
    content: 'content'
  }
]
