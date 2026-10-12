import ProductCard from './ProductCard.jsx'
import { publicAssetUrl } from '../utils/publicAsset.js'

const heroImage = publicAssetUrl('Blue burguer.jpeg')

export default function ProductMenu({
  categories,
  products,
  activeCategory,
  welcomeText,
  onNavigate,
  onAdd,
}) {
  const activeCategoryInfo = categories.find(
    (category) => category.id === activeCategory,
  )
  const visibleProducts = products.filter(
    (product) => product.category === activeCategory,
  )

  return (
    <>
      <header className="hero-banner">
        <div className="hero-content">
          <div className="hero-text">
            <h1>LAS MEJORES HAMBURGUESAS</h1>
            <p>{welcomeText}</p>
            <nav className="hero-categories" aria-label="Categorías del menú">
              {categories.map((category) => (
                <a
                  className={`cat-btn-hero${activeCategory === category.id ? ' active' : ''}`}
                  key={category.id}
                  href={`${import.meta.env.BASE_URL}menu/${category.id}`}
                  aria-current={activeCategory === category.id ? 'page' : undefined}
                  onClick={onNavigate}
                >
                  {category.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="hero-img-box">
            <img
              src={heroImage}
              className="main-burger"
              alt="Hamburguesa Burgerhaus"
            />
          </div>
        </div>
      </header>

      <main className="menu-section">
        <h2 className="section-title" id="categoryTitle">
          {activeCategoryInfo?.title ?? 'NUESTRO MENÚ'}
        </h2>
        <div className="sr-only" role="status" aria-live="polite">
          {visibleProducts.length} productos en {activeCategoryInfo?.title ?? 'nuestro menú'}.
        </div>
        {visibleProducts.length > 0 ? (
          <div className="products-grid">
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={() => onAdd(product)}
              />
            ))}
          </div>
        ) : (
          <p className="menu-empty-state">
            No hay productos disponibles en esta categoría por el momento.
          </p>
        )}
      </main>
    </>
  )
}