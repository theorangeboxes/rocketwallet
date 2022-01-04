//Bienvenid@s

//Funciones

//Retorna un monto válido ingresado por el usuario
// const IngresoMontoValido = (monto) => {
//   let montoValido = false;
//   let carga = 0;
//   while (!montoValido) {
//     carga = Number(
//       prompt("Ingrese al monto que desea cargar en su wallet (entre 0 y 500): ")
//     );
//     if (carga <= 0 || carga > 500) {
//       alert("Monto Inválido!! Debe ingresar valores entre 0 a 500");
//     } else {
//       montoValido = true;
//     }
//   }
//   return carga;
// };

//clase Transaccion
class Transaccion {
  constructor(carga, saldo) {
    let date = new Date();
    this.id = date.getTime() + "-" + Math.floor(Math.random() * 1000);
    this.fecha = new Date();
    this.carga = carga;
    this.saldo = saldo;
  }
  verTransaccion = () => {
    return `ID: ${this.id} | Fecha: ${this.fecha} | Carga: ${this.carga} | Saldo: ${this.saldo}`;
  };
}

//clase wallet
class Wallet {
  constructor(cargaInicial = 100) {
    this.carga = cargaInicial;
    //la wallet tiene un array de objetos transacciones
    this.transacciones = [new Transaccion(cargaInicial, this.carga)];
  }
  cargarSaldo = (carga) => {
    console.log("Dentro de Wallet: Saldo Previo: ", this.carga);
    this.carga = this.carga + carga;
    console.log("Dentro de Wallet: Saldo Posterior a carga: ", this.carga);
    this.transacciones.push(new Transaccion(carga, this.carga));
    console.log(this.transacciones);
  };
  verSaldo = () => {
    return this.carga;
  };
}

class Usuario {
  constructor() {
    this._nombre = null;
    this._dni = null;
  }

  setNombre = (nombre) => {
    this._nombre = nombre;
  };
  // getNombre = () => {
  //   return this._nombre;
  // };
  setDNI = (dni) => {
    this._dni = dni;
  };
  // getDNI = () => {
  //   return this._dni;
  // };
}

const imprimeTransacciones = (transacciones) => {
  const tabla = `Bienvenid@ ${usuario._nombre} a RocketWallet`;
  const tablaTransacciones = document.querySelector(".tablaTransacciones");
  let htmlTablaTransacciones = ``;
  transacciones.forEach((transaccion) => {
    htmlTablaTransacciones += `
                            <tr>
                            <th scope="row">${transaccion.id}</th>
                            <td>${transaccion.fecha.toLocaleString()}</td>
                            <td>${transaccion.carga}</td>
                            <td>${transaccion.saldo}</td>
                          </tr>
                        `;
  });

  tablaTransacciones.innerHTML = htmlTablaTransacciones;
};

const actualizaSaldo = () => {
  const saldo = document.querySelector(".saldo");
  saldo.innerHTML = `$ ${miWallet2.verSaldo()}`;
};

// const altaWallet = (usuario) => {
//   console.log("Instancio miWallet");
//   const miWallet = new Wallet(0);
//   console.log(miWallet);
// };
//Guarda usuario en base al evento change
const guardarUsuario = (e) => {
  let nombre = e.target;

  console.log(nombre.value);
  usuario.setNombre(nombre.value);
  usuario.setDNI(123123123);
  console.log("USUARIO: ", usuario);

  const tituloBienvenida = document.querySelector(".tituloBienvenida");
  tituloBienvenida.innerHTML = `Bienvenid@ ${usuario._nombre} a RocketWallet`;
  //altaWallet(usuario); //revisar
};

// const guardarModalBienvenida = document.querySelectorAll(
//   ".btnGuardarModalBienvenida"
// ); // Botón "Agregar al carrito"
// guardarModalBienvenida[0].addEventListener("click", guardarNombre);
// asigno

const formInputUsername = document.querySelector(".formInputUsername");
formInputUsername.addEventListener("change", guardarUsuario);

