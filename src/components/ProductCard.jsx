export default function ProductCard({ product, onAdd }) {
  return (
    <article className="card-item">
      <div>
        <div className="card-img-wrap">
          <img src={product.image} alt={product.name} />
        </div>
        <h3 className="card-title">{product.name}</h3>
        <p className="card-desc">{product.description}</p>
      </div>
      <div className="card-bottom">
        <div className="card-price">
          {product.price} <span>Bs</span>
        </div>
        <button
          className="btn-green-black order-button"
          type="button"
          onClick={onAdd}
          aria-label={`Ordenar ${product.name}`}
        >
          ORDENAR
        </button>
      </div>
    </article>
  )
}