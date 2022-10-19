const { json } = require('express');
const fs = require('fs');

class Contenedor{
    constructor(rutaArchivo){
        this.rutaArchivo = `${__dirname}/db/${rutaArchivo}`
    }

    async #leerArchivo(){
        try{
        const contenido = await fs.promises.readFile(this.rutaArchivo,'utf-8');
        const constenidoParseado = await JSON.parse(contenido);
        return constenidoParseado;
        //console.log(contenidoParseado)
        } catch (err){
            console.log(err)
        }

    
        }

        async save(obj){ // guarda un objeto en el archivo, devuelve el id asignado
            try{
                const contenidoArchivo =  await this.#leerArchivo()
                if (contenidoArchivo) {
                    console.log(contenidoArchivo)
                    await fs.promises.writeFile(this.rutaArchivo, JSON.stringify([...contenidoArchivo, {...obj, id: contenidoArchivo[contenidoArchivo.length - 1].id + 1}], null, 2), 'utf-8')
                } else {            
                    await fs.promises.writeFile(this.rutaArchivo, JSON.stringify( [ {...obj, id: 1} ]), 'utf-8')
                }
            }catch(err){
                console.log(err)
            }
           
    
        }
    

    // async getById(id){
    //     try{
    //         const contenidoArchivo = await this.#leerArchivo()
    //         const producto = await contenidoArchivo.find(e => e.id == id )
    //             if(producto){
    //                 return producto
    //             }else{
    //                 console.log('no se encontro el producto');
    //                 }
               
    //     }catch(err){console.log(err)}
    //     }

    async getById(id){
        try {
            const carts = await this.getAll()
            console.log(carts)
            let foundById = carts.find(cart => cart.id == id)
            return foundById
        }catch(err){
            throw new Error
        }
    }
    

    async update(el){
          try{
            const contenidoArchivo = await this.getAll()
            const index = contenidoArchivo.findIndex(e => e.id == el.id)
            if(index == -1){
                throw new Error(`Error. No se encontro el id ${id}`)
            }else{
                contenidoArchivo[index] = el;
                try{
                    await fs.promises.writeFile(this.rutaArchivo, JSON.stringify(contenidoArchivo,null,2))
                }catch(err){
                    throw new Error(`Error al actualizar: ${err}`)          
                }
            }
          } catch(err){
            console.log(err)
          } 
    }    




    async getAll(){
        try{
            const content =  await this.#leerArchivo()
            if(content.length){
                return content
            }else{return []}
        }catch(err){
            console.log(err)    
        }
        
    }
    async deleteById(id){
        try{
            const contenidoArchivo =  await this.#leerArchivo()
            const findId = await contenidoArchivo.findIndex(e => e.id == id);
            console.log(findId)
            if(findId != -1){
                await contenidoArchivo.splice(findId,1)
                await fs.promises.writeFile(this.rutaArchivo, JSON.stringify([{...contenidoArchivo}],null,2),'utf-8')
                console.log(contenidoArchivo)
            }
            
        } catch(err){
            console.log(err)
        }
        //console.log(contenidoArchivo) 

    }
    async deleteAll(){
        const contenidoArchivo = await this.#leerArchivo();
        await contenidoArchivo.splice(0, contenidoArchivo.length)
        await fs.promises.writeFile(this.rutaArchivo,JSON.stringify(contenidoArchivo),'utf-8')
        // console.log(contenidoArchivo)
    }

    async getProductRandom(){
        try {
            let data = await this.#leerArchivo(this.rutaArchivo)
            let random = Math.floor(Math.random() * data.length)
            return data[random]
        } catch (error) {
            console.log(error)
        }
    } 




    // async addToCart(id, id_prod){
    //     try{
    //         const prod = this.getById(id_prod)
    //         try{
    //             this.rutaArchivo = 'cart.txt' 
    //             const contenidoArchivo =  await this.#leerArchivo()
    //             if(contenidoArchivo.id){
    //                 contenidoArchivo.push(prod)
    //             }

    //         }catch(err){
    //             console.log(err)
    //         }

    //     }catch(err){
    //         console.log(err)
    //     }

    // }
}

module.exports = Contenedor