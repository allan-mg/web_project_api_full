# Around the U.S. — React con autenticación

## Descripción

Este proyecto es una aplicación web desarrollada con React que permite visualizar y administrar una colección de tarjetas de lugares.

La aplicación incorpora registro e inicio de sesión de usuarios, protección de rutas mediante autenticación con JWT y persistencia de sesión utilizando `localStorage`.

Además, conserva la funcionalidad desarrollada en sprints anteriores, como la edición del perfil, actualización de avatar, creación y eliminación de tarjetas, likes y visualización de imágenes en ventanas emergentes.

El proyecto fue desarrollado como parte del Sprint 18 del programa de Desarrollo Web de TripleTen.

## Funcionalidades

- Registrar nuevos usuarios.
- Iniciar sesión con correo electrónico y contraseña.
- Proteger la ruta principal `/`.
- Redirigir usuarios no autorizados a `/signin`.
- Mantener la sesión activa mediante JWT y `localStorage`.
- Validar el token almacenado al cargar la aplicación.
- Cerrar sesión y eliminar el token almacenado.
- Mostrar el correo electrónico del usuario autenticado en el encabezado.
- Mostrar mensajes de éxito o error mediante `InfoTooltip`.
- Obtener la información del usuario desde una API.
- Mostrar las tarjetas almacenadas en el servidor.
- Editar el nombre y la descripción del perfil.
- Actualizar la imagen de avatar.
- Agregar nuevas tarjetas.
- Visualizar imágenes en una ventana emergente.
- Dar “Me gusta” a una tarjeta.
- Quitar el “Me gusta” de una tarjeta.
- Eliminar las tarjetas creadas por el usuario actual.
- Abrir y cerrar ventanas emergentes.
- Actualizar automáticamente la interfaz después de las solicitudes a la API.

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- React
- JSX
- Vite
- React Router DOM
- Fetch API
- React Hooks
- React Context
- JWT
- Local Storage

## Conceptos de React aplicados

En este proyecto se utilizaron los siguientes conceptos:

- Componentes funcionales.
- Propiedades o props.
- Estado con `useState`.
- Efectos secundarios con `useEffect`.
- Contexto con `useContext`.
- Referencias con `useRef`.
- Formularios controlados.
- Formularios no controlados.
- Levantamiento de estado.
- Renderizado condicional.
- Renderizado de listas con `map()`.
- Actualización inmutable de arrays.
- Comunicación entre componentes.
- Manejo de solicitudes asíncronas.
- Rutas con React Router.
- Rutas protegidas.
- Autenticación mediante JWT.
- Persistencia de sesión mediante `localStorage`.

## Rutas de la aplicación

La aplicación utiliza las siguientes rutas:

- `/` — ruta principal protegida.
- `/signin` — inicio de sesión.
- `/signup` — registro de usuarios.

Los usuarios no autorizados que intentan acceder a la ruta `/` son redirigidos automáticamente a `/signin`.

## Autenticación

La autenticación se realiza mediante JWT.

Al iniciar sesión correctamente:

1. La API devuelve un token.
2. El token se almacena en `localStorage`.
3. El estado de autenticación se actualiza.
4. El usuario es redirigido a la ruta `/`.

Cuando la aplicación se carga nuevamente, se comprueba si existe un token almacenado y se valida antes de permitir el acceso a la ruta protegida.

Al cerrar sesión, el token se elimina de `localStorage` y el usuario es redirigido a `/signin`.

## APIs utilizadas

El proyecto utiliza dos APIs diferentes.

### API de autenticación

Se utiliza para:

- Registro de usuarios.
- Inicio de sesión.
- Validación del JWT.
- Obtención del correo electrónico del usuario autenticado.

URL base:

```text
https://se-register-api.en.tripleten-services.com/v1
```

### Endpoints utilizados

POST /signup
POST /signin
GET /users/me

### API principal de Around the U.S.

Se utiliza para:

Obtener la información del perfil.
Editar el perfil.
Actualizar el avatar.
Obtener las tarjetas.
Crear tarjetas.
Eliminar tarjetas.
Dar y quitar likes.

URL base:

https://around-api.es.tripleten-services.com/v1

### Estructura del proyecto

src/
├── blocks/
│ ├── auth.css
│ ├── header.css
│ ├── info-tooltip.css
│ └── ...
├── components/
│ ├── App.jsx
│ ├── Footer/
│ │ └── Footer.jsx
│ ├── Header/
│ │ └── Header.jsx
│ ├── InfoTooltip/
│ │ └── InfoTooltip.jsx
│ ├── Login/
│ │ └── Login.jsx
│ ├── ProtectedRoute/
│ │ └── ProtectedRoute.jsx
│ ├── Register/
│ │ └── Register.jsx
│ └── Main/
│ ├── components/
│ │ ├── Card/
│ │ │ └── Card.jsx
│ │ ├── EditAvatar/
│ │ │ └── EditAvatar.jsx
│ │ ├── EditProfile/
│ │ │ └── EditProfile.jsx
│ │ ├── ImagePopup/
│ │ │ └── ImagePopup.jsx
│ │ ├── NewCard/
│ │ │ └── NewCard.jsx
│ │ ├── Popup/
│ │ │ └── Popup.jsx
│ │ └── RemoveCard/
│ │ └── RemoveCard.jsx
│ └── Main.jsx
├── contexts/
│ └── CurrentUserContext.js
├── images/
├── utils/
│ ├── api.js
│ └── auth.js
├── index.css
└── main.jsx

#### Instalación

Clona el repositorio:

git clone URL_DEL_REPOSITORIO

Entra a la carpeta del proyecto:

cd web_project_around_auth

Instala las dependencias:

npm install
Ejecución del proyecto

Para ejecutar el proyecto en modo desarrollo:

npm run dev

Vite mostrará una dirección local similar a:

http://localhost:3000/

Abre esa dirección en el navegador para utilizar la aplicación.

Build de producción

Para generar una versión optimizada del proyecto:

npm run build

Los archivos generados se almacenarán en la carpeta:

dist
Notas

Las carpetas node_modules y dist están incluidas en .gitignore, por lo que no se almacenan en el repositorio.

Al clonar el proyecto en otra computadora, es necesario ejecutar:

npm install

para instalar nuevamente todas las dependencias indicadas en package.json.

Autor

Allan Martínez
