const admin = require('firebase-admin')
const serviceAccount = require('../credentials2.json')

exports.connectFirestore = () => {
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
    return admin.firestore()
  }
}
