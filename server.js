const express = require ('express')
const app = express()
const port = 8080

const contenedor = require('./index.js')
const products = new contenedor('./productos.txt')
const getProducts = products.getAll();

app.get('/', (req, res)=>{
    res.send('inicio')
})

app.get("/productos", async (req, res) => {
    const result = await getProducts;
    res.send(result)
  })

app.get("/randomProduct", async (req, res) => {
    const result = await getProducts
    const random = result[Math.floor(Math.random() * result.length)]
    res.send(random)
  })


const server = app.listen(port, ()=>{
    console.log(`Listening on port ${server.address().port}`)
})

server.on('error', (err)=> console.log(err))