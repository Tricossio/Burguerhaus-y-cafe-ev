import { useEffect, useRef } from 'react'
import { trapFocus } from '../utils/trapFocus.js'

export default function OrderConfirmation({ order, onClose }) {
  const whatsappRef = useRef(null)

  useEffect(() => whatsappRef.current?.focus(), [])

  function handleKeyDown(event) {
    if (event.key === 'Escape') onClose()
    trapFocus(event)
  }

  return (
    <div className="modal-overlay order-overlay">
      <section
        className="modal-card order-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirmTitle"
        onKeyDown={handleKeyDown}
      >
        <h2 id="confirmTitle">PEDIDO LISTO EN WHATSAPP</h2>
        <div className="order-code-badge">CÓDIGO: #{order.code}</div>
        <p className="modal-intro">
          Revisa el mensaje y pulsa “Enviar” en WhatsApp para completar tu pedido.
        </p>
        <div className="order-summary-box">
          <strong>Nombre:</strong> {order.customer.name}
          <br />
          <strong>Teléfono:</strong> {order.customer.phone}
          <br />
          <strong>Tipo:</strong> {order.customer.type}
          {order.customer.type === 'Para Mesa' && (
            <> / Mesa {order.customer.table}</>
          )}
          <br />
          <br />
          <strong>Detalle del Pedido:</strong>
          <br />
          {order.items.map((item, index) => (
            <div key={item.id}>
              {index + 1}. {item.name} x{item.quantity} -{' '}
              {item.price * item.quantity} Bs
            </div>
          ))}
          <br />
          <strong className="order-total">
            TOTAL A PAGAR: {order.total} Bs
          </strong>
        </div>
        <div className="modal-actions">
          <a
            ref={whatsappRef}
            className="btn-green-black whatsapp-link"
            href={order.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Abrir WhatsApp
          </a>
          <button
            className="btn-green-black secondary-action"
            type="button"
            onClick={onClose}
          >
            Cerrar comprobante
          </button>
        </div>
      </section>
    </div>
  )
}