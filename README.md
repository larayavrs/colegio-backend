## Introducción

Este es un proyecto de un sistema de gestión escolar.
Permite a los usuarios gestionar la información de estudiantes, profesores y cursos.

## Contenido

- [Esquemas](#esquemas)
  - [User](#user)
  - [Grade](#grade)
- [Rutas](#rutas)

### Esquemas

#### User
Este esquema define la estructura de un usuario en el sistema de gestión escolar, existen tres tipos de usuarios: estudiante, profesor y administrador.

- Relaciones: Ninguna

#### Grade
Este esquema define la estructura de una calificación, siempre las calificaciones en este caso
son numeros decimales que van del 1 hasta el 7, ya que el sistema educativo se basa en el sistema chileno.

- Relaciones:
  - `user`: Referencia al esquema `User`, indicando que una calificación pertenece a un estudiante específico.
  - `course`: Referencia al esquema `Course`, indicando que una calificación está asociada a un curso.

#### Course
Este esquema define la estructura de un curso o aula en el sistema de gestión escolar.

- Relaciones:
  - `user (teacher)`: Referencia al esquema `User`, indicando que un curso es impartido por un profesor específico.
  - `students`: Referencia al esquema `User`, indicando que un curso puede tener múltiples estudiantes inscritos.
  - `grades`: Referencia al esquema `Grade`, indicando que un curso puede tener múltiples calificaciones asociadas a sus estudiantes.

#### Subject
Este esquema define la estructura de una asignatura en el sistema de gestión escolar como Lenguaje, Matemáticas, Historia, etc.

- Relaciones:
  - `lessons`: Referencia al esquema `Lesson`, indicando que una asignatura tiene una clase especifica asociada.
  - `user [teacher]`: Referencia al esquema `User`, indicando que una asignatura puede ser impartida por múltiples profesores.

#### Lesson
Este esquema define la estructura de una clase especifica en un dia y una hora determinada.

- Relaciones:
  - `subject`: Referencia al esquema `Subject`, indicando que una clase pertenece a una asignatura específica.
  - `course`: Referencia al esquema `Course`, indicando que una clase está asociada a un curso específico.
  - `user [teacher]`: Referencia al esquema `User`, indicando que una clase es impartida por un profesor específico.

#### Exam
Este esquema define la estructura de un examen en el sistema de gestión escolar.

- Relaciones:
  - `lesson`: Referencia al esquema `Lesson`, indicando que un examen está asociado a una clase específica.

#### Assignment
Este esquema define la estructura de una tarea o trabajo a realizar por los estudiantes.|

- Relaciones:
  - `lesson`: Referencia al esquema `Lesson`, indicando que una tarea está asociada a una clase específica.

#### Result
Este esquema define la estructura de un resultado de un examen o tarea.

- Relaciones:
  - `exam`: Referencia al esquema `Exam`, indicando que un resultado está asociado a un examen específico.
  - `assignment`: Referencia al esquema `Assignment`, indicando que un resultado está asociado a una tarea específica.
  - `user (student)`: Referencia al esquema `User`, indicando que un resultado pertenece a un estudiante específico.

#### Atendance
Registra la asistencia de un estudiante a una clase específica.

- Relaciones:
  - `user (student)`: Referencia al esquema `User`, indicando que una asistencia pertenece a un estudiante específico.
  - `lesson`: Referencia al esquema `Lesson`, indicando que una asistencia está asociada a una clase específica.

#### Event
Este esquema define la estructura de un evento en el sistema de gestión escolar, como una reunión, una actividad extracurricular, etc.

- Relaciones: Ninguna

#### Announcement
Este esquema define la estructura de un anuncio en el sistema de gestión escolar, como un aviso importante, una noticia, etc.

- Relaciones:
  - `user (teacher | admin)`: Referencia al esquema `User`, indicando que un anuncio es creado por un profesor o un administrador.

### Rutas

- [Auth](#auth)
- [Users](#users)
- [Grades](#grades)
- [Courses](#courses)
- [Subjects](#subjects)
- [Lessons](#lessons)
- [Exams](#exams)
- [Assignments](#assignments)
- [Results](#results)
- [Atendances](#atendances)
- [Events](#events)
- [Announcements](#announcements)

#### <kbd>Auth</kbd>
Aqui se encuentran todas las rutas relacionadas con la autenticación del sistema.

##### POST api/v1/users/login
> User must be registered once before logging in.
###### Body
```json
{
  "email": "useremail@example.com",
  "password": "userpassword"
}
```

##### GET api/v1/users/me
> Requires authentication to access this route.

###### Response
```json
{
  "email": "useremail@example.com",
  "username": "username",
  "role": "teacher"
}
```