const btnDeposito = document.querySelector(".btnDeposito");
console.log(btnDeposito);
btnDeposito.addEventListener("click", (e) => {
  $("#modalDeposito").modal("show");
});

// EVENTo y FUNCION PARA DEPOSITAR
const guardarDeposito = (e) => {
  let montoDeposito = document.querySelector(".montoDeposito");
  console.log(montoDeposito.value);
  let carga = parseInt(montoDeposito.value);

  if (carga <= 0 || carga > 5000 || isNaN(carga)) {
    alert("Monto Inválido!! Debe ingresar valores entre 0 a 5000");
  } else {
    miWallet2.cargarSaldo(parseInt(montoDeposito.value));
    imprimeTransacciones(miWallet2.transacciones);
    actualizaSaldo();
    montoDeposito.value = "";
    console.log(montoDeposito.value);
    $("#modalDeposito").modal("hide");
  }
};

const btnGuardarDeposito = document.querySelector(".btnGuardarDeposito");
btnGuardarDeposito.addEventListener("click", guardarDeposito);

// EVENTO Y FUNCION PARA RETIRAR
const guardarRetiro = (e) => {
  let montoRetiro = document.querySelector(".montoRetiro");
  console.log(montoRetiro.value);
  let carga = parseInt(montoRetiro.value);
  console.log(carga, " ", miWallet2.verSaldo());
  // MANEJO DE ERRORES CON OBJETO ERROR
  let error = { error: false, mensaje: "" };
  error = isNaN(carga)
    ? { error: true, mensaje: "Ingrese un valor!!" }
    : { error: false, mensaje: "" };
  console.log("verifico nan ", error);

  if (!error.error) {
    // Verifico si el monto a retirar supera al saldo
    error =
      carga > miWallet2.verSaldo()
        ? { error: true, mensaje: "Saldo Insuficiente" }
        : { error: false, mensaje: "" };
    console.log("verifico saldo ", error);
  }
  if (!error.error) {
    // Verifico si el monto es valido
    error =
      carga <= 0
        ? { error: true, mensaje: "Ingrese un monto > 0" }
        : { error: false, mensaje: "" };
    console.log("verifico monto menor a 0", error);
  }

  if (!error.error) {
    miWallet2.cargarSaldo(carga * -1);
    imprimeTransacciones(miWallet2.transacciones);
    actualizaSaldo();
    montoRetiro.value = "";
    console.log(montoRetiro.value);
    $("#modalRetiro").modal("hide");
  } else {
    alert(error.mensaje);
    montoRetiro.value = "";
  }

  // monto.innerHTML = `Bienvenid@ ${usuario._nombre} a RocketWallet`;
};

const btnRetiro = document.querySelector(".btnRetiro");
console.log(btnRetiro);
btnRetiro.addEventListener("click", (e) => {
  $("#modalRetiro").modal("show");
});
const btnGuardarRetiro = document.querySelector(".btnGuardarRetiro");
btnGuardarRetiro.addEventListener("click", guardarRetiro);

console.log("levanto el js");
$("#modalBienvenida").modal("show"); // abrir
const miWallet2 = new Wallet();
const usuario = new Usuario(); //
imprimeTransacciones(miWallet2.transacciones);
actualizaSaldo();

//   $('#myModalExito').modal('hide'); // cerrar
//   let seguirCargando = true;
//   do{

//     //Detectamos si el usuario acepto el mensaje

//     miWallet.cargarSaldo(IngresoMontoValido());
//     seguirCargando = confirm("¿Queres seguir realizando cargas?");

//   }while (seguirCargando)

//   //Despedida
//   alert("Psss, revisa la consola en el inspector de código de tu navegador :) ");
//   console.log("Tu carga total es $",miWallet.verSaldo());
//   //Ordeno por fecha
//   console.log("PREVIO SORT");
//   miWallet.transacciones.forEach((e) => console.log(e.verTransaccion()));
//   console.log("POST SORT");
//   miWallet.transacciones.sort((a, b) => b.fecha - a.fecha)

//   miWallet.transacciones.forEach((e) => console.log(e.verTransaccion()));
