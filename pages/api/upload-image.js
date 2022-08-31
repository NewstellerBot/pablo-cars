import s3 from '../../lib/s3'

export default async function handler(req, res) {
  try {
    const { file, type } = req.query
    const url = await s3.getSignedUrlPromise('putObject', {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      ContentType: type,
      Key: file,
      Expires: 60, // seconds
    })

    return res.status(200).send({ url })
  } catch (error) {
    console.log(error)
  }
}
