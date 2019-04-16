export default class Auth{
    constructor(firebase){
        this.firebase = firebase
        this.auth = firebase.auth()
    }
    async signUp(email, password){
        try{
            const user = await this.auth.createUserWithEmailAndPassword(email, password)
            console.log('Successfull sign up',user)
        }catch(err){
            console.error('Error sign up', err)
            throw err
        }
    }
    async resetPassword(email){
        console.log('RESET EMAIL PASSWORD', email)
        try{
            return this.auth.sendPasswordResetEmail(email)
        }catch(err){
            throw err
        }
    }
    async login(email, password){
        try{
            const user = await this.auth.signInWithEmailAndPassword(email, password)
            console.log('Successfull login',user)
        }catch(err){
            console.error('Error login', err)
        }
    }
    async logout(){
        try {
            await this.auth.signOut()
            console.log('Successfull logout')
        } catch (err) {
            console.error('Error logout', err)
        }
    }
    onAuthStateChanged(fn){
        this.auth.onAuthStateChanged(fn)
    }
}