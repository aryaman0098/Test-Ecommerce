import { Routes, Route } from 'react-router-dom'
import './shop.styles.scss'
import { CategoriesPreview } from '../categories-preview/categories-preview.component'
import { Category } from '../category/category.component'


export const Shop = () => {
  return ( 
    <Routes   >
      <Route index element={<CategoriesPreview/>}></Route>
      <Route path=':category' element={<Category/>}></Route>
    </Routes>
  )
}