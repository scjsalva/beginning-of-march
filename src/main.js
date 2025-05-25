import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

/* Import Font Awesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* Import specific icons */
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
  faShare
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
  faShare
)

/* Create Vue app */
const app = createApp(App)

/* Register Font Awesome component */
app.component('font-awesome-icon', FontAwesomeIcon)

/* Mount the app */
app.mount('#app')
