import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Index from '@/pages/index.vue'

describe('Page: index.vue', async () => {
  it('renders correctly', () => {
    const wrapper = mount(Index)

    expect(wrapper.element).toMatchSnapshot()
  })
})
