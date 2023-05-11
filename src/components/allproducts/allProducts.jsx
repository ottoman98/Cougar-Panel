import React from 'react'
import { Link } from 'react-router-dom'

import useFetch from '../../hooks/useFetch'
import numberSeparator from '../../utils/thousands_separator'
import './allproducts.css'

function AllProducts () {
  const url = 'https://sport-elite-back.onrender.com/product/v1'

  const data = useFetch(url).data
  const borrar = useFetch(url, 'DELETE')

  return (
    <>
      <h2>Todos los productos</h2>
      <div id='products-container'>
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Categoria</th>
              <th>colores</th>
              <th>tallas</th>
              <th>descuento</th>
              <th>Imagenes</th>
              <th>Imagenes</th>
              <th>Imagenes</th>
            </tr>
          </thead>
          <tbody>
            {!data
              ? (
                <tr>
                  <td colSpan='8'>esta cargando esa gaver</td>
                </tr>
                )
              : (
                <>
                  {data.map((x) => {
                    return (

                      <React.Fragment key={x._id}>
                        <tr>
                          <td>
                            {x.nombre.slice(0, 40)}
                            {x.nombre.length >= 40 ? <>...</> : null}
                            <br />

                          </td>
                          <td>{x.cantidad}  <br /> </td>
                          <td>{numberSeparator(x.precio)} $  </td>
                          <td>{x.categoria}</td>
                          <td>
                            {x.colores.map((x) => x.charAt(0).toUpperCase() + x.slice(1)).join(', ')}
                          </td>
                          <td>{x.tallas.join(', ').toUpperCase()}</td>
                          <td>{x.descuento}%</td>
                          <td>{x.imgUrls.length}</td>
                          <td>{x.genero}</td>
                          <td> {x.descripcion !== '0' ? x.descripcion.slice(0, 30) : 'no se ha agregado descripcion'}
                            {x.descripcion.length >= 40 ? <>...</> : null}
                          </td>
                          <td onClick={() => borrar(x._id)}>Borrar</td>
                          <td> <Link to={`/allproducts/edit/${x._id}`}>Editar</Link> </td>

                        </tr>

                      </React.Fragment>

                    )
                  })}
                </>
                )}
          </tbody>
        </table>

      </div>

    </>
  )
}
export default AllProducts
