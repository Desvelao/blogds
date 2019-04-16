import firebaseInstance from '../firebase'

export default function factoryBaseStructure(dbref, stref = ''){
    const dbRef = firebaseInstance.firestore().collection(dbref)
    const storeRef = firebaseInstance.storage().ref(stref)
    const _dbref = dbref
    return class Base {
        constructor(id) {
            this.id = id
        }
        async save() {
            return await Base.save(this.id, this.data)
        }
        toData(){
            return {id: this.id, ...this.data}
        }
        static async save(id, data) {
            if (!data) { return }
            console.log('Saving on', _dbref, id, data)
            try{
                await dbRef.doc(id).set(data)
            }catch(err){
                console.log("Error on Saving",err)
            }
        }
        static async delete(id){
            await dbRef.doc(id).delete()
        }
        static async find(fn) {
            if(fn){
                return await fn(dbRef).get()
            }
            return await dbRef.get()
        }
        static db = dbRef
        static storage = storeRef
    }
}