# User Explorer

Este proyecto es un dashboard moderno para la gestión y exploración de usuarios, diseñado con un enfoque en la escalabilidad, el rendimiento y una experiencia de usuario fluida. La aplicación permite visualizar una lista de usuarios, realizar búsquedas filtradas, también incluye acciones tales como:
- Ver detalles específicos del usuario seleccionado
- Registrar nuevos usuarios.
- Editar los datos de un usuario seleccionado.
- Borrar completamente un usuario seleccionado.

## Sobre el Proyecto

`jcsr-fe-user-explorer` fue desarrollado como una solución robusta para interactuar con datos de usuarios de manera eficiente. Se implementó una arquitectura basada en **features** (características), lo que permite que el código sea modular, fácil de mantener y extensible a medida que el proyecto crece.

### Características Principales

- **Explorador de Usuarios:** visualización clara de los usuarios registrados en el sistema.
- **Búsqueda y Filtrado Dinámico:** capacidad para buscar usuarios por diferentes criterios (ID, Nombre, etc.).
- **Gestión de Usuarios:** formulario completo para la creación de nuevos perfiles con validaciones en tiempo real.
- **Vista Detallada:** acceso a la información completa de un usuario específico.
- **Interfaz Responsiva:** diseño adaptado a diferentes tamaños de pantallas.
- **Notificaciones en Tiempo Real:** feedback visual inmediato tras acciones del usuario mediante `react-toastify`.
- **Operaciones CRUD:** acciones que permiten crear, editar y eliminar un usuario.

## Tecnologías Utilizadas

El stack tecnológico ha sido seleccionado para ofrecer las últimas innovaciones en el ecosistema de React:

- **React 19:** aprovechando las últimas mejoras de rendimiento y hooks.
- **Vite 8:** herramienta de construcción ultra rápida para un desarrollo ágil.
- **TypeScript:** tipado estático para garantizar la integridad de los datos y reducir errores.
- **Tailwind CSS 4:** el framework de utilidades CSS más moderno para un diseño rápido y consistente.
- **React Router DOM 7:** manejo de navegación y rutas de forma declarativa.
- **React Hook Form & Yup:** gestión eficiente de formularios y esquemas de validación robustos.
- **Axios:** cliente HTTP para la comunicación con el backend.

## Instalación y Uso

Sigue estos pasos para configurar el proyecto localmente:

### Requisitos Previos

- [Node.js](https://nodejs.org/) (versión 16.x o superior)
- [Yarn](https://yarnpkg.com/) (gestor de paquetes utilizado en este proyecto)

### Pasos de Instalación

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/jeancs21/jcsr-fe-user-explorer.git
    cd jcsr-fe-user-explorer
    ```

2.  **Instalar dependencias:**
    ```bash
    yarn install
    ```

3.  **Iniciar el servidor de desarrollo:**
    ```bash
    yarn dev
    ```
### IMPORTANTE:
Para poder visualizar los datos de los usuarios y a su vez realizar operaciones CRUD, es neceesario tener instalado el API que le corresponde.
Los usuarios están almacenados por medio de un archivo JSON guardado en dicha API, cada cambio realizado a dicho archivo desde la aplicación frontend se verá reflejado en dicho archivo.

### API de usuarios
https://github.com/jeancs21/jcsr-user-api

## Recomendaciones para el Futuro

Para elevar el potencial de esta herramienta, se proponen las siguientes mejoras y funcionalidades:

1.  **Autenticación y Autorización:** Implementar un sistema de login con roles de usuario. Por ejemplo, un rol de **Administrador** que sea el único capaz de crear, editar o borrar registros.
2.  **Optimización de Consultas (Modales):** Implementar el uso de **modales** para visualizar la información detallada de un usuario. Si el listado inicial ya trae todos los datos necesarios, esto evitaría peticiones adicionales al backend, mejorando la velocidad de respuesta.
3.  **Gestión de Localización:** Consumir endpoints específicos para la gestión de **ciudades y países**, permitiendo una asociación dinámica y precisa en el formulario de registro de usuarios.
