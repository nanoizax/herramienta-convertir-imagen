# Convertir y Redimensionar Imagen

Cambia el formato y el tamaño de tus imágenes en el navegador, sin subirlas a ningún servidor.

Herramienta gratuita y de código abierto de [SonhoLab](https://sonholab.com). Corre **100 % en el navegador**: los archivos no se suben a ningún servidor.

> Licencia: **MIT** · Autor: Leandro Manuel Perez Montañana · Idiomas de la interfaz: español, inglés, francés, portugués (BR), alemán, hindi, indonesio y ruso.

## Qué hace

Cuando una foto pesa demasiado para un formulario, o la tienda solo acepta JPG y tu archivo es PNG, esta herramienta lo resuelve en segundos: cambia el formato entre JPG, PNG y WEBP y ajusta el ancho y el alto, manteniendo la proporción si lo prefieres. Todo ocurre dentro de tu navegador.

**Cuándo te sirve:**

- Subes un producto a tu tienda online y el catálogo solo acepta JPG de 1000 píxeles de ancho.
- Tienes que mandar fotos por correo y el adjunto no entra: pasarlas a WEBP baja bastante el peso.
- Te piden cargar una foto en un formulario del colegio o del banco con un tamaño exacto en píxeles.

## Cómo se usa

1. **Elige tu imagen.** Arrastra la imagen al recuadro o haz clic para buscarla en tu equipo. Se abre dentro de tu navegador; no viaja a ningún servidor.
2. **Ajusta formato y tamaño.** Elige entre JPG, PNG o WEBP y escribe el ancho o el alto que necesitas. Deja activada la proporción para que la imagen no se deforme.
3. **Descarga el resultado.** Mira la vista previa y descarga la imagen ya convertida. Puedes repetir el proceso con otra foto las veces que quieras.

## Qué necesita para funcionar

### Para instalarla y compilarla

- [Node.js](https://nodejs.org) 18 o superior (probado con Node 22) y npm.
- Conexión a internet **solo** durante `npm install`. Una vez compilada, la herramienta no pide nada a internet.

### Complementos específicos de esta herramienta

- **Ninguno.** No usa modelos, binarios ni servicios externos: todo está en el código y en dependencias normales de npm.

### En el navegador de quien la usa

- Cualquier navegador moderno (Chrome, Edge, Firefox, Safari). No necesita permisos especiales.

## Instalación

```bash
git clone https://github.com/nanoizax/herramienta-convertir-imagen.git
cd herramienta-convertir-imagen
npm install
npm run dev         # servidor de desarrollo en http://localhost:5173
```

Para publicarla:

```bash
npm run build       # genera la carpeta dist/
npm run preview     # probar la versión compilada
```

Esta herramienta **no tiene servidor propio**: todo ocurre en el navegador de quien la usa. Basta con publicar la carpeta `dist/` en cualquier hosting estático (GitHub Pages, Netlify, Cloudflare Pages, Nginx, Apache...).

## Cómo está organizado

```
src/pages/tools/   La página de la herramienta (interfaz y lógica de pantalla)
src/lib/tools/     La lógica de la herramienta, separada de la interfaz
src/components/    Piezas compartidas (zona de arrastre de archivos, botón)
src/locales/       Textos en 8 idiomas (esta herramienta solamente)
src/i18n.ts        Configuración de idiomas
```

## Cómo meterla en tu propia plataforma

1. **Como página aparte:** publica `dist/` en una ruta de tu sitio, por ejemplo `/herramientas/convertir-imagen/`. Si la sirves en una subcarpeta, define `base` en `vite.config.ts`.
2. **Dentro de tu aplicación React:** copia `src/pages/tools/*Page.tsx`, `src/lib/tools/` y `src/components/` a tu proyecto, instala las mismas dependencias de `package.json` y renderiza la página donde quieras.
3. **Con tu diseño:** el marco de la página (título, ayuda, preguntas frecuentes) está en `src/components/tools/ToolPageLayout.tsx` y es intencionalmente simple. Cámbialo por tu cabecera, tu pie y tus estilos; solo necesita pintar `children`.
4. **Con tu analítica:** `src/lib/hitCounter.ts` no hace nada. Si quieres medir el uso, conéctalo ahí a tu propia herramienta.

## Privacidad

Todo el procesamiento ocurre en el navegador. Esta copia no incluye analítica, cookies, contadores ni llamadas a ningún servidor propio. Los archivos del usuario no salen de su equipo.

## Preguntas frecuentes

**¿Mis imágenes se suben a algún servidor?**  
No. La conversión usa el canvas de tu propio navegador, así que la imagen se abre y se procesa en tu dispositivo y nunca viaja por internet. No la vemos ni la guardamos, y tampoco queda copia en ninguna nube.

**¿Es gratis? ¿Hay límite de imágenes?**  
Es gratis, no hay límite de archivos y el resultado sale sin marca de agua. Tampoco necesitas crear una cuenta. Como el trabajo lo hace tu equipo y no un servidor nuestro, no hay cola de espera ni motivo para cobrarte por cantidad.

**¿Necesito instalar algún programa?**  
No. Funciona dentro del navegador que ya tienes, en computadora, tablet o teléfono. No hay que instalar aplicaciones ni extensiones: abre la página, elige la imagen y descarga el archivo convertido.

**¿Se pierde calidad al convertir la imagen?**  
JPG y WEBP comprimen, así que puede notarse algo en imágenes con texto fino o líneas muy nítidas; PNG conserva todo pero pesa más. Y reducir el tamaño quita píxeles de verdad: si después la agrandas, no se recuperan.

**¿Qué pasa con la transparencia al pasar a JPG?**  
JPG no admite transparencia, así que las zonas transparentes de un PNG o un WEBP quedan rellenas con un color sólido. Si necesitas conservar el fondo transparente, elige PNG o WEBP como formato de salida.

## Licencia

Este proyecto se publica bajo la licencia **MIT**. El texto completo está en [LICENSE](LICENSE).

Las dependencias tienen sus propias licencias, listadas en [THIRD-PARTY.md](THIRD-PARTY.md).

## Más herramientas gratuitas

Esta es una de las herramientas gratuitas de SonhoLab. Encuentra el resto, cada una con su repositorio, en https://sonholab.com/es/herramientas.

---

Hecho por Leandro Manuel Perez Montañana.
