import ky from 'ky'
import Strapi from 'strapi-sdk-javascript'
import config from '../config'

const strapi = new Strapi(config.serverBaseUrl)

// todo 处理 jwt 续期
export default ky.create({
  mode: 'cors',
  throwHttpErrors: false,
})

export { strapi }
