const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "empleados_crud"
});

const app = express();
app.use(cors());
app.use(express.json())

app.post("/crear", (req, res) =>{
    const nombre = req.body.nombre;
    const pais = req.body.pais;
    const edad = req.body.edad;
    const anio = req.body.anio;
    const cargo = req.body.cargo;

    db.query("INSERT INTO empleados (nombre, edad, pais, cargo, anio) VALUES (?,?,?,?,?)", [nombre, edad, pais, cargo, anio], 
        (err, result) =>{
            if(err){
                console.log(err)
            }else{
                res.status(200).send(result)
            }
        }
    )
})

app.get("/empleados", (req, res) =>{
    db.query("SELECT * FROM empleados ORDER BY id DESC", 
        (err, result) =>{
            if(err){
                console.log(err)
            }else{
                res.status(200).send(result)
            }
        }
    )
})

app.delete("/eliminar/:id", (req, res) =>{
    const id = req.params.id;

    db.query("DELETE FROM empleados WHERE id=?" , id, 
        (err, result) =>{
            if(err){
                console.log(err)
            }else{
                res.status(200).send(result)
            }
        }
    )
})
app.put("/actualizar", (req, res) =>{
    const id = req.body.id;
    const nombre = req.body.nombre;
    const pais = req.body.pais;
    const edad = req.body.edad;
    const anio = req.body.anio;
    const cargo = req.body.cargo;

    db.query("UPDATE empleados SET nombre=?, edad=?, pais=?, cargo=?, anio=? WHERE id=?" , [nombre, edad, pais, cargo, anio, id], 
        (err, result) =>{
            if(err){
                console.log(err)
            }else{
                res.status(200).send(result)
            }
        }
    )
})



app.listen(3002, ()=>{
    console.log("Corriendo en el puerto 3002")
})