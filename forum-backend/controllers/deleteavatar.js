const deleteAvatarRouter = require('express').Router()
const fs = require('fs')

deleteAvatarRouter.delete('/api/deleteavatar', function (req, res) {
  /*const fs = require('fs')
  const image = req.params.imagename
  try {
    fs.unlinkSync(image)
    //file removed
  } catch(err) {
    console.error(err)
  }*/
  console.log(req.params.filename)
  if (!req.params.imagename) {
      console.log("No file received")
      return res.status(500).json('Error in file delete')
    } else {
      console.log('File received')
      console.log(req.params.imagename)
      try {
          fs.unlinkSync(req.params.imagename)
          return res.status(200).send('Image has been deleted successfully')
        } catch (err) {
          return res.status(400).send(err)
        }
    }
})

module.exports = deleteAvatarRouter