import { Fragment, useContext, useEffect, useState } from 'react'
import './category.styles.scss'
import { useParams } from 'react-router-dom'
import { CategoriesContext } from '../../context/categories.context'
import { ProductCard } from '../../components/product-card/product-card.component'

export const Category = () => {
  const { category } = useParams()
  const { categoriesMap } = useContext(CategoriesContext)
  const [products, setProducts] = useState(categoriesMap[category])

  /**
   *  Update products only when category or categoriesMap changes 
   */
  useEffect(() => {
    setProducts(categoriesMap[category])
  }, [category, categoriesMap])

  return (
    <Fragment>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      <div className='category-container'>
        { 
          products &&
          products.map((product) => <ProductCard key={product.id} product={product}/>)
        }
      </div>
    </Fragment>
  )
}