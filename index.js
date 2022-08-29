class Usuario {

    constructor(nombre, apellido, libros = [], mascotas = []) {
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas
    }

        getFullName() {
            return `${this.nombre} ${this.apellido}`
    }
        addMascotas(nombre) {
            this.mascotas.push(nombre)
    }
        countMascotas() {
            return `${this.mascotas.length} Mascotas`
    }
        addBook(nombre, autor) {
        let book = { nombre: nombre, autor: autor }
        return this.libros.push(book)
    }
        getBookNames() {
        let bookNames = this.libros.map((libro) => {
            return libro.nombre
        })
        return `Los libros de ${this.getFullName()} son: ${bookNames}`
    }
}

const usuario1 = new Usuario("Tomas", "Pujolle")


    usuario1.getFullName()
    usuario1.addMascotas("Perro")
    usuario1.addMascotas("Gato")
    usuario1.addBook("El señor de las moscas", "Wiliam Golding")
    usuario1.addBook("Fundacion", "Isaac Asimov")
    
    console.log(usuario1)

    console.log(usuario1.getFullName())
    console.log(usuario1.countMascotas())
    console.log(usuario1.getBookNames())