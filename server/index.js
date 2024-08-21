require('dotenv').config()
const express = require('express')
const multer = require('multer')
var cors = require('cors')
const fs = require('node:fs')
const app = express()
const PORT = 8080

const upload = multer({ dest: 'uploads/'})
app.use(cors())
app.use(express.json())

const getSummary = async (data) => {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
        {
            headers: {
                "Authorization": `Bearer ${process.env.API_KEY}`,
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    const result = await response.json();
    return result;
}


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
})

app.get("/summary", (req,res) => {
    async function query(data) {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
            {
                headers: {
                    "Authorization": `Bearer ${process.env.API_KEY}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(data),
            }
        );
        const result = await response.json();
        return result;
    }
    

    try {
        const data = fs.readFileSync('uploads//3a0b1047ead9a4ecc5d5b08bc69931dd', 'utf8');
        // console.log(data);
        query({
            inputs: data,
            parameters: {
                min_length: 400,
                max_length: 600
            },
            options: {
                use_cache: false
            }
        })
        .then((response) => {
            res.send(response)
        })
        .catch(err=>{
            res.status(404).send(err)
        });
        // res.send(data)
      } catch (err) {
        // console.error(err);
        res.status(404).send(err)
      }
})

app.post('/upload', upload.single('file'), (req,res) => {
    console.log(`Uploaded at: ${req.file.destination}/${req.file.filename}`)
    res.send('File Uploaded!')
})

app.post('/test', (req,res) => {
    getSummary({
        inputs: req.body.input
    })
    .then((response) => {
        console.log('G')
        res.send(response)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).send(err)
    });
})


app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
})

// curl -F "file=@assignment_soft_eng" 127.0.0.1:8080/upload
