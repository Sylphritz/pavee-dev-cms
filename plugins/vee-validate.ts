import { defineRule, configure } from 'vee-validate'
import { localize } from '@vee-validate/i18n'
import {
  required,
  alpha_spaces,
  confirmed,
  email,
  min,
  max,
} from '@vee-validate/rules'
import en from '@/locale/en/form/errorMessages.json'

export default defineNuxtPlugin(() => {
  defineRule('required', required)
  defineRule('alpha_spaces', alpha_spaces)
  defineRule('confirmed', confirmed)
  defineRule('email', email)
  defineRule('min', min)
  defineRule('max', max)

  configure({
    generateMessage: localize({
      en,
    }),
  })
})
