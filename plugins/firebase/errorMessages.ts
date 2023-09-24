const firebaseErrorMessages: Record<string, string> = {
  'auth/email-already-in-use': 'An account with this email already exists.',
  'auth/weak-password': 'Your password is too insecured.',
  'auth/invalid-login-credentials':
    'Wrong email or password. Please try again.',
}

export default firebaseErrorMessages
