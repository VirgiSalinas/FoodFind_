# 🍽️ FoodFind

API backend del proyecto FoodFind, hecha con **Node.js, Express, TypeScript y MongoDB**.

---

## 🧰 Tecnologías

| Herramienta | Para qué se usa |
|---|---|
| **Node.js 20+** | Entorno para ejecutar JavaScript/TypeScript |
| **Express 5** | Servidor y rutas de la API |
| **TypeScript** + **tsx** | Tipado; `tsx` ejecuta el código en desarrollo sin compilar |
| **MongoDB Atlas** + **Mongoose** | Base de datos en la nube y modelos |
| **JWT** + **bcrypt** | Login: tokens de sesión y contraseñas encriptadas |
| **dotenv** + **cors** | Variables de entorno y permisos para el frontend |

---

## ✅ Requisitos previos

Lo **único** que hay que instalar a mano es:

- [Node.js](https://nodejs.org/) versión 20 o superior (comprobar con `node -v`)
- [Git](https://git-scm.com/) (comprobar con `git --version`)
- [VS Code](https://code.visualstudio.com/) (recomendado)

> ⚠️ **No** hace falta instalar Express, Mongoose ni ninguna otra librería por separado. Todo se instala automáticamente con `npm install` (paso 3).

También necesitás haber **aceptado la invitación** al repositorio que te llega por mail desde GitHub. Sin eso no vas a poder subir cambios.

---

## 🚀 Puesta en marcha (solo la primera vez)

### 1. Clonar el repositorio

```bash
git clone https://github.com/VirgiSalinas/FoodFind_.git
```

### 2. Entrar a la carpeta

```bash
cd FoodFind_
```

### 3. Instalar las dependencias

```bash
npm install
```

Esto crea la carpeta `node_modules` con todas las librerías del proyecto.

### 4. Crear el archivo `.env`

```bash
# Mac / Linux / Git Bash
cp .env.example .env

# Windows (CMD)
copy .env.example .env
```

Abrí el `.env` nuevo y completalo con los valores que **Virgi te pasa por privado**:

```dotenv
PORT=3000
MONGODB_URI=   # cadena de conexión a MongoDB Atlas
JWT_SECRET=    # clave secreta para los tokens
```

> 🔒 El `.env` tiene contraseñas reales. **Nunca se sube a GitHub** (ya está en el `.gitignore`) y no se comparte en grupos públicos.

### 5. Levantar el servidor

```bash
npm run dev
```

Si todo salió bien, en la terminal vas a ver:

```
Conectado a MongoDB
Servidor en http://localhost:3000
```

Abrí <http://localhost:3000> en el navegador y deberías ver:

```json
{"ok":true,"message":"FoodFind API funcionando"}
```

¡Listo, ya podés empezar a trabajar! 🎉

---

## 📜 Comandos disponibles

| Comando | Qué hace |
|---|---|
| `npm run dev` | Levanta el servidor y lo reinicia solo cada vez que guardás un archivo. **Es el que se usa para programar.** |
| `npm start` | Levanta el servidor sin reinicio automático |
| `npm run typecheck` | Revisa errores de TypeScript sin ejecutar nada. Correrlo antes de cada Pull Request. |

---

🌿 Cómo trabajar en equipo
Las ramas del proyecto
Rama	Para qué es
main	Versión estable: lo que se entrega o se muestra. Solo se actualiza con un Pull Request desde develop cuando hay una versión lista.
develop	Rama de trabajo diario. De acá salen todas las ramas nuevas y acá vuelven con un Pull Request.
feature/..., fix/...	Ramas temporales, una por tarea. Se borran después del merge.

Las ramas main y develop están protegidas:

No se puede hacer git push directo a ellas (GitHub lo rechaza).
Todo cambio entra por Pull Request y necesita 1 aprobación de otra persona del equipo.
No se pueden borrar ni reescribir con --force.

Las ramas se crean por tarea, no por persona: cada uno va a crear muchas ramas a lo largo del proyecto. Antes de empezar, avisá en el grupo qué tarea tomás para no pisarse.

Antes de empezar una tarea nueva
bash
git checkout develop               # ir a la rama principal
git pull                           # traer los últimos cambios del equipo
git checkout -b feature/nombre-de-la-tarea

Nombres de rama sugeridos:

feature/... → algo nuevo (ej: feature/login, feature/modelo-restaurante)
fix/... → arreglar un error (ej: fix/validacion-email)
Mientras trabajás

Guardá tu avance con commits chicos y descriptivos:

bash
git add .
git commit -m "Agrega modelo de usuario"
Cuando terminás
bash
npm run typecheck                          # que no haya errores
git push -u origin feature/nombre-de-la-tarea

Después, en GitHub:

Te va a aparecer un botón "Compare & pull request". Hacé clic.
⚠️ Cambiá la base a develop. GitHub propone main por defecto: arriba del formulario, en el desplegable base, elegí develop. Tiene que quedar base: develop ← compare: tu rama.
Escribí un título y una breve descripción de lo que hiciste.
Creá el Pull Request y avisá al grupo para que alguien lo revise.
Otra persona lo revisa y lo aprueba (Files changed → Review changes → Approve). No podés aprobar tu propio PR.
Una vez aprobado, se hace Merge y se puede borrar la rama.

💡 Si por error abriste el PR hacia main, no pasa nada: dentro del PR tocá Edit (al lado del título) y cambiá la base a develop.

Si develop cambió mientras trabajabas
bash
git checkout develop
git pull
git checkout feature/tu-rama
git merge develop

Si hay conflictos, VS Code los marca en los archivos: elegí qué versión dejar, guardá y hacé commit.

📏 Reglas del equipo
Nunca subir el .env ni node_modules. Antes de cada commit, git status no los tiene que mostrar.
Si instalás una librería nueva (npm install algo), subí también los cambios de package.json y package-lock.json, y avisá al grupo. Los demás tienen que correr npm install después de hacer git pull.
Siempre git pull en develop antes de crear una rama nueva, para partir del código más actualizado. Nunca crear ramas desde main.
Imports con extensión .js. El proyecto usa ES Modules, así que al importar archivos propios hay que poner .js aunque el archivo sea .ts:
ts
   import userRoutes from "./routes/user.routes.js";  // ✅ correcto
   import userRoutes from "./routes/user.routes";     // ❌ da error

Las librerías (express, mongoose, etc.) se importan normal, sin extensión.

## 📁 Estructura del proyecto

```
FoodFind_/
├── src/
│   └── index.ts        # punto de entrada: servidor Express + conexión a MongoDB
├── .env                # variables reales (NO se sube)
├── .env.example        # plantilla de variables (sí se sube)
├── .gitignore
├── package.json        # dependencias y scripts
├── package-lock.json
└── tsconfig.json       # configuración de TypeScript
```

A medida que crezca el proyecto, la idea es organizar `src/` así:

```
src/
├── models/        # esquemas de Mongoose
├── routes/        # definición de endpoints
├── controllers/   # lógica de cada endpoint
└── middlewares/   # ej: verificación de JWT
```

---

## 🆘 Problemas comunes

| Error | Causa probable | Solución |
|---|---|---|
| `bad auth : authentication failed` | Usuario o contraseña incorrectos en `MONGODB_URI` | Revisá que copiaste bien la cadena del `.env` |
| Se queda colgado o da *timeout* al conectar | Tu IP no tiene permiso en Atlas | Avisale a Virgi para que revise *Network Access* en Atlas |
| `Cannot find module 'express'` (u otra librería) | Faltan dependencias | Corré `npm install` |
| `Cannot find module './algo'` | Falta la extensión en el import | Agregá `.js` al final (ver regla 4) |
| `EADDRINUSE: address already in use :::3000` | Ya hay un servidor corriendo | Cerrá la otra terminal o cambiá `PORT` en tu `.env` |
| `MONGODB_URI` es `undefined` | No existe el `.env` o está vacío | Repetí el paso 4 |
| `git push` rechazado (*permission denied*) | No aceptaste la invitación al repo | Buscá el mail de GitHub y aceptala |

Si nada de esto lo resuelve, pasá una captura del error al grupo. 💬