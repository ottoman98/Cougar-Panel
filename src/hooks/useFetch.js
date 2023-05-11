import { useState, useEffect } from 'react'

function get (url, method) {
  const [data, setData] = useState(null)
  const [ready, setReady] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((e) => setError(e))
      .finally(() => setReady(true))
  }, [])
  return { data, error, ready }
}

function useFetchPost (url) {
  const [nombre, setNombre] = useState('')
  const [cantidad, setCantidad] = useState(0)
  const [precio, setPrecio] = useState(0)
  const [categoria, setCategoria] = useState('')
  const [colores, setColores] = useState([])
  const [tallas, setTallas] = useState([])
  const [descuento, setDescuento] = useState(0)
  const [imagenes, setImagenes] = useState([])
  const [genero, setGenero] = useState('')
  const [descripcion, setDescripcion] = useState(0)
  console.log(colores)
  const [status, setStatus] = useState()

  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData()
    formData.append('nombre', nombre)
    formData.append('cantidad', cantidad)
    formData.append('precio', precio)
    formData.append('categoria', categoria)
    formData.append('colores', colores)
    formData.append('tallas', tallas)
    formData.append('descuento', descuento)
    formData.append('genero', genero)
    formData.append('descripcion', descripcion)

    for (let i = 0; i < imagenes.length; i++) {
      formData.append('image', imagenes[i])
    }

    fetch(url, {
      method: 'POST',
      body: formData
    })
      .then(response => {
        if (response.ok) {
          console.log('Producto guardado con éxito')
          setStatus(response.status)
        } else {
          console.log('Ha ocurrido un error al guardar el producto')
        }
      })
      .catch(error => console.error('Ha ocurrido un error al guardar el producto', error))
  }

  const handleImagenesChange = (event) => {
    const files = event.target.files
    const imagenesArray = []

    for (let i = 0; i < files.length; i++) {
      imagenesArray.push(files[i])
    }

    setImagenes(imagenesArray)
  }

  return { nombre, cantidad, precio, setNombre, setCantidad, setPrecio, setCategoria, setColores, setTallas, setDescuento, setGenero, setDescripcion, handleImagenesChange, handleSubmit, status }
}

function useFetchPut (url, id) {
  const [status, setStatus] = useState()

  // newValues
  const [nombre, setNombre] = useState('')
  const [cantidad, setCantidad] = useState(0)
  const [precio, setPrecio] = useState(0)
  const [categoria, setCategoria] = useState('')
  const [colores, setColores] = useState([])
  const [tallas, setTallas] = useState([])
  const [descuento, setDescuento] = useState(0)
  const [descripcion, setDescripcion] = useState(0)
  const [genero, setGenero] = useState('')
  const [imagenes, setImagenes] = useState([])

  const handleImagenesChange = (event) => {
    const files = event.target.files
    const imagenesArray = []

    for (let i = 0; i < files.length; i++) {
      imagenesArray.push(files[i])
    }

    setImagenes(imagenesArray)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData()

    if (nombre !== '') {
      formData.append('nombre', nombre)
    }
    if (cantidad !== 0) {
      formData.append('cantidad', cantidad)
    }
    if (precio !== 0) {
      formData.append('precio', precio)
    }
    if (categoria !== '') {
      formData.append('categoria', categoria)
    }
    if (colores.length > 0) {
      colores.forEach(color => {
        formData.append('colores', color)
      })
    }
    if (tallas.length > 0) {
      tallas.forEach(talla => {
        formData.append('tallas', talla)
      })
    }
    if (descripcion !== '') {
      formData.append('descripcion', descripcion)
    }

    if (descuento !== 0) {
      formData.append('descuento', descuento)
    }
    if (genero !== '') {
      formData.append('genero', genero)
    }

    if (imagenes.length > 0) {
      for (let i = 0; i < imagenes.length; i++) {
        formData.append('image', imagenes[i])
      }
    }

    fetch(`${url}/${id}`, {
      method: 'PUT',
      body: formData

    })
      .then(response => {
        if (response.ok) {
          console.log('Producto guardado con éxito')
          setStatus(response.status)
        } else {
          console.log('Ha ocurrido un error al guardar el producto')
        }
      })
      .catch(error => console.error('Ha ocurrido un error al guardar el producto', error))
  }

  return { setNombre, setCantidad, setPrecio, setCategoria, setColores, setTallas, setDescuento, setDescripcion, setGenero, handleImagenesChange, handleSubmit, status }
}

function useFetchDelete (id) {
  fetch(`https://sport-elite-back.onrender.com/product/v1/${id}`, {
    method: 'DELETE'
  })
    .then(() => console.log('se borro'))
    .catch(error => console.error(error))
}

function useFetch (url, method, id) {
  if (method === 'GET' || method === undefined) {
    return get(url)
  }
  if (method === 'POST') {
    return useFetchPost(url)
  }
  if (method === 'DELETE') {
    return useFetchDelete
  }
  if (method === 'PUT') {
    return useFetchPut(url, id)
  }
}
export default useFetch
