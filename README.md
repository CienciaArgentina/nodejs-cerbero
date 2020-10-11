# nodejs-template-api

## Comenzando 🚀

Template para microservicios en NodeJs, se toma como ejemplo un API de Gender.

## Pre-Requisitos 📋

Tener instalado:

- [Node.Js](https://nodejs.org/)
- [VsCode](https://code.visualstudio.com/)
- [Git](https://git-scm.com/)

## Instalación y ejecución 🔧

1. Clonamos el repositorio en una carpeta local:  
   ``
2. Ir hacia la carpeta
3. Ejecutar en la terminal

- `npm i` : Comando para poder instalar todas las dependencias necesarias para correr la aplicación.
- `npm run dev` : Comando que va a transpilar todo el codigo typescript a JS y luego va a correr con un watch la aplicación.

## Ejecutando las pruebas ⚙️

Para poder correr los tests hace falta ejecutar el comando:
`npm run test`

## Arquitectura

### Mejores practicas NODE.JS

Para poder desarrollar la arquitectura se siguió la guía más famosa de la comunidad en [Mejores practicas para NODE.JS](https://github.com/goldbergyoni/nodebestpractices).

### Estructura

Para armar la estructura se basó en la primicia "[Estructura por componentes](https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/projectstructre/breakintcomponents.md)" la misma define que es una mala practica agrupar archivos por rol técnico (Controllers,Services,etc...) y es una buena practica agrupar archivos por componentes.

### Manejo de errores/excepciones

Para el manejo de errores, entre otras, se tuvieron en cuenta las siguientes especificaciones:

- Distinguir errores operacionales
- Manejo de erroes asíncronos (solucionado con dependencia ["express-async-errors"](https://www.npmjs.com/package/express-async-errors)).  
  _**Aclaración**: Para no estar atado a una solución especifica para express se puede resolver con middleware._
- Centralizar el manejo de errores **sin estar adentro de un middleware**
- Documentar errores en Swagger
- Catch unhandledRejection y uncaughtException
- Logueo de errores por niveles

### Code Style

Como equipo adoptamos dos herramientas para facilitarnos la estandarización de código en cuanto a formato y reglas.  
Ellas son:

- [Prettier](https://prettier.io/)
- [Eslint](https://eslint.org/)

Las mismas nos permite que el equipo pueda desarrollar siguiendo un estandar de reglas, tanto para formateo, nomeclaturas, formas de tipificar variables, funciones, etc...
Si bien puede ser molesto al principio esto nos logra dar un valor como equipo y facilitar el control de calidad/estandar del código.

#### Prettier

Prettier es una herramienta que nos ayuda a estandarizar el formato del código en base a ciertas "opiniones"/reglas, las cuales podemos modificar.
En nuestro caso, las reglas nuestras son:
`{ "singleQuote": true, "printWidth": 120 }`  
esto quiere decir que utilizamos comillas simples y dejamos un espacio de 120px al momento de sangría.

Prettier se puede integrar con VsCode. El cual tiene como beneficio, entre otros, poder guardar un archivo y que se formatee automaticamente.
En todo caso, ejecutando el comando `npm run lint` se van a verificar las reglas y, en caso de poder, arreglar automaticamente.

#### Eslint

Eslint es una herramienta linting utilizado para Javascript (y Typescript con el plugin [Eslint-Typescript](https://github.com/typescript-eslint/typescript-eslint)) que tiene como función principal revisar nuestro código tratando de encontrar errores o futuros bugs. Para esto cuenta con un conjunto de reglas configuradas previamente.
En nuestro proyecto tenemos ciertas configuraciones que valen la pena aclarar:

- Utilizamos [el plugin de typescript](https://github.com/typescript-eslint/typescript-eslint) para que sea compatible con el mismo
- Tenemos seteadas como **True** las variables para que soporte Ecmascript 6, Node, Jest.
- Nuestro conjunto de reglas son las recomendadas por Eslint
- Delegamos el formateo en Prettier desactivando el ofrecido por Eslint
- Agregamos el plugin de seguridad para que detecte reglas de seguridad
- Agregamos que toda funcion que no retorne un tipo es un error, por lo cual si surge el mismo no va a superar la etapa de build.
- La regla [no-used-vars](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-vars.md) posee un [issue](https://github.com/typescript-eslint/typescript-eslint/issues/1856) el cual todavía no fue solucionado. La regla consiste en detectar como error variables que son declaradas pero no son utilizadas, si bien es una regla útil para poder estandarizar el código el [issue](https://github.com/typescript-eslint/typescript-eslint/issues/1856) consiste en detectar falsos positivos cuando se importan tipos que son utilizados en funciones. Por lo cual se decidió, hasta la resolución del mismo, deshabilitar dicha regla.

#### Naming convention

### Testing

Las dependencias usadas para las pruebas son:

- [Jest](https://jestjs.io/docs/en/getting-started)
- [Supertest](https://www.npmjs.com/package/supertest)

Con estas dos herramientas podemos abarcar lo que son las pruebas unitarias e integrales.

### Production Practices

#### Logging

Para el logging se decidió utilizar las dependencias:

- [express-winston](https://www.npmjs.com/package/express-winston)
- [winston](https://github.com/winstonjs/winston)

La primera para loguear todo request/response con metadata predefinada y configurada por nosotros. La segunda para loguear todo evento que surja de nuestra aplicación, con su respectiva metadata.

#### Healthcheck

El healthcheck que armamos es para saber la salud de nuestra aplicación. La misma puede tener dos estados:

- Healthy: Posee todas las dependencias saludables.
- Unhealthy: Una de las dependencias no esta saludable.

Se considera que **la aplicación esta saludable cuando todas sus dependencias lo estan**.

Ejemplo de respuesta de aplicación saludable:

```javascript
{
    "status": "HEALTHY",
    "dependencies":
    [
         {
            "status": "HEALTHY",
            "name": "CienciaArgentinaDb connection"
         }
    ]
}
```

Ejemplo de respuesta de aplicación no saludable:

```javascript
{
    "status": "UNHEALTHY",
    "dependencies":
    [
        {
            "status": "HEALTHY",
            "name": "CienciaArgentinaDb connection"
        },
        {
            "status": "UNHEALTHY",
            "name": "Service2 connection",
            "detail":"Connection Time Out"
        }
    ]
}
```

#### PM2-Runtime

[PM2](https://pm2.keymetrics.io/) es un administrador de procesos para Javascript/Node.JS el cual nos facilita ciertas responsabilidades como por ejemplo:

- [Utilizar todos los CPU cores](https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/production/utilizecpu.md)
- [Reinicio de proceso en caso de falla](https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/production/guardprocess.md)
- Modo Cluster
- Gestión de registros

Las anteriores caracteristicas mencionadas estan cubiertas gracias a la arquitectura que poseemos adentro de OCP junto a su contenedor.  
Es por esto que surge [pm2-runtime](https://pm2.keymetrics.io/docs/usage/docker-pm2-nodejs/), el cual tiene como objetivo envolver sus aplicaciones en un entorno de producción Node.js adecuado al ejecutarlas dentro de un contenedor.  
Entre los problemas que resuelve se destacan:

- Segundo proceso de respaldo para una alta confiabilidad de la aplicación
- Control de flujo de proceso

### Database

Se decidió usar un ORM llamado [ObjectionJs](https://vincit.github.io/objection.js/).

#### ObjectionJs

La decisión de Objection fueron por las siguientes razones:

- Es un ORM con **constante apoyo y soporte por la comunidad**
- **Soporta Typescript**
- Basado en Knex
- Soporta migraciones
- Cross-database and cross-schema queries
- Logging
- Hooks

entre otras caracteristicas.

> El mayor poder es el rendimiento, realizamos un benchmark contra TypeOrm y nos dio que Objection es un 50% (Mínimo) más eficiente. 
> [Link](https://github.com/emilioforrer/adonis-api-orm-benchmark-app) para benchmark detallado.


### Seguridad

## Dependencias

- [axios](https://github.com/axios/axios): Cliente HTTP basado en promesas para node.js
- [compression](https://www.npmjs.com/package/compression): Middleware de compresión.
- [dotenv](https://www.npmjs.com/package/dotenv): Módulo de dependencia para cargar variables de entorno de un .env .
- [express](https://expressjs.com/es/): Framework web con gran cantidad de métodos de utilidad HTTP y middleware a su disposición, para crear una API robusta de una forma más rápida y sencilla.
- [express-async-errors](https://www.npmjs.com/package/express-async-errors): Permite manejar las excepciones asincronas sin tener que parchear en todos los métodos Routers.
- [oracledb](https://github.com/oracle/node-oracledb): Driver para poder conectarse a una base de datos Oracle.
- [pm2-runtime](https://pm2.keymetrics.io/docs/usage/docker-pm2-nodejs/): Administrador de procesos utilizado por la aplicación para el entorno productivo.
- [reflect-metadata](https://www.npmjs.com/package/reflect-metadata): Permite usar [@decorators](https://www.typescriptlang.org/docs/handbook/decorators.html) entre otras caracteristicas.
- [ts-node](https://www.npmjs.com/package/ts-node): Cli de Typescript que me permite, entre otras caracteristicas, ejecutar en modo watch la aplicación.
- [supertest](https://www.npmjs.com/package/supertest): Proporciona una abstracción de alto nivel para probar HTTP.
- [jest](https://jestjs.io/): Framework de testing utilizado para los test unitarios
- [typeorm](https://typeorm.io/): ORM utilizado por el aplicativo
- [typescript](https://www.typescriptlang.org/): Lenguaje para lograr un type-safe en Javascript.
- [uuid](https://www.npmjs.com/package/uuid): Permite generar un uuid basado en timestamp (v1) o random (v4)
- [express-winston](https://www.npmjs.com/package/express-winston): Proporciona funcionabilidades para loguear request/response.
- [winston](https://www.npmjs.com/package/winston): Logger del aplicativo.
- performance-now:
- request:
- request-promise:

## Pendientes

- Optimizar memoria
- Optimizar seguridad
- Optimizar docker
- Subir dependencias comunes a otro repo
- Coverage 80%
- Migrar de TypeOrm a ObjectionJs

## Wiki

Para más información podes consultar la [Wiki]().

## Referencias

### Externas

- [Node.JS Best Practices](https://github.com/goldbergyoni/nodebestpractices) - Mejores practicas de la comunidad en NODE.js
- [Typescript](https://www.typescriptlang.org/) - Mecanografíado para tipar Javascript utilizado en el proyecot
- [Objection](https://vincit.github.io/objection.js/) - ORM
- [Jest](https://jestjs.io/) - Framework utilizado para test
- [PM2-RUNTIME](https://pm2.keymetrics.io/docs/usage/docker-pm2-nodejs/) - Herramienta utilizada para manejar los procesos en producción

### Internas
