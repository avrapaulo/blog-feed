import { NextApiRequest, NextApiResponse } from 'next'
import { Comment } from 'models/comment'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PUT') {
    try {
      const { id } = req.query
      const { content, user, postId, date } = req.body

      if (!content || !user || !date || !postId) {
        return res.status(400).json({ error: 'User, Date, PostId and Content are required' })
      }

      const body = await fetch(`${process.env.API_URL}/comments/${id}`, {
        body: JSON.stringify({
          content,
          user,
          postId,
          date,
          dateUpdate: new Date()
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'PUT'
      })
      const comments: Comment = await body.json()

      return res.status(200).json(comments)
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message })
    }
  } else {
    res.setHeader('Allow', 'PUT')
    res.status(405).end('Method Not Allowed')
  }
}
