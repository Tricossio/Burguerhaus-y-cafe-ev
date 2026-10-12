export default function SiteHeader({
  itemCount,
  cartOpen,
  cartButtonRef,
  onNavigate,
  onOpenCart,
}) {
  return (
    <nav className="top-nav" aria-label="Navegación principal">
      <a
        className="brand-logo-container"
        href={import.meta.env.BASE_URL}
        aria-label="Burgerhaus & Café, menú principal"
        onClick={onNavigate}
      >
        <div className="brand-logo-img" aria-hidden="true">
          BH
        </div>
        <div className="brand-logo-text">
          BURGERHAUS <span>&amp; CAFÉ</span>
        </div>
      </a>
      <button
        ref={cartButtonRef}
        className="cart-pill"
        type="button"
        aria-label={`Carrito: ${itemCount} ${itemCount === 1 ? 'producto' : 'productos'}`}
        aria-expanded={cartOpen}
        aria-controls="cartDrawer"
        onClick={onOpenCart}
      >
        <i className="fa-solid fa-cart-shopping" aria-hidden="true" />
        <span>{itemCount}</span>
      </button>
    </nav>
  )
}