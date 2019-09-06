'use strict'
const Usuario=use('App/Models/User');
const Persona=use('App/Models/Persona');
const Trabajador=use('App/Models/Trabajador');
const Database = use('Database');


class UsuarioController {
    
    async guardarpersona({request,response})
    {
        const usuario = new Usuario()
        usuario.username = request.input('username');
        usuario.email = request.input('email');
        usuario.password = request.input('password');
        usuario.tipo = request.input('tipo');
        usuario.estado = request.input('estado');
        await usuario.save();

        const u = await Usuario.findBy('email', request.input('email'));

        const persona = await new Persona()

        persona.nombre = request.input('nombre');
        persona.apellidopaterno = request.input('apellidopaterno');
        persona.apellidomaterno = request.input('apellidomaterno');
        persona.direccion = request.input('direccion');
        persona.telefono = request.input('telefono');
        persona.iduser = u.id;
        await persona.save();

        return await response.status(200).json(persona);
    }

    async editarpersona({params,request,response})
    {
        const usuario=await Usuario.find(params.id);
        usuario.username = request.input('username');
        usuario.email = request.input('email');
        usuario.password = request.input('password');
        usuario.tipo = request.input('tipo');
        usuario.estado = request.input('estado');
        await usuario.save();

        const persona = await Persona.findBy('iduser', usuario.id);

        persona.nombre = request.input('nombre');
        persona.apellidopaterno = request.input('apellidopaterno');
        persona.apellidomaterno = request.input('apellidomaterno');
        persona.direccion = request.input('direccion');
        persona.telefono = request.input('telefono');
        // persona.iduser = u.id;
        await persona.save();


        return response.status(200).json(persona);
    }

    async guardarpersonatrabajador({request,response})
    {
        const usuario = new Usuario()
        usuario.username = request.input('username');
        usuario.email = request.input('email');
        usuario.password = request.input('password');
        usuario.tipo = request.input('tipo');
        usuario.estado = request.input('estado');
        await usuario.save();
        const u = await Usuario.findBy('email', request.input('email'));
        const persona = await new Persona()
        persona.nombre = request.input('nombre');
        persona.apellidopaterno = request.input('apellidopaterno');
        persona.apellidomaterno = request.input('apellidomaterno');
        persona.direccion = request.input('direccion');
        persona.telefono = request.input('telefono');
        persona.iduser = u.id;
        await persona.save();
        const trabajador = await new Trabajador()
        trabajador.puesto = request.input('puesto');
        trabajador.turno = request.input('turno');
        trabajador.salario = request.input('salario');
        trabajador.idpersona = persona.id
        await trabajador.save();
        return await response.status(200).json(trabajador);
    }

    async editarpersonatrabajador({params,request,response})
    {
        const usuario=await Usuario.find(params.id);
        usuario.username = request.input('username');
        usuario.email = request.input('email');
        usuario.password = request.input('password');
        usuario.tipo = request.input('tipo');
        usuario.estado = request.input('estado');
        await usuario.save();

        const persona = await Persona.findBy('iduser', usuario.id);

        persona.nombre = request.input('nombre');
        persona.apellidopaterno = request.input('apellidopaterno');
        persona.apellidomaterno = request.input('apellidomaterno');
        persona.direccion = request.input('direccion');
        persona.telefono = request.input('telefono');
        // persona.iduser = u.id;
        await persona.save();

        const trabajador = await Trabajador.findBy('idpersona', persona.id);
        trabajador.puesto = request.input('puesto');
        trabajador.turno = request.input('turno');
        trabajador.salario = request.input('salario');
        // trabajador.idpersona = persona.id

        await trabajador.save();
        return response.status(200).json(trabajador);
    }

    async eliminarusuario({params,request,response})
    {
        const usuario=await Usuario.find(params.id);
        usuario.estado = 'desactivo';
        await usuario.save();
        return response.status(200).json(usuario);
    }

    async verusuariopersonauno({params,request,response})
    {
       return await Database
       .select('users.id as userid','users.username as username',
       'users.email as email','users.password as password',
       'users.tipo as tipo', 'users.estado as estado',
       'personas.id as personaid', 'personas.nombre as nombre',
       'personas.apellidopaterno as apellidopaterno', 
       'personas.apellidomaterno as apellidomaterno',
       'personas.direccion as direccion', 'personas.telefono as telefono',
       )
       .from('users')
       .innerJoin('personas', function () {
        this
          .on('users.id', 'personas.iduser')
      })
      .where('users.id', params.id);
    }

    async verusuariopersona({request,response})
    {
       return await Database
       .select('users.id as userid','users.username as username',
       'users.email as email','users.password as password',
       'users.tipo as tipo', 'users.estado as estado',
       'personas.id as personaid', 'personas.nombre as nombre',
       'personas.apellidopaterno as apellidopaterno', 
       'personas.apellidomaterno as apellidomaterno',
       'personas.direccion as direccion', 'personas.telefono as telefono',
       )
       .from('users')
       .innerJoin('personas', function () {
        this
          .on('users.id', 'personas.iduser')
      });
    }

    async verusuariopersonatrabajador({request,response})
    {
       return await Database
       .select('users.id as userid','users.username as username',
       'users.email as email','users.password as password',
       'users.tipo as tipo', 'users.estado as estado',
       'personas.id as personaid', 'personas.nombre as nombre',
       'personas.apellidopaterno as apellidopaterno', 
       'personas.apellidomaterno as apellidomaterno',
       'personas.direccion as direccion', 'personas.telefono as telefono',
       'trabajadors.id as trabajadorid', 'trabajadors.puesto as puesto',
       'trabajadors.turno as turno', 'trabajadors.salario as salario',
       )
       .from('users')
       .innerJoin('personas', function () {
        this
          .on('users.id', 'personas.iduser')
      })
      .innerJoin('trabajadors', function () {
        this
          .on('personas.id', 'trabajadors.idpersona')
      });
    }

    async verusuariopersonausuariotrabajadoruno({params,request,response})
    {
        return await Database
        .select('users.id as userid','users.username as username',
        'users.email as email','users.password as password',
        'users.tipo as tipo', 'users.estado as estado',
        'personas.id as personaid', 'personas.nombre as nombre',
        'personas.apellidopaterno as apellidopaterno', 
        'personas.apellidomaterno as apellidomaterno',
        'personas.direccion as direccion', 'personas.telefono as telefono',
        'trabajadors.id as trabajadorid', 'trabajadors.puesto as puesto',
        'trabajadors.turno as turno', 'trabajadors.salario as salario',
        )
        .from('users')
        .innerJoin('personas', function () {
         this
           .on('users.id', 'personas.iduser')
       })
       .innerJoin('trabajadors', function () {
         this
           .on('personas.id', 'trabajadors.idpersona')
       })
      .where('users.id', params.id);
    }

    async miusuarioespecial({request,response})
    { 
      var email=request.input('email')
      return await Usuario.findBy('email',email);
  }
    

}

module.exports = UsuarioController
