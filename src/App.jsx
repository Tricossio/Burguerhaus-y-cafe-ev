import { useEffect, useRef, useState } from 'react'
import CartDrawer from './components/CartDrawer.jsx'
import CustomerModal from './components/CustomerModal.jsx'
import OrderConfirmation from './components/OrderConfirmation.jsx'
import ProductMenu from './components/ProductMenu.jsx'
import SiteHeader from './components/SiteHeader.jsx'
import { categories, products } from './data/products.js'
import { handleInternalLink, resolveRoute } from './utils/router.js'
import './burgerhaus.css'

function getQuantity(items) {
  return items.reduce((sum, item) => sum + item.quantity, 0)
}

function getTotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

function App() {
  const [pathname, setPathname] = useState(() => window.location.pathname)
  const [customer, setCustomer] = useState(null)
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [order, setOrder] = useState(null)
  const [toast, setToast] = useState('')
  const cartButtonRef = useRef(null)
  const restoreCartFocus = useRef(false)
  const toastTimer = useRef(null)
  const route = resolveRoute(pathname, categories)
  const activeCategory = route.categoryId ?? 'combos'
  const siteBlocked =
    route.name === 'menu' && (!customer || Boolean(order) || cartOpen)
  const itemCount = getQuantity(cart)
  const cartTotal = getTotal(cart)

  useEffect(() => {
    function handlePopState() {
      setPathname(window.location.pathname)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    document.title =
      route.name === 'not-found'
        ? 'Página no encontrada | Burgerhaus & Café'
        : 'Burgerhaus & Café'
  }, [route.name])

  useEffect(() => () => window.clearTimeout(toastTimer.current), [])

  useEffect(() => {
    if (!order && restoreCartFocus.current) {
      cartButtonRef.current?.focus()
      restoreCartFocus.current = false
    }
  }, [order])

  function addToCart(product) {
    const existingItem = cart.find((item) => item.id === product.id)
    const nextCart = existingItem
      ? cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      : [...cart, { ...product, quantity: 1 }]

    setCart(nextCart)
    setToast(
      `Producto agregado: ${product.name}. Total ${getTotal(nextCart)} Bs.`,
    )
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(''), 2200)
  }

  function changeQuantity(productId, change) {
    setCart((currentCart) =>
      currentCart.flatMap((item) => {
        if (item.id !== productId) return [item]
        const quantity = item.quantity + change
        return quantity > 0 ? [{ ...item, quantity }] : []
      }),
    )
  }

  function removeFromCart(productId) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId),
    )
  }

  function navigateTo(path) {
    if (path === window.location.pathname) return
    window.history.pushState({}, '', path)
    setPathname(window.location.pathname)
    window.scrollTo(0, 0)
  }

  function handleNavigation(event) {
    handleInternalLink(event, navigateTo)
  }

  function submitOrder() {
    if (cart.length === 0 || !customer) return

    const code = Math.floor(100000 + Math.random() * 900000)
    const total = getTotal(cart)
    const message = [
      `Hola, quiero realizar este pedido Burgerhaus (${code}).`,
      '',
      `Nombre: ${customer.name}`,
      `Teléfono: ${customer.phone}`,
      `Tipo: ${customer.type}`,
      ...(customer.type === 'Para Mesa' ? [`Mesa: ${customer.table}`] : []),
      '',
      ...cart.map(
        (item) =>
          `- ${item.name} x${item.quantity}: ${item.price * item.quantity} Bs`,
      ),
      '',
      `Total: ${total} Bs`,
    ].join('\n')

    setOrder({
      code,
      customer,
      items: cart,
      total,
      whatsappUrl: `https://wa.me/59162701097?${new URLSearchParams({ text: message })}`,
    })
  }

  function closeOrder() {
    restoreCartFocus.current = true
    setOrder(null)
    setCart([])
    setCartOpen(false)
  }

  const welcomeText = customer
    ? `Hola ${customer.name}. Pedido configurado para (${customer.type}${customer.type === 'Para Mesa' ? `, mesa ${customer.table}` : ''}). Disfruta lo mejor de Burgerhaus & Café.`
    : 'Sabor artesanal incomparable, papas crocantes, cafetería y postres preparados al instante.'

  if (route.name === 'not-found') {
    return (
      <main className="not-found-page">
        <p className="not-found-code">404</p>
        <h1>Esta página no existe</h1>
        <p>La dirección puede haber cambiado o no estar disponible.</p>
        <a
          className="btn-green-black"
          href={import.meta.env.BASE_URL}
          onClick={handleNavigation}
        >
          Volver al menú
        </a>
      </main>
    )
  }

  return (
    <>
      <div
        className="site-content"
        inert={siteBlocked}
        aria-hidden={siteBlocked}
      >
        <SiteHeader
          itemCount={itemCount}
          cartOpen={cartOpen}
          cartButtonRef={cartButtonRef}
          onNavigate={handleNavigation}
          onOpenCart={() => setCartOpen(true)}
        />
        <ProductMenu
          categories={categories}
          products={products}
          activeCategory={activeCategory}
          welcomeText={welcomeText}
          onNavigate={handleNavigation}
          onAdd={addToCart}
        />
        <footer className="site-footer">
          <div className="footer-title">BURGERHAUS &amp; CAFÉ</div>
          <div className="footer-thanks">¡Gracias por tu compra!</div>
          <div className="footer-socials">
            <a
              href="https://www.instagram.com/burgerhaus.cafe?igsh=MXh0NDJ6MjQ1cmYyeA=="
              target="_blank"
              rel="noreferrer"
              className="social-link"
              title="Instagram de Burgerhaus"
              aria-label="Instagram de Burgerhaus"
            >
              <i className="fa-brands fa-instagram" aria-hidden="true" />
            </a>
            <a
              href="https://wa.me/59162701097"
              target="_blank"
              rel="noreferrer"
              className="social-link"
              title="WhatsApp de Burgerhaus"
              aria-label="WhatsApp de Burgerhaus"
            >
              <i className="fa-brands fa-whatsapp" aria-hidden="true" />
            </a>
          </div>
          <div className="footer-copy">
            © Burgerhaus &amp; Café. Todos los derechos reservados.
          </div>
        </footer>
      </div>

      {!customer && <CustomerModal onComplete={setCustomer} />}
      {order && <OrderConfirmation order={order} onClose={closeOrder} />}
      <div
        className={`add-confirmation${toast ? ' visible' : ''}`}
        role="status"
        aria-live="polite"
      >
        {toast}
      </div>
      <CartDrawer
        cart={cart}
        total={cartTotal}
        itemCount={itemCount}
        isOpen={cartOpen && !order}
        onClose={() => setCartOpen(false)}
        onChangeQuantity={changeQuantity}
        onRemove={removeFromCart}
        onSubmitOrder={submitOrder}
      />
    </>
  )
}

export default App
