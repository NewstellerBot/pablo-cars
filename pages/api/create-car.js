import prisma from '../../lib/prisma'

// model cars {
//     id          String   @id
//     title       String
//     maker       String
//     year        Int
//     price       Int
//     createdAt   DateTime @default(now())
//     description String
//   }

export default async function handler(req, res) {
  try {
    const { params } = req.body
    await prisma.cars.create({
      data: {
        ...params,
      },
    })
    res.send('ok')
  } catch (error) {
    res.status(500).send({ error })
  }
}
