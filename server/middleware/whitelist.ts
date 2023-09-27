export default defineEventHandler((event) => {
  const origin = getRequestHeader(event, 'origin')
  // console.log(event.path.startsWith('/api/v1/'))

  // TODO: Update the code to not allow access when there's no origin
  if (event.path.startsWith('/api/v1/') && origin) {
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
