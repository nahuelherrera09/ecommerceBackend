const { json } = require('express');
const fs = require('fs');

class Contenedor{
    constructor(rutaArchivo){
        this.rutaArchivo = `${__dirname}/db/${rutaArchivo}.json`
    }

    async #leerArchivo(){
        try{
        const contenido = await fs.promises.readFile(this.rutaArchivo,'utf-8');
        const constenidoParseado = JSON.parse(contenido);
        return constenidoParseado;
        //console.log(contenidoParseado)
        } catch (err){
            console.log(err)
        }

    
        }

        async save(obj){ // guarda un objeto en el archivo, devuelve el id asignado
            const contenidoArchivo =  await this.#leerArchivo()
            if (contenidoArchivo.length !== 0) {
                console.log(contenidoArchivo)
                await fs.promises.writeFile(this.rutaArchivo, JSON.stringify([...contenidoArchivo, {...obj, id: contenidoArchivo[contenidoArchivo.length - 1].id + 1}], null, 2), 'utf-8')
            } else {            
                await fs.promises.writeFile(this.rutaArchivo, JSON.stringify( [ {...obj, id: 1} ]), 'utf-8')
            }
    
        }
    

    async getById(id){
        const contenidoArchivo = await this.#leerArchivo()
          
                const idObj =  await contenidoArchivo.find(e => e.id === id )
                if(idObj == undefined){
                    console.log(null)
                    //return null
                }else{
                    console.log(idObj);
                }
           
        }

    async update(el){
        let contenidoArchivo = await this.#leerArchivo()
        let one = await contenidoArchivo.find(e => e.id == el.id)
        let newEl = {...one,...contenidoArchivo}

        let index = contenidoArchivo.findIndex((el,ind)=>{
            if(el.id == newEl.id){
                return true
            }
        })
        contenidoArchivo[index] = newEl

        fs.promises.writeFile(this.rutaArchivo,JSON.stringify(contenidoArchivo,null,'\t'))
        return({ response: 'updated', el: newEl })
    }    




    async getAll(){
        try{
            const content = await this.#leerArchivo()
            if(content.length){
                return content
            }else{return null}
        }catch(err){
            console.log(err)    
        }
        
    }
    async deleteById(id){
        const contenidoArchivo =  await this.#leerArchivo()
        const findId = await contenidoArchivo.findIndex(e => e.id === id);
        await contenidoArchivo.splice(findId,1)
        await fs.promises.writeFile(this.rutaArchivo, JSON.stringify([{...contenidoArchivo}],null,2),'utf-8')
        
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

}

module.exports = Contenedor