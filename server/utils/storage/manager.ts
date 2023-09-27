import {
  S3Client,
  ListObjectsV2Command,
  ListObjectsV2CommandInput,
  PutObjectCommandInput,
  PutObjectCommand,
} from '@aws-sdk/client-s3'
import { MultiPartData } from 'h3'

// const config = useRuntimeConfig()

const client = new S3Client({
  region: 'auto',
  endpoint: process.env.NUXT_S3_ENDPOINT as string,
  credentials: {
    accessKeyId: process.env.NUXT_S3_ACCESS_KEY as string,
    secretAccessKey: process.env.NUXT_S3_SECRET_KEY as string,
  },
})

export const listObjects = async (
  location?: string,
  continuationToken?: string,
  limit: number = 1000
) => {
  const options: ListObjectsV2CommandInput = {
    Bucket: process.env.NUXT_S3_BUCKET,
    Prefix: location,
    MaxKeys: limit,
  }

  if (continuationToken) options['ContinuationToken'] = continuationToken

  const command = new ListObjectsV2Command(options)

  return await client.send(command)
}

export const addObject = async (userId: string, file: MultiPartData) => {
  // const blob = new Blob([file], { type: file.type })
  // const arrayBuffer = await fileToArrayBuffer(file)

  const input: PutObjectCommandInput = {
    Body: file.data,
    Bucket: process.env.NUXT_S3_BUCKET,
    Key: `${userId}/${new Date().getTime()}_${file.filename}`,
    ContentType: file.type,
  }

  const command = new PutObjectCommand(input)

  return await client.send(command)
}
