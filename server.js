const express = require('express')
const app = express();
var path = require('path')
let bodyParser = require('body-parser');
const mysql = require('mysql');

var connection = mysql.createConnection({
    "host": "127.0.0.1",
    "user": "root",
    "password": "Admin@123",
    "database": "Table",
    "port": "3306"
})

connection.connect((err, res) => {
    if (err) {
        console.log('er', err)
    }
    console.log('connected Successfully')
})

app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
    let sql = "select * from EMP"
    connection.query(sql, function (err, result) {
        if (result) {
            console.log('result', result)
            res.render('index', {
                title: 'Employee Details',
                emp: result
            })
        } else {
            console.log('err', err)

        }
    })

})

app.get('/add', (req, res) => {

    res.render('add_employee', {
        title: 'Employee Details'

    })
})
app.post('/save', (req, res) => {
    console.log('req.body', req.body)
    var sql = `INSERT INTO EMP ( First_name, Middle_name, Last_name, DOB, Gender, Basic, Allowanace, Deduction, Netsal) VALUES ('${req.body.First_name}', '${req.body.Middle_name}','${req.body.Last_name}','${req.body.DOB}','${req.body.Gender}',${req.body.Basic},${req.body.Allowanace},${req.body.Deduction},${req.body.Netsal})`;
    connection.query(sql, function (err, result) {
        if (result) {
            console.log('result', result)
            res.redirect('/')
        } else {
            console.log('err', err)

        }
    })
});

app.get('/update/:Empid', (req, res) => {
    const Empid = req.params.Empid;
    console.log('Empid', Empid)
    let sql = `select * from EMP where Empid = ${Empid}`;
    connection.query(sql, (err, result) => {
        console.log('result', result)
        if (result) {
            res.render('edit_employee', {
                title: 'Employee Details',
                emp: result[0]

            })
        } else {
            console.log('error', err)
        }

    })

})

app.post('/update', (req, res) => {
    console.log('req.body', req.body)
    var sql = `update EMP set First_name='${req.body.First_name}', Middle_name='${req.body.Middle_name}', Last_name='${req.body.Last_name}', DOB='${req.body.DOB}', Gender='${req.body.Gender}', Basic=${req.body.Basic}, Allowanace=${req.body.Allowanace}, Deduction=${req.body.Deduction}, Netsal=${req.body.Netsal} where  Empid= ${req.body.Empid}`;
    connection.query(sql, function (err, result) {
        if (result) {
            console.log('result', result)
            res.redirect('/')
        } else {
            console.log('err', err)

        }
    })
});

app.get('/delete/:Empid', (req, res) => {
    const Empid = req.params.Empid;
    let sql = `DELETE from EMP where Empid = ${Empid}`;
    connection.query(sql, (err, result) => {
        console.log('result', result)
        if (result) {
            res.redirect('/')

        } else {
            console.log('error', err)
        }

    })

})

app.listen(8080)
console.log(`Server running on http://localhost:8080`);



