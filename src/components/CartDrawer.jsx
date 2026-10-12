import { useEffect, useRef } from 'react'
import { trapFocus } from '../utils/trapFocus.js'

export default function CartDrawer({
  cart,
  total,
  itemCount,
  isOpen,
  onClose,
  onChangeQuantity,
  onRemove,
  onSubmitOrder,
}) {
  const closeButtonRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return undefined
    const previouslyFocused = document.activeElement
    closeButtonRef.current?.focus()
    return () => previouslyFocused?.focus()
  }, [isOpen])

  function handleKeyDown(event) {
    if (event.key === 'Escape') onClose()
    trapFocus(event)
  }

  return (
    <>
      <button
        className={`cart-backdrop${isOpen ? ' is-open' : ''}`}
        type="button"
        aria-label="Cerrar carrito"
        aria-hidden={!isOpen}
        inert={!isOpen}
        tabIndex={isOpen ? 0 : -1}
        onClick={onClose}
      />
      <aside
        className={`cart-drawer${isOpen ? ' is-open' : ''}`}
        id="cartDrawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cartTitle"
        aria-hidden={!isOpen}
        inert={!isOpen}
        onKeyDown={handleKeyDown}
      >
        <div className="cart-header">
          <h2 id="cartTitle">
            Tu Pedido <span className="cart-header-count">{itemCount}</span>
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            className="remove-item-btn close-cart"
            aria-label="Cerrar carrito"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <div className="cart-list" aria-live="polite">
          {cart.length === 0 ? (
            'Carrito vacío.'
          ) : (
            cart.map((item) => (
              <div className="cart-row" key={item.id}>
                <div>
                  <strong>{item.name}</strong>
                  <br />
                  <small className="cart-item-total">
                    {item.price * item.quantity} Bs
                  </small>
                </div>
                <div className="cart-controls">
                  <button
                    type="button"
                    className="qty-btn"
                    aria-label={`Disminuir cantidad de ${item.name}`}
                    onClick={() => onChangeQuantity(item.id, -1)}
                  >
                    −
                  </button>
                  <span className="cart-quantity" aria-live="polite">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    className="qty-btn"
                    aria-label={`Aumentar cantidad de ${item.name}`}
                    onClick={() => onChangeQuantity(item.id, 1)}
                  >
                    +
                  </button>
                  <button
                    type="button"
                    className="remove-item-btn"
                    aria-label={`Eliminar ${item.name}`}
                    onClick={() => onRemove(item.id)}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="cart-footer">
          <div className="cart-total-row">
            <span>Total:</span>
            <span className="cart-total-value">{total} Bs</span>
          </div>
          <button
            className="btn-green-black send-order-button"
            type="button"
            onClick={onSubmitOrder}
            disabled={itemCount === 0}
            aria-disabled={itemCount === 0}
          >
            ENVIAR PEDIDO
          </button>
        </div>
      </aside>
    </>
  )
}