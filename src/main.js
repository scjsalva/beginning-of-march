import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

/* Import Font Awesome */
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
  faPlay, 
  faPause, 
  faRotateLeft,
  faRotateRight,
  faRepeat,
  faVolumeHigh,
  faVolumeXmark,
  faEllipsisVertical,
  faDownload,
  faShare,
  faEnvelope,
  faXmark
} from '@fortawesome/free-solid-svg-icons'

/* Add icons to the library */
library.add(
  faPlay,
  faPause,
  faRotateLeft,
  faRotateRight,
  faRepeat,
  faVolumeHigh,
  faVolumeXmark,
  faEllipsisVertical,
  faDownload,
  faShare,
  faEnvelope,
  faXmark
)

/* Create Vue app */
const app = createApp(App)

/* Register Font Awesome component */
app.component('font-awesome-icon', FontAwesomeIcon)

/* Use router */
app.use(router)

/* Mount the app */
app.mount('#app')
