# Burgerhaus & Café

Aplicación de menú y pedidos creada con React y Vite.

El `index.html` del directorio padre es una versión HTML independiente; ambas
entradas admiten las mismas rutas. La compilación oficial de producción es la
de este directorio (`react-app/dist`).

## Desarrollo y compilación

Desde `react-app`:

```sh
npm install
npm run dev
npm run build
npm run preview
```

Vite sirve la aplicación como SPA y sus servidores de desarrollo y
previsualización resuelven las rutas del cliente a `index.html`.

## Rutas

- `/`, `/index.html` y `/menu` muestran los combos. La ruta `/index.html`
  permite abrir la versión independiente directamente con Live Server.
- `/menu/:categoria` abre directamente una categoría (`combos`, `simples`,
  `papas`, `cafes` o `bebidas`).
- Cualquier otra ruta muestra una página 404 dentro de la aplicación.

Los enlaces de categoría actualizan el historial del navegador; Atrás y Adelante
restauran la categoría correspondiente. Los enlaces externos, los enlaces que se
abren en otra pestaña y las descargas mantienen el comportamiento nativo.

## Despliegue

El workflow de GitHub Actions en `.github/workflows/deploy.yml` compila y publica
el contenido de `dist`. En GitHub Actions, Vite obtiene el nombre del repositorio
de `GITHUB_REPOSITORY` para generar las rutas con el prefijo correcto en Pages.
Las imágenes de `public/` se conservan en `dist/`, y sus URLs usan `BASE_URL`
para funcionar tanto en desarrollo local como bajo el prefijo del repositorio.

El workflow también genera `dist/404.html` a partir de `index.html` para que
GitHub Pages entregue la SPA al abrir directamente una ruta de categoría. Las
rutas y enlaces del cliente eliminan o aplican el prefijo de Pages según
corresponda. `npm run preview` permite probar la compilación localmente.

El workflow presupone que la raíz del repositorio de GitHub es este directorio
(`react-app`), porque ejecuta `npm ci` y `npm run build` desde la raíz del
checkout. Si se publica el HTML independiente del directorio padre, es otro
sitio y no utiliza esta compilación ni este workflow.

El menú se carga desde datos estáticos locales y el pedido se completa mediante
un enlace externo a WhatsApp; no hay llamadas a API ni autenticación de servidor
configuradas.
