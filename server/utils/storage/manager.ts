import {
  S3Client,
  ListObjectsV2Command,
  ListObjectsV2CommandInput,
  PutObjectCommandInput,
  PutObjectCommand,
} from '@aws-sdk/client-s3'
import { MultiPartData } from 'h3'

const config = useRuntimeConfig()

export const s3Client = new S3Client({
  region: 'auto',
  endpoint: config.s3Endpoint,
  credentials: {
    accessKeyId: config.s3AccessKey,
    secretAccessKey: config.s3SecretKey,
  },
})

export const listObjects = async (
  location?: string,
  continuationToken?: string,
  limit: number = 1000
) => {
  const options: ListObjectsV2CommandInput = {
    Bucket: config.s3Bucket,
    Prefix: location,
    MaxKeys: limit,
  }

  if (continuationToken) options['ContinuationToken'] = continuationToken

  const command = new ListObjectsV2Command(options)

  return await s3Client.send(command)
}

export const addObject = async (userId: string, file: MultiPartData) => {
  // const blob = new Blob([file], { type: file.type })
  // const arrayBuffer = await fileToArrayBuffer(file)

  const input: PutObjectCommandInput = {
    Body: file.data,
    Bucket: config.s3Bucket,
    Key: `${userId}/${new Date().getTime()}_${file.filename}`,
    ContentType: file.type,
  }

  const command = new PutObjectCommand(input)

  return await s3Client.send(command)
}
