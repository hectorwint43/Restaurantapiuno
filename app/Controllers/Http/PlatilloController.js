'use strict'

const Platillo=use('App/Models/Platillo');
const Platillo1=use('App/Models/platillo1');
const Database = use('Database');
const Helpers = use("Helpers");

class PlatilloController {


    async guardarplatillo({request,response})
    {
        const platillo = new Platillo1()
        platillo.foto = request.input('foto');
        platillo.nombre = request.input('nombre');
        platillo.precio = request.input('precio');
        platillo.estado = request.input('estado');
        await platillo.save();
        return await response.status(200).json(platillo);
    }

    async verplatillos({request,response})
    {
        const platillo = await Platillo1.find();
        return  response.status(200).json(platillo);
    }

    async archivos({ request, response  }) {
        console.log('1');
        const file = request.file('file', {
          types: ['jpg','jpeg','png', 'gif','svg','mp4','mp3','avi','wmv','mov','mpeg'],
          size: '1024mb'
        })
        console.log('2');
     const fileName = `${new Date().getTime()}.${file.subtype}`
     console.error(fileName);
     file.move(Helpers.publicPath('/assets/archivos/'), {
      name: fileName
    });
        console.log('3');
        console.log('/assets/archivos/'+fileName);
       return response.status(200).json({url:'/assets/archivos/'+fileName})
    }

    async editarplatillo({params,request,response})
    {

        const platillo=await Platillo1.find({nombre:params.id});
        platillo.foto = request.input('foto');
        platillo.nombre = request.input('nombre');
        platillo.precio = request.input('precio');
        platillo.estado = request.input('estado');
        await platillo.save();
        return response.status(200).json(platillo);
    }

    async verplatillouno({params,request,response})
    {
        const platillo=await Platillo1.find({nombre:params.id});
        return response.status(200).json(platillo);
    }

    async eliminarplatillo({params,request,response})
    {
        const platillo=await Platillo1.find({nombre:params.id});
        platillo.estado = 'desactivo';
        await platillo.save();
        return response.status(200).json(platillo);
    }

}

module.exports = PlatilloController
