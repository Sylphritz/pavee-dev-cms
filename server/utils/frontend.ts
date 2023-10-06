export const triggerDeployHook = async () => {
  const config = useRuntimeConfig()

  if (config.frontendDeployHookUrl) {
    return await $fetch(config.frontendDeployHookUrl, {
      method: 'POST',
    })
  }
}
