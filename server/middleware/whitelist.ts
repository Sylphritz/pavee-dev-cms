export default defineEventHandler((event) => {
  const origin = getRequestHeader(event, 'origin')

  // TODO: Update the code to not allow access when there's no origin
  if (origin) {
    if (process.env.API_ALLOWED_ORIGINS?.split(',').includes(origin)) {
      setResponseHeader(event, 'access-control-allow-origin', origin)
    } else {
      throw createError({
        statusCode: 401, // Unauthorized,
        statusMessage: 'Access not allowed.',
      })
    }
  }
})
