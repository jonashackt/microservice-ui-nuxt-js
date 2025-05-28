import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import Logo from '../components/Logo.vue'

describe('Logo', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(Logo)
    expect(wrapper.vm).toBeTruthy()
  })
})