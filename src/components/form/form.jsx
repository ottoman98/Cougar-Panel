import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import './form.css'

function ProductForm ({ method }) {
  const url = 'http://localhost:3000/product/v1/'
  const { id } = useParams()

  let fetch
  let required
  let titulo

  if (method === 'POST') {
    fetch = useFetch(url, method)
    required = true
    titulo = 'Agrega un nuvo producto'
  }
  if (method === 'PUT') {
    fetch = useFetch(url, method, id)
    required = false
    titulo = 'Editar producto'
  }
  const [selectedColores, setSelectedColores] = useState([])

  const { setNombre, setCantidad, setPrecio, setCategoria, setColores, setTallas, setDescuento, setGenero, setDescripcion, handleImagenesChange, handleSubmit, status } = fetch

  const handleColorChange = (event) => {
    const color = event.target.value
    if (event.target.checked) {
      setSelectedColores([...selectedColores, color])
      setColores([...selectedColores, color])
    } else {
      setSelectedColores(selectedColores.filter((c) => c !== color))
    }
  }

  /// status actions

  const [inputsDisabled, setInputsDisabled] = useState(false)

  const handleSubmitWithDisabledInputs = async (event) => {
    event.preventDefault()
    setInputsDisabled(true)
    await handleSubmit(event)
  }

  const navigate = useNavigate()

  useEffect(() => {
    if (status === 200) {
      navigate('/allproducts')
    }
  }, [status])

  return (
    <div id='main-form'>
      <h2>{titulo}</h2>

      <form id='form-product' onSubmit={handleSubmitWithDisabledInputs} encType='multipart/form-data'>

        <div className='input-container'>
          <label htmlFor='nombreInput'>Nombre:</label>
          <input id='nombreInput' type='text' required={required} onChange={event => setNombre(event.target.value)} disabled={inputsDisabled} />
        </div>

        <div className='input-container'>
          <label htmlFor='cantidadInput'>Cantidad:</label>
          <input id='cantidadInput' type='number' required={required} onChange={event => setCantidad(parseInt(event.target.value))} disabled={inputsDisabled} />
        </div>

        <div className='input-container'>
          <label htmlFor='precioInput'>Precio:</label>
          <input id='precioInput' type='number' required={required} onChange={event => setPrecio(parseInt(event.target.value))} disabled={inputsDisabled} />
        </div>

        <div className='input-container'>

          <label htmlFor='categoriaSelect'>Categoría:</label>
          <select id='categoriaSelect' required={required} onChange={event => setCategoria(event.target.value)}>
            <option value=''>Seleccione una opción</option>
            <option value='zapatos'>Zapatos</option>
            <option value='pantalones'>Pantalones</option>
            <option value='sudaderas'>Sudaderas</option>
            <option value='camisetas'>Camiseta</option>
            <option value='shorts'>Shorts</option>
            <option value='camisillas'>Camisillas</option>
            <option value='mochilas'>Mochilas</option>
            <option value='gorros y gorras'>Gorros y Gorras</option>
            <option value='balones'>Balones</option>
            <option value='gafas'>Gafas</option>
            <option value='cinturones'>Cinturones</option>
            <option value='tops'>Tops</option>
            <option value='vestidos y faldas'>Vestidos y Faldas</option>
            <option value='bolsas y bolsos'>Bolsas Y Bolsos</option>
            <option value='chaquetas'>Chaquetas</option>
            <option value='botas'>Botas</option>
            <option value='sombreros'>Sombreros</option>
            <option value='leggings'>Leggings</option>

          </select>

        </div>

        <div className='input-container'>
          <div className='input-color'>
            <input type='checkbox' name='rojo' value='#FF0000' onChange={handleColorChange} disabled={inputsDisabled} />
            <label style={{ backgroundColor: '#FF0000' }} htmlFor='rojo'>Rojo</label>
          </div>
          <div className='input-color'>
            <input type='checkbox' value='#008000' name='verde' onChange={handleColorChange} disabled={inputsDisabled} />
            <label style={{ backgroundColor: '#008000' }} htmlFor='verde'>Verde</label>
          </div>
          <div className='input-color'>
            <input type='checkbox' value='#0000FF' name='azul' onChange={handleColorChange} disabled={inputsDisabled} />
            <label style={{ backgroundColor: '#0000FF' }} htmlFor='azul'>Azul</label>
          </div>
          <div className='input-color'>
            <input type='checkbox' value='#FFFF00' name='amarillo' onChange={handleColorChange} disabled={inputsDisabled} />
            <label style={{ backgroundColor: '#FFFF00' }} htmlFor='amarillo'>Amarillo</label>
          </div>
          <div className='input-color'>
            <input type='checkbox' value='#800080' name='purpura' onChange={handleColorChange} disabled={inputsDisabled} />
            <label style={{ backgroundColor: '#800080' }} htmlFor='purpura'>Purpura</label>
          </div>
          <div style={{ backgroundColor: '#FA5000' }} className='input-color'>
            <input type='checkbox' value='#FA5000' name='naranja' onChange={handleColorChange} disabled={inputsDisabled} />
            <label htmlFor='naranja'>Naranja</label>
          </div>
          <div className='input-color'>
            <input type='checkbox' value='#000000' name='negro' onChange={handleColorChange} disabled={inputsDisabled} />
            <label htmlFor='negro'>Negro</label>
          </div>
          <div className='input-color'>
            <input type='checkbox' value='#FFFFFF' name='blanco' onChange={handleColorChange} disabled={inputsDisabled} />
            <label htmlFor='blanco'>Blanco</label>
          </div>
          <div className='input-color'>
            <input type='checkbox' value='#808080' name='gris' onChange={handleColorChange} disabled={inputsDisabled} />
            <label htmlFor='gris'>Gris</label>
          </div>
          <div className='input-color'>
            <input type='checkbox' value='#FFC0CB' name='rosa' onChange={handleColorChange} disabled={inputsDisabled} />
            <label htmlFor='rosa'>Rosa</label>
          </div>
          <div className='input-color'>
            <input type='checkbox' value='#964B00' name='marron' onChange={handleColorChange} disabled={inputsDisabled} />
            <label htmlFor='marron'>Marron</label>
          </div>
          <div className='input-color'>
            <input type='checkbox' value='#F5F5DC' name='beige' onChange={handleColorChange} disabled={inputsDisabled} />
            <label htmlFor='beige'>Beige</label>
          </div>
          {required && selectedColores.length === 0 && <span className='error'>Selecciona al menos un color</span>}
        </div>

        <div className='input-container'>
          <label htmlFor='tallasInput'>Tallas:</label>
          <input id='tallasInput' type='text' required={required} onChange={event => setTallas(event.target.value.split(','))} disabled={inputsDisabled} />
        </div>

        <div className='input-container'>
          <label htmlFor='descuentoInput'>Descuento:</label>
          <input id='descuentoInput' type='number' onChange={event => setDescuento(parseInt(event.target.value))} disabled={inputsDisabled} />
        </div>

        <div className='input-container'>
          <label htmlFor='generoSelect'>Genero:</label>
          <select id='generoSelect' required={required} onChange={event => setGenero(event.target.value)} disabled={inputsDisabled}>
            <option value=''>Seleccione una opción</option>
            <option value='hombre'>Hombre</option>
            <option value='mujer'>Mujer</option>
            <option value='unisex'>Unisex</option>
          </select>
        </div>

        <div className='input-container'>
          <label htmlFor='descripcionInput'>Descripcion:</label>
          <textarea id='descripcionInput' onChange={event => setDescripcion(event.target.value)} disabled={inputsDisabled} />
        </div>

        <div className='input-container'>
          <label htmlFor='imagenesInput'>Imágenes:</label>
          <input id='imagenesInput' type='file' required={required} multiple onChange={handleImagenesChange} disabled={inputsDisabled} />
        </div>

        <button type='submit' disabled={inputsDisabled}>Guardar</button>
      </form>

    </div>

  )
}

export default ProductForm
