import prisma from '../../lib/prisma'

export default async function handler(req, res) {
  try {
    const { id } = req.query
    await prisma.cars.deleteMany({
      where: { id },
    })

    res.status(200).send({ message: 'User updated' })
  } catch (error) {
    res.status(500).send({ error })
  }
}
