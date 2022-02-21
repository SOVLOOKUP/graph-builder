import Strapi from "strapi-sdk-js"
import taskProcess from './taskProcess'
let strapi: Strapi

const _init = (strapiURL: string) => {
    strapi = new Strapi({ url: strapiURL })
}

const apis = {
    ...taskProcess
}

export default {
    _init,
    ...apis
}
export { apis, strapi }
