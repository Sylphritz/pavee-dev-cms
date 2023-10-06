export const triggerDeployHook = async () => {
  const config = useAppConfig()

  return await $fetch(config.frontendDeployHookUrl, {
    method: 'POST',
  })
}
