'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

//-----------------------PEDIDOS------------------
Route.post('pedido/guardar','PedidoController.guardarpedido')
Route.get('pedidosver','PedidoController.verpedidos')
Route.post('vermispedidos','PedidoController.verMISpedidos')
//-----------------------PEDIDOS------------------

//-----------------------RESERVAS------------------
Route.post('dia/guardar','ReservaController.guardardia')
Route.get('diasver','ReservaController.verdias')
Route.post('reserva/guardar','ReservaController.guardarreserva')
Route.get('reservasver','ReservaController.verreservas')
Route.get('reserva/verporuno/:id','ReservaController.verreservasusuario')
Route.get('mesa/verpordia/:id','ReservaController.vermesas')
Route.put('mesa/cambiarestado/:id','ReservaController.cambiarestadomesa')
//-----------------------RESERVAS------------------

//----------LOGIN--------------------
Route.post('login','LoginController.login')
Route.post('verusua','LoginController.veraftertoken')
//----------LOGIN--------------------

//-----------------------USUARIO-------------------
Route.post('usuarioespecial','UsuarioController.miusuarioespecial')
Route.post('usuario/guardar','UsuarioController.guardarpersona')
Route.post('usuario/trabajador/guardar','UsuarioController.guardarpersonatrabajador')
Route.get('usuariospersonas','UsuarioController.verusuariopersona')
Route.get('usuariospersonastrabajadores','UsuarioController.verusuariopersonatrabajador')
Route.get('usuario/usuariospersonas/:id','UsuarioController.verusuariopersonauno')
Route.get('usuario/usuariospersonastrabajadores/:id','UsuarioController.verusuariopersonausuariotrabajadoruno')
Route.put('usuario/editarpersona/:id','UsuarioController.editarpersona')
Route.put('usuario/editartrabajador/:id','UsuarioController.editarpersonatrabajador')
Route.put('usuario/eliminar/:id','UsuarioController.eliminarusuario')
//-----------------------USUARIO-------------------

//-----------------------PLATILLOS-------------------
Route.post('archivos','PlatilloController.archivos')
Route.post('platillo/guardar','PlatilloController.guardarplatillo')
Route.get('platillo/ver','PlatilloController.verplatillos')
Route.get('platillo/ver/:id','PlatilloController.verplatillouno')
Route.put('platillo/editar/:id','PlatilloController.editarplatillo')
Route.put('platillo/eliminar/:id','PlatilloController.eliminarplatillo')
//-----------------------PLATILLOS-------------------
