import prisma from '../../../lib/prisma'

export default async function handler(req, res) {
  try {
    const users = await prisma.user.findMany()
    res.status(200).json(users)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
}
