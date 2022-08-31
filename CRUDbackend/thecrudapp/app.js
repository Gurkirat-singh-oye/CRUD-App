const express = require ('express')
const cors = require('cors')
const mysql = require('mysql');
const { query } = require('express');
const bodyparser = require('body-parser')
require('dotenv').config()

app = express()
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors())
app.use(bodyparser.json())
const  connec = mysql.createConnection({
    host: 'localhost',
    user: 'mysqluser',
    password: 'password',
    database: 'books',
    insecureAuth: true
})
connec.connect()

//default touchpoint
app.get('/', (req,res)=> {
    res.json({default : 'welcome to the CRUD app',
funcs : ['search', 'Add a Book', 'Update', 'Remove a book', 'bookmark']})
})

//search for book titles -- other categories to be implemented [ GET or READ ]
app.get('/search/:category/:searchterm', (req,res)=> {

    let query = 'select * from books where ' + req.params.category + ' like "%'+ req.params.searchterm +'%"'

    connec.query(
        query
        , (err, results, fields)=> {
        if (err) throw err

        res.json({results})
        console.log(query)

    })
})

//this is post or create 
app.post('/add', (req, res) => {

    let query = `insert into books (title, authors)\
        values ('${req.body.title}', '${req.body.authors}')`
    connec.query(
        query, (err, results, fields) => {
            if (err) throw err

            console.log(results)

        }
    )

    res.send('ACK!!')
})

//this is put/patch or update method
app.put('/update', (req, res) => {

    let query = `update books\
        set ${req.body.category} = '${req.body.data}'\
        where id = ${req.body.id}`
    connec.query(
        query, (err, results, fields) => {
            if (err) throw err

            console.log(results)
        }
    )

    console.log(req.body)
    res.send("ack!!!")
})

app.delete('/remove/:id', (req, res) => {
    let query = `delete from books where id = ${req.params.id}`

    connec.query(
        query, (err, results, fields) => {
            if (err) throw err

            console.log(results)
        }
    )

    console.log(`${req.params.id} <- this book is removed`)
    res.send("ack!!!")
})


app.listen(process.env.PORT || 3000, ()=>{})