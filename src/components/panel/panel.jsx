import { Route, Routes, BrowserRouter, Link } from 'react-router-dom'
import AllProducts from '../allproducts/allProducts'
import ProductForm from '../form/form'
import Resumen from '../resumen/resumen'
import './panel.css'

function Panel () {
  return (
    <>
      <BrowserRouter>

        <div id='main'>
          <div id='aside'>
            <h2>SportElite</h2>

            <Link className='aside-link' to='/'>Resumen</Link>
            <Link className='aside-link' to='/add'>Agregar producto</Link>
            <Link className='aside-link' to='/allproducts'>Todos los productos</Link>
            <Link className='aside-link' hidden to='/Categories'>Agregar Categorias</Link>

          </div>
          <div id='panel'>
            <h1>Panel de Administracion</h1>

            <Routes>
              <Route index element={<Resumen />} />

              <Route path='/add' element={<ProductForm method='POST' />} />
              <Route path='/allproducts' element={<AllProducts />} />
              <Route path='/allproducts/edit/:id' element={<ProductForm method='PUT' />} />

            </Routes>

          </div>
        </div>
      </BrowserRouter>

    </>
  )
}

export default Panel
