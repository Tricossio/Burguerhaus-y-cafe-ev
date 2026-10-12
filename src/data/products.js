import { publicAssetUrl } from '../utils/publicAsset.js'

export const categories = [
  { id: 'combos', label: 'Combos', title: 'NUESTROS COMBOS' },
  { id: 'simples', label: 'Simples', title: 'HAMBURGUESAS SIMPLES' },
  { id: 'papas', label: 'Papas', title: 'NUESTROS COMPLEMENTOS' },
  { id: 'cafes', label: 'Cafés y Postres', title: 'CAFÉS Y POSTRES' },
  { id: 'bebidas', label: 'Bebidas', title: 'BEBIDAS Y CERVEZAS' },
]

export const products = [
  { id: 1, name: 'Combo Tocino', price: 55, category: 'combos', description: 'Tocino súper crocante, cheddar suave + Papas y Gaseosa.', image: publicAssetUrl('Tocino.jpeg') },
  { id: 2, name: 'Combo Americano', price: 53, category: 'combos', description: 'Doble cheddar fundido, pepinillos + Papas Fritas + Gaseosa.', image: publicAssetUrl('Americana.jpeg') },
  { id: 3, name: 'La 300', price: 58, category: 'combos', description: '300g de pura carne de res, doble queso, salsa especial + Papas y Gaseosa.', image: publicAssetUrl('Blue burguer.jpeg') },
  { id: 4, name: 'La Veggie', price: 50, category: 'combos', description: 'Hamburguesa vegetariana especial con vegetales frescos + Papas y Gaseosa.', image: publicAssetUrl('Veggie.jpeg') },
  { id: 5, name: 'Tocino', price: 46, category: 'simples', description: 'Doble tira de tocino ahumado crocante con fundido cheddar.', image: publicAssetUrl('Tocino.jpeg') },
  { id: 6, name: 'Americano', price: 44, category: 'simples', description: 'Queso cheddar abundante, pepinillos en conserva y mostaza.', image: publicAssetUrl('Americana.jpeg') },
  { id: 7, name: 'La 300', price: 48, category: 'simples', description: '300g de pura carne artesanal de res con queso fundido y salsas.', image: publicAssetUrl('Blue burguer.jpeg') },
  { id: 8, name: 'Veggie', price: 40, category: 'simples', description: 'Hamburguesa vegetariana con tomate, lechuga y aderezo especial.', image: publicAssetUrl('Veggie.jpeg') },
  { id: 9, name: 'Papas Fritas Porción', price: 14, category: 'papas', description: 'Papas bastón crujientes recién fritas y sazonadas.', image: publicAssetUrl('papas.jpeg') },
  { id: 10, name: 'Café con Jugo de Naranja', price: 16, category: 'cafes', description: 'Refrescante combinación de espresso recién pasado con jugo natural de naranja.', image: publicAssetUrl('cafe con naranja.jpeg') },
  { id: 11, name: 'Café Negro', price: 12, category: 'cafes', description: 'Café negro puramente pasado, intenso y reconfortante.', image: publicAssetUrl('cafe caliente.jpeg') },
  { id: 12, name: 'Capuccino Caliente', price: 18, category: 'cafes', description: 'Espresso concentrado con leche vaporizada y espuma de cacao.', image: publicAssetUrl('Late burguerhaus.jpeg') },
  { id: 13, name: 'Brownie con Helado', price: 25, category: 'cafes', description: 'Brownie tibio de chocolate con bola de helado de vainilla.', image: publicAssetUrl('brownie burguerhaus.jpeg') },
  { id: 14, name: 'Cerveza Paulaner', price: 28, category: 'bebidas', description: 'Cerveza alemana Paulaner helada de alta calidad.', image: publicAssetUrl('Cerveza Paulaner.png') },
  { id: 15, name: 'Jugo del Valle (1 Litro)', price: 18, category: 'bebidas', description: 'Jugo natural en botella de 1 litro, varios sabores.', image: publicAssetUrl('Jugo delvaie.png') },
  { id: 16, name: 'Gaseosa Personal', price: 10, category: 'bebidas', description: 'Gaseosa helada personal.', image: publicAssetUrl('Coca de a quinientos.png') },
]