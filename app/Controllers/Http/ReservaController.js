'use strict'
const Dia=use('App/Models/Dia');
const Reserva=use('App/Models/Reserva');
const Mesa=use('App/Models/Mesa');
const Database = use('Database');
const Usuario=use('App/Models/User');
const Persona=use('App/Models/Persona');

class ReservaController {

    async guardardia({request,response})
    {
        const dia = new Dia()
        dia.numero = request.input('numero');
        dia.mes = request.input('mes');
        await dia.save();
        return await response.status(200).json(dia);
    }
    async verdias({request,response})
    {
        const dia = await Dia.all();
        return  response.status(200).json(dia);
    }

    async cambiarestadomesa({params,request,response})
    {
        const mesa=await Mesa.find(params.id);
        mesa.disponible = 2;
        await mesa.save();

        const mesas = await Database
        .select( '*'
        )
        .from('mesas')
        .where('mesas.dia', mesa.dia);


        return await response.status(200).json(mesas);
    }

    async vermesas({params,request,response})
    {
        var dia=request.input('dia');
        const mesas = await Database
        .select( '*'
        )
        .from('mesas')
        .where('mesas.dia', params.id);
        return  response.status(200).json(mesas);
    }

    async guardarreserva({request,response})
    {

        const persona=await Persona.findBy('iduser',request.input('id_persona'));

        console.log('perona id'+persona.id);

        const reserva = new Reserva()
        reserva.mes = request.input('mes');
        reserva.dia = request.input('dia');
        reserva.hora_llegada = request.input('hora_llegada');
        reserva.mesa = request.input('mesa');
        reserva.id_persona = persona.id
        await reserva.save();
        return await response.status(200).json(reserva);
    }

    async verreservas({request,response})
    {
        return await Database
        .select( 'personas.nombre as nombre',
        'personas.apellidopaterno as apellidopaterno', 
        'personas.apellidomaterno as apellidomaterno',
        'reservas.mes','reservas.dia','reservas.hora_llegada',
        'reservas.mesa'
        )
        .from('reservas')
        .innerJoin('personas', function () {
         this
           .on('reservas.id_persona', 'personas.id')
       });
    }

    async verreservasusuario({params,request,response})
    {
        return await   Database
        .select( 'personas.nombre as nombre',
        'personas.apellidopaterno as apellidopaterno', 
        'personas.apellidomaterno as apellidomaterno',
        'reservas.mes','reservas.dia','reservas.hora_llegada',
        'reservas.mesa'
        )
        .from('reservas')
        .innerJoin('personas', function () {
         this
           .on('reservas.id_persona', 'personas.id')
       })
       .innerJoin('users', function () {
        this
          .on('personas.iduser', 'users.id')
      })
      .where('users.id', params.id);
    }


}

module.exports = ReservaController
