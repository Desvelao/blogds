import path from 'path'
import factoryStructure from './base'
const Base = factoryStructure('images', 'images')

export default class Image extends Base{
    constructor(id, data) {
        super(id)
        this.id = id
        this.data = { url: data.url, ext: data.ext }
    }
    static async delete(data) {
        try{
            // console.log(data)
            await super.db.doc(data.id).delete()
            await super.storage.child(`${data.id}${data.ext}`).delete()
        }catch(err){
            throw err
        }
    }
    static upload(filename, file){
        console.log('STORAGE IMAGE',super.storage)
        return super.storage.child(filename).put(file)
    }
    static uploadData(id, url, ext){
        return {id, url, ext}
    }
    static generateDataFromFile(file){
        return { name: `${new Date().getTime()}`, ext: path.extname(file.name) }
    }
}