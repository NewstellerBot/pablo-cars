import prisma from '../../lib/prisma'

export default async function handler(req, res) {
  try {
    const cars = await prisma.cars.findMany()
    return res.status(200).json(cars)
  } catch (error) {
    console.log(error)
  }
}
