const express = require('express');
const app = express();
const student = express.Router();
// Require Business model in our routes module
let Studentt = require('../models/Student');
// Defined store route
//agregando student
student.post('/add', function (req, res) {
    let usuario = new Studentt(req.body);
    usuario.save().then(user => {
        return res.status(201).send({ user, message: "El estudiante fue creado exitosamente" });
    }).catch(error => res.status(409).send({ message: "El estudiante ya existe", error }));
})
//Trayendo a todos
student.get('/', function (req, res) {
    // busco todos los users y si no da error me devuelve arreglo users
    Studentt.find({}).then(users => {
        // si hay usuarios envio codigo de aceptacion y un cuerpo con los prdctos
        if (users.length) return res.status(200).send({ users });
        //en caso de que no hayan datos se manda un codigo y un mensaje xD
        return res.status(204).send({ message: 'NO CONTENT' });
    }).catch(error => res.status(500).send({ error }));
})
//eliminando uno
student.delete('/delete/:value', function (req, res) {
    let query = {};
    query["id_student"] = req.params.value;
    Studentt.find(query).then(users => {
        //si no existen users
        if (!users.length) return res.status(404).send({ message: 'NOT FOUND' });
        return users[0].remove().then(user => res.status(200).send({ message: "REMOVED", user })).catch(error => res.status(500).send({ error }));
    }).catch(error => {
        if (req.body.error) return res.status(500).send({ error });
    });

})
//editando un student
student.put('/edit/:value', function (req, res) {
    let query = {};
    query["id_student"] = req.params.value;
    Studentt.find(query).then(users => {
        let ussuario = users[0];

        if (req.body.name == undefined || req.body.name == "" || req.body.name == null) {
            req.body.name = ussuario.name;
        }
        if (req.body.id_student == undefined || req.body.id_student == "" || req.body.id_student == null) {
            req.body.id_student = ussuario.id_student;
        }
        if (req.body.mean_grades == undefined || req.body.mean_grades == "" || req.body.mean_grades == null) {
            req.body.mean_grades = ussuario.mean_grades;
        }
        if (req.body.semester == undefined || req.body.semester == "" || req.body.semester == null) {
            req.body.semester = ussuario.semester;
        }
        let update = {
            name: req.body.name,
            id_student: req.body.id_student,
            mean_grades: req.body.mean_grades,
            semester: req.body.semester
        };
        Studentt.updateOne(query, update, (err, user) => {
            if (err) res.status(500).send({ message: `Error ${err}` })
            res.status(200).send({ message: "Actualizacion correcta" })
        });
    }).catch(error => {
        return res.status(400).send({ message: "Bad Request" });
    });
})

//mostrar solo un student
student.get('/student/:value', function (req, res) {
    let query = {};
    query["id_student"] = req.params.value;
    Studentt.find(query).then(users => {
        //si no existen users
        if (!users.length) return res.status(400).send({ message: "Bad Request" });

        // en caso de que si haya , se crea un user en el body (no existia)
        return res.status(200).send({ users });
    }).catch(error => res.status(500).send({ error }));
})
//actualizando varios
student.get('/actualizar', function (req, res) {
    Studentt.updateMany({semester:{$gte:2}},  
        {name:"ABCD"}, function (err, docs) { 
        if (err){ 
            return res.status(500).send({ error });
        } 
        else{ 
            return res.status(200).send({ message:"Usuarios con semestre > 2 fueron actualizados con nombre ABCD" });
        } 
    }); 
});
//Trayendo promedio
student.get('/promedio', function (req, res) {
    // busco todos los users y si no da error me devuelve arreglo users
    Studentt.find({}).then(users => {
        if (!users.length) return res.status(204).send({ message: 'NO CONTENT' });
        let promedio = 0;
        for(let i = 0;i<users.length;i++){
            promedio = users[i].mean_grades + promedio;
        }
        promedio = (promedio / users.length).toFixed(2);;
        
        return res.status(200).send({ promedio });
        
    }).catch(error => res.status(500).send({ error }));
})


module.exports = student;