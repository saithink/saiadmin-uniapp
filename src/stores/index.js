import { createPinia } from 'pinia'

import useSiteStore from './modules/site'
import useUserStore from './modules/user'

const pinia = createPinia()

export { useSiteStore, useUserStore }

export default pinia
