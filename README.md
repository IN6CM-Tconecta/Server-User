# TConecta - Server User

Microservicio de API para el usuario final de TConecta. Este servicio se encarga de gestionar la información de los usuarios finales, su historial de recorridos, la planificación de viajes y la administración de sus billeteras y saldos.

## Tech Stack

Este proyecto está construido utilizando las siguientes tecnologías:

- **Node.js** con **Express.js** como framework backend.
- **MongoDB** con **Mongoose** como base de datos y ODM.
- **Argon2** para el hash seguro de datos (contraseñas).
- **JSON Web Token (JWT)** para la autenticación y autorización.
- **Axios** para peticiones a otros microservicios.
- **Express Rate Limit** y **Helmet** para configuraciones de seguridad.
- **Express Validator** para la validación de peticiones.
- **Cors** y **Morgan** para control de accesos cruzados y logging de peticiones.

## Folder Structure

La estructura principal del proyecto es la siguiente:

```text
Server-User/
├── configs/           # Configuraciones generales (Base de datos, Server)
├── middlewares/       # Validadores y middlewares de autenticación
├── src/               # Código fuente principal
│   ├── profiles/      # Controladores, modelos y rutas de perfiles de usuario
│   ├── tours/         # Controladores, modelos y rutas de historial y planificación de viajes
│   ├── utils/         # Utilidades generales del proyecto
│   └── wallets/       # Controladores, modelos y rutas de billeteras de usuarios
├── Dockerfile         # Archivo para construcción de la imagen en Docker
├── index.js           # Punto de entrada de la aplicación
├── package.json       # Archivo de dependencias y scripts de Node.js
└── vercel.json        # Configuración de despliegue para Vercel
```

## Endpoints

La URL base para todos los endpoints es: `/TRANSMETRO-CONECTA-USUARIO/v1`

### Health Check
- `GET /health` - Verifica el estado del microservicio de usuarios.

### Profiles (Perfiles)
*Requieren Autenticación (JWT)*
- `GET /profiles/me` - Obtiene la información del perfil del usuario autenticado.
- `PUT /profiles/me` - Actualiza la información del perfil del usuario.

### Tours (Viajes y Recorridos)
*Requieren Autenticación (JWT)*
- `GET /tours/history` - Obtiene el historial de viajes del usuario.
- `POST /tours/plan` - Permite planificar un nuevo recorrido.

### Wallets (Billeteras)
- `GET /wallets/balance` - Obtiene el saldo actual de la billetera del usuario. *(Requiere JWT)*
- `POST /wallets/initialize` - Inicializa la billetera de un usuario. *(Requiere Internal Secret)*
- `POST /wallets/recharge` - Recarga fondos en la billetera de un usuario. *(Requiere Internal Secret)*

## Scripts

- **Start**: Inicia la aplicación para entornos de producción.
  ```bash
  npm run start
  ```
- **Dev**: Inicia el servidor con recarga automática usando Nodemon.
  ```bash
  npm run dev
  ```
