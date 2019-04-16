import config from '../config/blog'

export default class Image{
    constructor(data){
        this.id = data.id
        this.data = { url: data.url, ext: data.ext }
    }

}