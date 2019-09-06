'use strict'
// const Pedido=use('App/Models/Pedido');
const Pedido=use('App/Models/Pedidoo');
const Database = use('Database');
const Usuario=use('App/Models/User');
const Persona=use('App/Models/Persona');

class PedidoController {

    async guardarpedido({request,response})
    {
        const pedido = new Pedido()
        pedido.nombreplatillo = request.input('nombreplatillo');
        pedido.precioplatillo = request.input('precioplatillo');
        pedido.idpersona = request.input('idpersona');
         pedido.estado = "activo";
        await pedido.save();

        const pedidos = await Database
       .select('personas.id as idpersona','personas.nombre as nombre',
       'personas.apellidopaterno as apellidopaterno',
       'personas.apellidomaterno as apellidomaterno',
       'pedidoos.id as idpedido', 'pedidoos.nombreplatillo as platillonombre',
       'pedidoos.precioplatillo as precio', 'pedidoos.created_at as created_at',
       'pedidoos.estado as estado'
       )
       .from('pedidoos')
       .innerJoin('personas', function () {
        this
          .on('pedidoos.idpersona', 'personas.id')
      });

        return await response.status(200).json(pedidos);
    } 

    async verpedidos({request,response})
    {
       return await Database
       .select('personas.id as idpersona','personas.nombre as nombre',
       'personas.apellidopaterno as apellidopaterno',
       'personas.apellidomaterno as apellidomaterno',
       'pedidoos.id as idpedido', 'pedidoos.nombreplatillo as platillonombre',
       'pedidoos.precioplatillo as precio', 'pedidoos.created_at as created_at',
       'pedidoos.estado as estado'
       )
       .from('pedidoos')
       .innerJoin('personas', function () {
        this
          .on('pedidoos.idpersona', 'personas.id')
      });
    }

    async verMISpedidos({request,response})
    {
        var email=request.input('email')
      var usua = await Usuario.findBy('email',email);

      var persona = await Persona.findBy('iduser',usua.id);

       return await Database
       .select('personas.id as idpersona','personas.nombre as nombre',
       'personas.apellidopaterno as apellidopaterno',
       'personas.apellidomaterno as apellidomaterno',
       'pedidoos.id as idpedido', 'pedidoos.nombreplatillo as platillonombre',
       'pedidoos.precioplatillo as precio', 'pedidoos.created_at as created_at',
       'pedidoos.estado as estado'
       )
       .from('pedidoos')
       .innerJoin('personas', function () {
        this
          .on('pedidoos.idpersona', 'personas.id')
      })
      .where('personas.id', persona.id);
    
    }

}

module.exports = PedidoController
