import firebaseErrorMessages from '@/plugins/firebase/errorMessages'

export const getErrorMessage = (errorCode: string) => {
  const message = firebaseErrorMessages[errorCode]

  return message || 'An error has occurred. Please try again.'
}
