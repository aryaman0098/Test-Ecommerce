import { useContext } from 'react'
import { Button, BUTTON_TYPES_CLASSES } from '../button/button.component'
import './product-card.styles.scss'
import { CartContext } from '../../context/cart.context'

export const ProductCard = ({ product }) => {
  
  const { name, price, imageUrl } = product

  const { addItemToCart } = useContext(CartContext)

  const addProductToCart = () => addItemToCart(product)

  return (
    <div className="product-card-container">
      <img src = {imageUrl} alt= {`${name}`}/>
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType={BUTTON_TYPES_CLASSES.inverted} onClick={addProductToCart}>Add to cart</Button>
    </div>
  )
}