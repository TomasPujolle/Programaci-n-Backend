const fs = require("fs");

class Contenedor {
         constructor(rutaArchivo) {
            this.rutaArchivo = rutaArchivo;
         }

         async #leerArchivo() {
            try {
                const contenido = await fs.promises.readFile(this.rutaArchivo, "utf-8");
                const contenidoParse = JSON.parse(contenido)
                return contenidoParse
                
            } catch (error) {
                console.error(error)
            }    
         }

         async save(obj) {
            const contenidoArchivo = await this.#leerArchivo()
            try {
                if ( contenidoArchivo.length !== 0 ) {
                    await fs.promises.writeFile(this.rutaArchivo, JSON.stringify([...contenidoArchivo, {...obj, id: contenidoArchivo[contenidoArchivo.length - 1].id + 1}], null, 2) )
                    console.log('Producto guardado')
                 } else {
                    await fs.promises.writeFile(this.rutaArchivo, JSON.stringify([ {...obj, id: 1}]), 'utf-8')
                    console.log('Producto guardado')
                }
            } catch (error) {
                console.error(error)
        }   
            
         }

        async getById(id) {
            const contenidoArchivo = await this.#leerArchivo()
            try {
                const producto = contenidoArchivo.filter(item => item.id === id)
                if (producto.length > 0) {
                        console.log('Producto encontrado: ' + JSON.stringify(producto, true, 2));
                    } else {
                        console.log('producto no existe')
                    }
            } catch (error) {
                console.error(error)
            }   
            
         }

         async getAll() {
            const contenidoArchivo = await this.#leerArchivo()
            try {
                console.log(contenidoArchivo)
            } catch (error) {
                console.error(error)
            }   
            
         }

         async deleteById(id) {
            const contenidoArchivo = await this.#leerArchivo()
            try {
                const producto = contenidoArchivo.filter(item => item.id !== id)
                const productoborrado = contenidoArchivo.filter(item => item.id === id)
            if ( productoborrado.length > 0) {
                    await fs.promises.writeFile(this.rutaArchivo, JSON.stringify(producto, null, 2));
                    console.log(`Producto N°: ${id}  Fue eliminado con exito`)
                } else {
                    console.log('id del producto no existe')
                }
    
            } catch (error) {
                console.error(error)
            }   
            
                
        }

         async deleteAll() {
            const contenidoArchivo = await this.#leerArchivo()
            try {   
            if( contenidoArchivo.length > 0 ) {
                await fs.promises.writeFile(this.rutaArchivo, JSON.stringify([], null, 2), 'utf-8')
                console.log('productos eliminados')
            } else {
                console.log('Aqui no hay nada')
            }

            } catch (error) {
                console.error(error)
            }   
            
         }
}         

const contenedor = new Contenedor('./productos.txt')

//contenedor.save({title: 'producto X', precio: 200 })

//contenedor.getAll()

//contenedor.getById(2)

//contenedor.deleteById(6)

//contenedor.deleteAll()

     