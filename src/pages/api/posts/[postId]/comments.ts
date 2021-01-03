import { NextApiRequest, NextApiResponse } from 'next'
import { Comment } from 'models/comment'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const { postId } = req.query
      const body = await fetch(`${process.env.API_URL}/posts/${postId}/comments`)
      const comments: Comment[] = await body.json()

      return res.status(200).json(comments)
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message })
    }
  } else if (req.method === 'POST') {
    try {
      const { postId } = req.query
      const { content, user } = req.body

      if (!content && !user) {
        return res.status(400).json({ error: 'User and Content are required' })
      }

      const body = await fetch(`${process.env.API_URL}/posts/${postId}/comments`, {
        body: JSON.stringify({
          content,
          user,
          date: new Date()
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      })
      const comments = await body.json()

      return res.status(200).json(comments)
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message })
    }
  } else {
    res.setHeader('Allow', 'GET, POST')
    res.status(405).end('Method Not Allowed')
  }
}
