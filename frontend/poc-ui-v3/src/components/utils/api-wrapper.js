import axios from 'axios'
import config from '../../../configs/config'

const apiWrapper = axios.create({
  baseURL: config.apiBaseUrl,
})

export default apiWrapper
