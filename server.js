const { json } = require('express')
const express = require ('express')
const { Router } = express
const app = express()

const port = 8080

const router = new Router()
const contenedor = require('./index.js')
const productos = new contenedor('./productos.txt')

app.use(express.json())

////////////// RUTAS /////////////

router.get('/', async (req, res)=>{
  const resultado = await productos.TomarTodo()
  res.send(resultado)
})

router.get('/:id', async (req, res) => {
  let { id } = req.params
  id = parseInt(id)

  const resultado = await productos.TomarPorId(id)
  if (resultado === 0) {
      res.status(400).send({
          error: 'Producto no encontrado'
      });
  } else {
      res.status(200).send(resultado)
  }
})


router.post('/', async (req, res) => {
  const guardarProducto = req.body
  res.status(201).send(await productos.Guardar(guardarProducto))
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const producto = await productos.TomarPorId(parseInt(id))
    if (producto === 0) {
      res.status(400).send({
      error: 'Producto no encontrado'
      })
      } else {
       producto = req.body
    res.status(201).send(await productos.ModifporId(id, producto))
}
  
  })

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    const borrarProducto = await productos.BorrarPorId(parseInt(id))
    res.json(borrarProducto)
})



app.use(express.static('public'))
app.use('/api/productos', router)


const server = app.listen(port, ()=>{
    console.log(`escuchando en puerto ${server.address().port}`)
})

server.on('error', (err)=> console.log(err))





