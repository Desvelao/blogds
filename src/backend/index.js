import firebaseInstance from './firebase'
import Database from './database'
import Auth from './auth'
import Storage from './storage'

export const auth = new Auth(firebaseInstance)
export const db = new Database(firebaseInstance)
export const storage = new Storage(firebaseInstance)
export const firebase = firebaseInstance

export default {
    auth,
    db,
    firebase,
    storage
}