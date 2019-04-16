export default class Storage{
    constructor(firebase){
        this.firebase = firebase
        this.bucket = firebase.storage()
        this.posts = this.bucket.ref('posts')
    }
    uploadFile(where, file){
        console.log('where',where, file)
        return this.bucket.ref(where).put(file)
        // console.log('uploadTask', uploadTask)
    }
    deleteFile(where){
        return this.bucket.ref(where).delete()
    }
}