const txtName = document.getElementById("Name"); //nombre 
const txtNumber = document.getElementById("Number"); //cantidad
const btnAgregar = document.getElementById("btnAgregar");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
const alertValidaciones = document.getElementById("alertValidaciones");
const tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);

const contadorProductos = document.getElementById("contadorProductos");
const productosTotal = document.getElementById("productosTotal");
const precioTotal = document.getElementById("precioTotal");

//numeración de la primera columna de la tabla
let cont = 0;
let costoTotal = 0;
let totalEnProductos = 0;

//funcion para validar la cantidad 
function validarCantidad(){
    if(txtNumber.value.trim().length<=0){
        return false;
    }//length<=0
    
    //este metodo comparación es para ver si esta ingresando un numero 
if(isNaN(txtNumber.value)){
    return false;
}//isNaN


if(Number(txtNumber.value)<=0){
    return false;
}//<=0

    //numero
    // mayor de 0
    return true;
}//validar cantidad

function getPrecio(){
    return Math.round((Math.random()*10000))/100; //funcion para un precio random con decimales(2 maximo) 4 digitos en total
}//getPrecio


//agregar la oreja 
// btnAgregar es el nombre del boton, el evento es el click , txtName que es donde se almaceno el valor del input 
// hacemos referencia al valor capturado le decimos que a ese mismo valor le quite los espacios con el trim. 
btnAgregar.addEventListener("click", function(event){
    event.preventDefault();

    //Bandera, al ser true permite los datos a la tabla
    let isValid = true;


    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";
    txtName.style.border = "";
    txtNumber.style.border = "";
    txtName.value = txtName.value.trim();
    txtNumber.value = txtNumber.value.trim();

    //validar que el nombre tenga 3 letras, se debe incluir el valor y la longitud
    if(txtName.value.length < 3){ 
        //ponemos borde con style y los pixeles para el grosor del borde 
        txtName.style.border = "solid 3px red";
        //revisar el alert y  ponerlo en block , primero hay que definir la variable arriba pegando el nombre del id 
        //strong es para poner en negritas 
    alertValidacionesTexto.innerHTML = "<strong> El nombre del producto no es valido. </strong>";
    alertValidaciones.style.display = "block"; //esto es para mostrar el contenedor
    isValid = false;
    }//length>=3

    if(! validarCantidad()){
        txtNumber.style.border = "solid 3px red";
        //se agrega +=por que quiere que aparezcan que la cantidad esta mal y el nombre 
        alertValidacionesTexto.innerHTML += "<br/><strong> La cantidad no es correcta. </strong>";
        alertValidaciones.style.display = "block";
    isValid = false;
    }//validar Cantidad

if(isValid){ //si paso la validaciones
    cont++;
    let precio = getPrecio();
    let row = `<tr>
                <td>${cont}</td>
                <td>${txtName.value}</td>
                <td>${txtNumber.value}</td>
                <td>${precio}</td>
                </tr>`;

    cuerpoTabla.insertAdjacentHTML("beforeend", row);
    costoTotal += precio * Number(txtNumber.value); // calcula el precio de la variable precio multiplicando con number que es el total de productos
    precioTotal.innerText = "$ " + costoTotal.toFixed(2); //el 2 es por los decimales que acepta
    totalEnProductos += Number(txtNumber.value); // nos dice el numero de productos
    productosTotal.innerHTML = totalEnProductos; // llamamos el total de productos al Html
    contadorProductos.innerText = cont; //contador pastilla roja

    // para limpiar en automatico los recuadros
    txtName.value = "";
    txtNumber.value = "";
    txtName.focus();

}//if isValid

});//btnAgregar