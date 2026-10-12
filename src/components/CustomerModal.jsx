import { useEffect, useRef, useState } from 'react'
import { trapFocus } from '../utils/trapFocus.js'

function isValidPhone(value) {
  const digits = value.replace(/\D/g, '')
  return digits.length >= 7 && digits.length <= 9 && !/^(\d)\1+$/.test(digits)
}

function phoneError(value) {
  const digits = value.replace(/\D/g, '')
  if (!digits) return 'Escribe tu número de WhatsApp.'
  if (digits.length < 7 || digits.length > 9) {
    return 'El número debe tener entre 7 y 9 dígitos.'
  }
  if (/^(\d)\1+$/.test(digits)) return 'Número inválido. Revisa los dígitos.'
  return 'Escribe un número de WhatsApp válido.'
}

function isValidTable(value) {
  return /^\d{1,4}$/.test(value.trim())
}

export default function CustomerModal({ onComplete }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [type, setType] = useState('Delivery')
  const [table, setTable] = useState('')
  const [errors, setErrors] = useState({})
  const nameRef = useRef(null)
  const phoneRef = useRef(null)
  const tableRef = useRef(null)

  useEffect(() => nameRef.current?.focus(), [])

  function handleTypeChange(event) {
    const nextType = event.target.value
    setType(nextType)
    if (nextType !== 'Para Mesa') {
      setTable('')
      setErrors((current) => ({ ...current, table: '' }))
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = {
      name: name.trim().length >= 2
        ? ''
        : 'Escribe tu nombre completo (mínimo 2 caracteres).',
      phone: isValidPhone(phone) ? '' : phoneError(phone),
      table:
        type !== 'Para Mesa' || isValidTable(table)
          ? ''
          : 'Indica el número de mesa o QR para continuar.',
    }

    setErrors(nextErrors)
    if (Object.values(nextErrors).some(Boolean)) {
      if (nextErrors.name) nameRef.current?.focus()
      else if (nextErrors.phone) phoneRef.current?.focus()
      else tableRef.current?.focus()
      return
    }

    onComplete({
      name: name.trim(),
      phone: phone.trim(),
      type,
      table: type === 'Para Mesa' ? table.trim() : '',
    })
  }

  function handleKeyDown(event) {
    if (event.key === 'Escape') event.preventDefault()
    trapFocus(event)
  }

  return (
    <div className="modal-overlay customer-overlay">
      <form
        className="modal-card customer-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="userTitle"
        noValidate
        onSubmit={handleSubmit}
        onKeyDown={handleKeyDown}
      >
        <h2 id="userTitle">BIENVENIDO</h2>
        <p className="modal-intro">
          Usaremos estos datos para identificar tu pedido y contactarte por WhatsApp.
        </p>

        <label className="field-label" htmlFor="custName">
          Nombre completo
        </label>
        <input
          ref={nameRef}
          id="custName"
          type="text"
          placeholder="Tu nombre completo"
          autoComplete="name"
          required
          minLength={2}
          value={name}
          aria-describedby="nameError"
          aria-invalid={Boolean(errors.name)}
          onChange={(event) => setName(event.target.value)}
        />
        <div className="form-error" id="nameError" aria-live="polite">
          {errors.name}
        </div>

        <label className="field-label" htmlFor="custPhone">
          Número de WhatsApp
        </label>
        <input
          ref={phoneRef}
          id="custPhone"
          type="tel"
          placeholder="Ej. 62701097"
          autoComplete="tel"
          inputMode="tel"
          pattern="[0-9]{7,20}"
          required
          value={phone}
          aria-describedby="phoneError"
          aria-invalid={Boolean(errors.phone)}
          onChange={(event) => {
            const value = event.target.value
            setPhone(value)
            setErrors((current) => ({
              ...current,
              phone: value.trim() ? (isValidPhone(value) ? '' : phoneError(value)) : phoneError(value),
            }))
          }}
        />
        <div className="form-error" id="phoneError" aria-live="polite">
          {errors.phone}
        </div>

        <label className="field-label" htmlFor="custType">
          Tipo de pedido
        </label>
        <select
          id="custType"
          autoComplete="off"
          value={type}
          aria-describedby="typeHint"
          onChange={handleTypeChange}
        >
          <option value="Delivery">Delivery</option>
          <option value="Para Mesa">Para Mesa</option>
        </select>
        <div id="typeHint" className="sr-only">
          Elige si tu pedido será para delivery o para mesa.
        </div>

        {type === 'Para Mesa' && (
          <div aria-live="polite">
            <label className="field-label" htmlFor="mesaNumber">
              Número de mesa
            </label>
            <input
              ref={tableRef}
              id="mesaNumber"
              type="text"
              placeholder="Ej. 12"
              inputMode="numeric"
              autoComplete="off"
              value={table}
              aria-invalid={Boolean(errors.table)}
              aria-describedby="mesaError"
              onChange={(event) => {
                const value = event.target.value
                setTable(value)
                setErrors((current) => ({
                  ...current,
                  table: isValidTable(value)
                    ? ''
                    : 'Indica el número de mesa o QR para continuar.',
                }))
              }}
            />
            <div className="form-error" id="mesaError" aria-live="polite">
              {errors.table}
            </div>
          </div>
        )}

        <button className="btn-green-black modal-submit" type="submit">
          ENTRAR AL MENÚ
        </button>
      </form>
    </div>
  )
}