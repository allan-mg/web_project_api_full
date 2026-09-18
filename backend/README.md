# Around the U.S. - Backend

Este proyecto corresponde al backend de la aplicación **"Alrededor de los Estados Unidos"**.

El servidor proporciona una API REST desarrollada con Node.js, Express y MongoDB. La aplicación permite gestionar usuarios y tarjetas, actualizar información de perfil, crear y eliminar tarjetas, y administrar likes.

## Funcionalidades

- Obtener todos los usuarios.
- Obtener un usuario por su ID.
- Crear nuevos usuarios.
- Actualizar el nombre y la información del perfil de un usuario.
- Actualizar el avatar de un usuario.
- Obtener todas las tarjetas.
- Crear nuevas tarjetas.
- Eliminar una tarjeta por su ID.
- Dar like a una tarjeta.
- Eliminar el like de una tarjeta.
- Validar los datos de usuarios y tarjetas mediante esquemas de Mongoose.
- Validar URLs mediante expresiones regulares.
- Manejar errores con códigos de estado 400, 404 y 500.
- Conectarse a una base de datos MongoDB.
- Reiniciar automáticamente el servidor durante el desarrollo mediante Nodemon.

## Tecnologías utilizadas

- JavaScript
- Node.js
- Express
- MongoDB
- Mongoose
- Nodemon
- ESLint
- Airbnb JavaScript Style Guide
- EditorConfig
- API REST

## Estructura del proyecto

```text
controllers/
  cards.js
  users.js

models/
  card.js
  user.js

routes/
  cards.js
  users.js

app.js
package.json
README.md
```

## Endpoints

### Usuarios

```text
GET    /users
GET    /users/:userId
POST   /users
PATCH  /users/me
PATCH  /users/me/avatar
```

### Tarjetas

```text
GET     /cards
POST    /cards
DELETE  /cards/:cardId
PUT     /cards/:cardId/likes
DELETE  /cards/:cardId/likes
```

## Ejecución del proyecto

Instala las dependencias:

```bash
npm install
```

Inicia el servidor en modo desarrollo:

```bash
npm run dev
```

El servidor se ejecutará en:

```text
http://localhost:3000
```

La aplicación se conecta a MongoDB mediante:

```text
mongodb://localhost:27017/aroundb
```

## Linter

Para comprobar el estilo del código:

```bash
npm run lint
```
