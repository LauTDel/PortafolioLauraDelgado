# Portafolio Laura Delgado

## Estructura del proyecto

```
/index.html          ← Página de inicio ("Portafolio")
/sobre-mi.html       ← Sobre mí + Herramientas
/proyectos.html      ← Proyectos (3 carruseles)
/contacto.html       ← Contacto + Formulario
/css/style.css       ← Estilos globales
/js/main.js          ← Carruseles + Formulario
/img/                ← COLOCA AQUÍ TUS IMÁGENES
```

## Cómo reemplazar imágenes

### 1. Foto personal (Sobre mí)
- Archivo esperado: `img/laura.jpg`
- En `sobre-mi.html`, busca el comentario `REEMPLAZAR FOTO`
- Elimina el `<div class="img-placeholder">` y reemplaza por:
  ```html
  <img src="img/laura.jpg" alt="Foto de Laura Delgado" />
  ```

### 2. Proyectos — Fondos
- Carpeta esperada: `img/fondos/`
- Archivos: `fondo-1.jpg`, `fondo-2.jpg`, `fondo-3.jpg` (o más)
- En `proyectos.html`, sección "FONDOS", reemplaza cada `div.img-placeholder` por:
  ```html
  <img src="img/fondos/fondo-1.jpg" alt="Fondo 1" />
  ```

### 3. Proyectos — Modelos 3D
- Carpeta esperada: `img/modelos/`
- Archivos: `modelo-1.jpg`, `modelo-2.jpg`, `modelo-3.jpg`

### 4. Proyectos — Diseño Web
- Carpeta esperada: `img/disenio/`
- Archivos: `web-1.jpg`, `web-2.jpg`, `web-3.jpg`

## Cómo agregar más imágenes al carrusel

Copia y pega una tarjeta adicional dentro del `.carousel-track`:
```html
<div class="proj-card">
  <img src="img/fondos/fondo-4.jpg" alt="Fondo 4" />
</div>
```
El JavaScript detectará automáticamente la cantidad de tarjetas.

## Fuente Adamd

Si tienes los archivos de la fuente Adamd (.ttf o .woff2):
1. Crea la carpeta `fonts/`
2. Copia los archivos ahí
3. En `css/style.css` descomenta el bloque `@font-face` al inicio del archivo
4. Cambia `--font-title` a `'Adamd', cursive`

## Formulario de contacto

El formulario tiene validación básica en el lado del cliente.
Para hacerlo funcional, conecta un servicio como:
- **EmailJS** (sin backend): https://www.emailjs.com
- **Formspree**: https://formspree.io
- Tu propio backend PHP/Node

