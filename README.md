# Api estudiantes 📃

## Correr el proyecto angular: 
`ng serve`


## Correr contenedor de docker: 
1. `cd api`
2. `docker-compose build`
3. `docker-compose up`

-Api estudiantes de un curso.
### Esquema del modelo student.

let Student = new Schema({
  name: {
    type: String,
    required:true
  },
  id_student: {
    type: String,
    required:true,
    unique:true
  },
  mean_grades: {
    type: Number
  },
  semester: {
    type: Number,
    required:true
  }
}

## Consumo de endpoints
1. ### Crear un regisro

http://localhost:4000/students/add Method: POST
ejemplo body:
`{
    "name":"maria",
    "id_student":"321",
    "mean_grades":3.3,
    "semester":1
}`


2. ### Entregar	una	colección:
http://localhost:4000/students/ <br>
Method: GET<br/>
Devuelve todos los estudiantes de la BD.

3. ### Entregar	un	registro
Get a document: 
http://localhost:4000/students/student/:id_student <br/>
Method: GET <br/>
Devuelve la informacion de un estudiante en particular.

4. ### Modificar	un	registro 
Update/modify a Document: 
http://localhost:4000/students/edit/:id_student Method: PUT.
ejemplo body:
`{
"mean_grades": 4
}`
Modifica a un estudiante.

5. ### Eliminar	un	registro
Delete a Document: http://localhost:4000/students/delete/:id_student Method: DELETE
Elimina un estudiante

6. ### Modificar	todos	los	registros	que	cumplan	con	un	criterio
http://localhost:4000/students/actualizar Method: GET
Actualiza el nombre (ABCD) a los estudiantes que satisfacen la condicion de que el semestre sea >= 2:


7. ### Entregar	el	promedio	de	las	notas	de	todos	los	estudiantes	de	un	curso
http://localhost:4000/students/promedio
Method: GET
Devuelve el promedio de las notas de los estudiantes matriculados. (todos pertenecen al mismo curso).


### El uso de docker es muy util. Nos brinda la facilidad de usar herramientas de manera agil en el desarrollo de un producto software.