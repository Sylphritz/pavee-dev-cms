import { addObject } from '@/utils/storage/manager'

export default defineEventHandler(async (event) => {
  const files = await readMultipartFormData(event)

  if (event.context.params?.id && files && files.length) {
    return await addObject(event.context.params.id, files[0])
  } else {
    throw createError({
      statusCode: 500,
      statusMessage: 'Invalid parameters',
    })
  }
})
