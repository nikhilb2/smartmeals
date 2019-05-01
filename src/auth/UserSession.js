'use strict'
import { AsyncStorage } from 'react-native'

const userSessionKey = 'USER_DATA'

export let currentSession = null
let session = null

export async function restoreSession () {
  try {
    const data = await AsyncStorage.getItem(userSessionKey)
    const userData = JSON.parse(data)
    // console.log('Restoring User Session, user data: ', userData)
    if (userData !== null) {
      currentSession = userData
      return userData
    } else {
      throw new Error('User Data is empty')
    }
  } catch (error) {
  //  console.log(error)
    return null
  }
}

export async function reload () {
  session = await restoreSession()
  return session
}

export async function logout () {
  await AsyncStorage.removeItem(userSessionKey)
  session = await restoreSession()
  currentSession = session
  return session
}

export async function login (user: User) {
  const userData = JSON.stringify(user)
  await AsyncStorage.setItem(userSessionKey, userData)
  session = await restoreSession()
  return session
}

export async function updateUserData (data) {
  const session = await restoreSession()
  session.data = data
  const userData = JSON.stringify(session)
  await AsyncStorage.setItem(userSessionKey, userData)
  return userData
}
