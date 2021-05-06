const admin = require('firebase-admin')
const { connectFirestore } = require('./firestore')


exports.getAffirmations = (req, res) => {
  const db = connectFirestore()
  db.collection('affirmations')
    .get()
    .then((collection) => {
      const affirmationList = collection.docs.map((doc) => doc.data())
      res.send(affirmationList)
    })
    .catch((err) => res.status(500).send('Error getting affirmations: ' + err.message))
}

exports.postAffirmations = (req, res) => {
  if(!req.body || !req.body.text || !req.body.displayName || !req.body.photoURL) {
      res.status(400).send('Invalid Request')
  }
  const db = connectFirestore()
  const { uid, text, displayName, photoURL } = req.body
  const now = admin.firestore.FieldValue.serverTimestamp()
  const newAffirmation = {
      uid,
      created_at: now,
      text,
      displayName,
      photoURL
  }
  db.collection('affirmations').add(newAffirmation)
  .then(() =>{
    this.getAffirmations(req, res) // pass response to get all affirmations
  })
  .catch(err => res.send(500).send('Error posting affirmation: ' + err.message))
}
