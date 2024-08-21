const express = require('express')
const multer = require('multer')
const fs = require('node:fs')
const app = express()
const PORT = 8080

const upload = multer({ dest: 'uploads/'})

app.get('/', (req, res) => {
    res.send('Hello Worlds')
})

app.get("/file", (req, res) => {

    try {
        const data = fs.readFileSync('uploads//3a0b1047ead9a4ecc5d5b08bc69931dd', 'utf8');
        console.log(data);
        res.send(data)
      } catch (err) {
        console.error(err);
        res.status(404).send(err)
      }
    // fs.readFile('uploads//3a0b1047ead9a4ecc5d5b08bc69931dd', 'utf8', (err, data) => {
    //     if(err) {
    //         res.send(err)
    //     }
    //     res.send(data)
    // })
})

app.post('/upload', upload.single('file'), (req,res) => {
    console.log(`Uploaded at: ${req.file.destination}/${req.file.filename}`)
    res.send('File Uploaded!')
})

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
})

// curl -F "file=@assignment_soft_eng" 127.0.0.1:8080/upload
