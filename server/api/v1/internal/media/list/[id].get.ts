import { listObjects } from '~/server/utils/storage/manager'

export default defineEventHandler(async (event) => {
  console.log(process.env.DB)
  const query = getQuery(event)

  if (event.context.params?.id) {
    return await listObjects(
      event.context.params.id,
      query.token as string | undefined,
      query.limit as number | undefined
    )
  } else {
    throw createError({
      statusCode: 500,
      statusMessage: 'Invalid parameters',
    })
  }
})
