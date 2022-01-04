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

  setDNI = (dni) => {
    this._dni = dni;
  };
}

// Funciones
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

// Funciones de eventos

//Guarda usuario en base al evento change
const guardarUsuario = (e) => {
  let nombre = e.target;

  console.log(nombre.value);
  usuario.setNombre(nombre.value);
  usuario.setDNI(123123123);
  console.log("USUARIO: ", usuario);

  const tituloBienvenida = document.querySelector(".tituloBienvenida");
  tituloBienvenida.innerHTML = `Bienvenid@ ${usuario._nombre} a RocketWallet`;
};

const formInputUsername = document.querySelector(".formInputUsername");
formInputUsername.addEventListener("change", guardarUsuario);

// MANEJO DEL DEPOSITO

// Evento a boton principal deposito que abre el modal
const btnDeposito = document.querySelector(".btnDeposito");
console.log(btnDeposito);
btnDeposito.addEventListener("click", (e) => {
  $("#modalDeposito").modal("show");
});

//Evento y funciona para deposito dentro del modal
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

// MANEJO DEL RETIRO

// Evento a boton principal retiro que abre el modal
const btnRetiro = document.querySelector(".btnRetiro");
console.log(btnRetiro);
btnRetiro.addEventListener("click", (e) => {
  $("#modalRetiro").modal("show");
});

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
};

const btnGuardarRetiro = document.querySelector(".btnGuardarRetiro");
btnGuardarRetiro.addEventListener("click", guardarRetiro);

console.log("Arranca programa Principal");
$("#modalBienvenida").modal("show"); // abrir modal ingreso de usuario
const miWallet2 = new Wallet(); //Instancio un objeto wallet (con 100 pesos de carga de regalo)
const usuario = new Usuario(); //Instancio un usuario
imprimeTransacciones(miWallet2.transacciones); //Imprimo las transacciones
actualizaSaldo(); //actualizo el saldo de la wallet en html
