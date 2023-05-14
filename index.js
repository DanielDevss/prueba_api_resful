const mysql = require('mysql2')
const cors = require('cors')
const express = require('express')
const app = express()

const db = mysql.createConnection({
    host    :   'localhost',
    user    :   'root',
    password:   'Daniel2001',
    database:   'cors'
})

db.connect((err)=>{
    if (err) throw err
    console.log('Conexión establecida con MySQL')
})

app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use(cors())

//SERVIDOR
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`API corriendo en puerto: ${port}`)
})

//RUTAS
app.get('/', (req,res) => {
    res.sendFile(`${__dirname}/index.html`)
})

app.post('/api/registro', (req,res) => {
    const {correo,clave,nombre} = req.body
    const sql = `INSERT INTO usuarios(correo,clave,nombre) VALUE('${correo}','${clave}','${nombre}');`
    db.query(sql, (err,results) => {
        if(err) {
            console.log(err)
            res.sendStatus(500)
        }else{
            res.sendStatus(200)
        }
    })
})

app.get('/api/usuarios', (req,res) => {
    const sql = `SELECT * FROM usuarios;`
    db.query(sql, (err,results) => {
        if(err) {
            console.log(err)
            res.sendStatus(500)
        }else{
            res.status(200).send(results)
        }
    })
})