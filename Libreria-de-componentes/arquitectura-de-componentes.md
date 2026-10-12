# Arquitectura de componentes

**H3 · Debate 1**  
**Autora:** Triana Cossio Czermak  

## Árbol de componentes

```text
Aplicación
├── Registro
├── Encabezado
├── Menú de productos
│   └── Producto
├── Carrito
└── Confirmación del pedido
```

## Componentes

### 1. Registro

Ventana que aparece al entrar.

- **Responsabilidad:** recoger los datos del cliente.
- **Datos:** nombre, WhatsApp, tipo de pedido y número de mesa cuando corresponda.
- **Reutilización:** sí, puede utilizarse en otros flujos de pedido.

### 2. Encabezado

Parte superior de la página con la marca Burgerhaus y el acceso al carrito.

- **Responsabilidad:** mostrar la marca y permitir acceder al carrito.
- **Datos:** cantidad total de productos en el carrito.
- **Reutilización:** sí, puede utilizarse en otras páginas.

### 3. Menú de productos

Muestra las categorías y los productos disponibles.

- **Responsabilidad:** mostrar y filtrar productos según la categoría seleccionada.
- **Datos:** lista de productos y categoría activa.
- **Reutilización:** sí, puede presentar distintos catálogos.

#### Producto

Tarjeta individual para una hamburguesa, café, bebida u otro producto.

- **Responsabilidad:** mostrar la información del producto y permitir agregarlo al carrito.
- **Datos:** imagen, nombre, precio y descripción.
- **Reutilización:** alta; se usa para cada producto del menú.

### 4. Carrito

Ventana lateral con los productos elegidos por el usuario.

- **Responsabilidad:** mostrar y permitir modificar el pedido.
- **Datos:** productos y cantidades.
- **Reutilización:** sí, siempre que reciba los datos y acciones mediante props y no dependa de un catálogo o una página concretos.

### 5. Confirmación del pedido

Ventana que aparece al enviar el pedido.

- **Responsabilidad:** mostrar el resumen y permitir continuar con la confirmación del pedido.
- **Datos:** datos del cliente y productos del carrito.
- **Reutilización:** sí, puede adaptarse a otros flujos de pedido.

## Vistas

1. **Registro:** captura de los datos del cliente antes de entrar al menú.
2. **Menú de productos:** encabezado, categorías y catálogo filtrable.
3. **Carrito y confirmación:** revisión y modificación del pedido, seguida del resumen de confirmación.

## Decisión: ¿el carrito debe ser independiente?

Sí. Conviene implementarlo como un componente independiente para poder reutilizar la interfaz en otras páginas. Su presentación recibe los artículos, cantidades y total, además de callbacks para cerrar, cambiar cantidades, eliminar artículos y enviar el pedido. El estado compartido del carrito y sus reglas de negocio deben permanecer en el nivel de la aplicación o en un hook/contexto compartido, no acoplarse al componente visual.
