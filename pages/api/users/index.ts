import { NextApiRequest, NextApiResponse } from 'next'
import { userLists } from 'static'

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!Array.isArray(userLists)) {
      throw new Error('Cannot find user data')
    }

    res.status(200).json(userLists)
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
