
    $('#myModal').on('shown.bs.modal', function () {
        $('#myInput').trigger('focus')
      })
const botonPedidos = document.getElementById("boton-pedidos");
const botonCantidadProductos = document.querySelector("#sel1");
const botonCantidadPedidos = document.querySelector("#sel2");
const spanItems = document.querySelector(".span-button");
const spanPrecio = document.querySelector("#price-span");
const botonAgregar = document.querySelector("#boton-agregar");
const botonContinuar = document.querySelector("#boton-continuar")
function addToModalClicked (event){

    let button = event.target
    console.log("BOTON",button)
    let shopItem = button.parentElement.parentElement;
    let productImage = shopItem.getElementsByClassName("card-image")[0].src;
    let producTitle = shopItem.getElementsByClassName("card-title")[0].innerText;
    let description = shopItem.getElementsByClassName("card-text")[0].innerText;
    let spanDescription = shopItem.getElementsByClassName("not-display")[0].innerText
    let productPrice = shopItem.getElementsByClassName("card-price")[0].innerText;
    console.log(shopItem, producTitle, description, productPrice)
    ModalProductos(productImage, producTitle, description, productPrice, spanDescription);
}
function resetearCantidad (){
  $('#sel1').prop('selectedIndex',0);
  spanItems.textContent = "1 Item"
}
function ModalProductos (image, title, description, price, notShownDescription){
    document.querySelector("#exampleModalImage").src = image;
    document.querySelector("#exampleModalLabel").textContent = title;
    document.querySelector("#modalText").textContent = (description +" " + notShownDescription).replace("...", ".");
    document.querySelector("#price-span").innerText = price;
    const precioSinDivisa = parseFloat(document.querySelector("#price-span").innerText.replace("$",""));
    botonCantidadProductos.addEventListener("change", function actualizarTotal (){
        let cantidad = document.querySelector("#sel1").value;
        totalItems = cantidad;
        spanItems.textContent = totalItems + " Items";
        spanPrecio.textContent ="$" + (totalItems * precioSinDivisa);
}) 
  resetearCantidad()
  botonAgregar.onclick = function (){
        let btn = document.querySelector("#boton-pedidos")
        let precioActual = parseFloat(document.querySelector("#price-span-pedidos").textContent.replace("$","")) ;
        console.log("Actual", precioActual)
        let precioModal =parseFloat(botonAgregar.querySelector("#price-span").textContent.replace("$","")) 
        console.log("Modal", precioModal)
        let sumaPrecios = precioActual + precioModal;
        console.log("Suma",sumaPrecios)
        btn.querySelector("#price-span-pedidos").textContent = "$" + sumaPrecios;
        ModalPedidos(document.querySelector("#exampleModalLabel").textContent,/* document.querySelector("#exampleModalImage").src, */price, document.querySelector("#sel1").value, sumaPrecios)
        botonPedidos.classList.remove("not-display")
      }
}

let numeroPedidos= 0;
let index = 0;
function NumeroPedidos (){
    numeroPedidos++;
    console.log("numeroPedidos",numeroPedidos)
}
function agregarItem (title, price, cantidad, total){
  document.querySelector("#exampleModalLabel2").textContent = title;
  document.querySelector("#price-span2").textContent = "$" + total;
  document.querySelector("#sel2").value = cantidad
  botonCantidadPedidos.addEventListener("change", function actualizarTotal (){
    let cantidad = document.querySelector("#sel2").value;
    document.querySelector("#price-span2").innerText ="$" + (cantidad * parseFloat(price.replace("$","")));
  })
}
function agregarMasItems (title, price, cantidad,total){
  console.log("CANTIDAD ASDAS", cantidad)
  let filaPedidos = document.createElement("div");
  filaPedidos.classList.add("modal-new")
  let contenidoFila = `  <div class="modal-header">
  <div>
    <h5 class="modal-title-pedidos" id="exampleModalLabel2">Modal title </h5>
  <span id="price-span2"> $0 </span>
  </div>

 <div class="form-group">
    <select onclick="actualizarCantidadPedidos(event)" class="form-control" id="sel2" name="sellist2">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
    </select>
  </div>
</div>`
  filaPedidos.innerHTML = contenidoFila;
  document.querySelector(".modal-products").appendChild(filaPedidos)
  document.querySelectorAll(".modal-new .modal-title-pedidos")[index].textContent = title
  totalItems = cantidad;
  document.querySelectorAll(".modal-new #price-span2")[index].innerText ="$" + (totalItems * parseFloat(price.replace("$","  ")) )
  document.querySelectorAll(".modal-new #sel2")[index].value = cantidad
  console.log(filaPedidos)
  console.log("index",index)
  index++;
  document.querySelectorAll("#sel2")[index].addEventListener("change", function actualizarTotal (){
    let cantidad = document.querySelectorAll("#sel2")[index].value;
    document.querySelectorAll("#price-span2")[index].innerText ="$" + (cantidad * parseFloat(price.replace("$","")));
  })
}
function borrarItem(price){
  document.querySelector("#boton-pedidos").querySelector("#price-span-pedidos").textContent = "$" + (parseFloat(document.querySelector("#boton-pedidos").querySelector("#price-span-pedidos").textContent.replace("$","")) - parseFloat(price.replace("$", "")))
}

function ModalPedidos (title, price, cantidad, total){
      console.log(parseFloat(cantidad)  * price, "Cantidad Modal")
      let itemsPedido = document.querySelectorAll(".modal-title-pedidos")
      for (let i = 0; i < itemsPedido.length; i++){
          if(itemsPedido[i].textContent == title){
            borrarItem(document.querySelector("#price-span").textContent);
            return alert("Ya lo agregaste a tu pedido")
          }
      }
     if (numeroPedidos === 0){
        agregarItem(title, price, cantidad, total)
     } else if ( numeroPedidos < 2){
       agregarMasItems(title, price, cantidad, total)
    } else if (numeroPedidos >= 2){
      borrarItem(document.querySelector("#price-span").textContent)
       alert("No puedes agregar mas productos")
      return
    } 
    else {
         alert("Algo salió mal")
     }
     NumeroPedidos()
}
function actualizarTotalEstimado (){
  if (numeroPedidos === 1){
    document.querySelector("#total-estimado").textContent = "$" + (parseFloat(document.querySelectorAll("#price-span2")[0].textContent.replace("$", "")))
  } else if (numeroPedidos > 1){
    document.querySelector("#total-estimado").textContent = "$" + (parseFloat(document.querySelectorAll("#price-span2")[0].textContent.replace("$", "")) + parseFloat(document.querySelectorAll("#price-span2")[1].textContent.replace("$", "")))
  }
}
function actualizarTotalBotonPedidos (totalEstimado){
  document.querySelector("#price-span-pedidos").textContent = totalEstimado
}
 function actualizarCantidadPedidos(event){
  let button = event.target;
  button.addEventListener("change", function actualizarTotal (){
    let containerPedido = button.parentElement.parentElement
    let precio = containerPedido.querySelector("#price-span2").innerText 
    let cantidad = button.value;
    console.log(cantidad)
    precio = "$" + (cantidad * parseFloat(precio.replace("$","")) )
    actualizarTotalEstimado()
    actualizarTotalBotonPedidos(document.querySelector("#total-estimado").textContent)
  })

}
botonPedidos.onclick = function(){
  actualizarTotalEstimado()
}
botonContinuar.onclick = function(){
          let formulario1 = document.querySelector("#formulario-1");
          let formulario2 = document.querySelector("#formulario-2");
          let tipoDeEnvio = formulario1.TypeOfDeliveryOption.value;
          let formaDePago = formulario2.TypeOfPaymentyOption.value;
          valid = true;
          event.preventDefault();
          // your validations
          if((formaDePago && tipoDeEnvio) == ""){
              alert("Completa los espacios requeridos.")
              
             valid = false;
             console.log("falso")
          }
          // and so on all your validations
          if(valid){
            let productoUno = document.querySelectorAll("#exampleModalLabel2")[0].textContent
            let precioUno =  document.querySelectorAll("#price-span2")[0].textContent
            let cantidadUno = document.querySelectorAll("#sel2")[0].value
            let total = document.querySelector("#total-estimado").textContent
            if(numeroPedidos === 1){
              let pedido1Item = `*PEDIDO: Eco-Lapacho* %0a%0a— *[ ${cantidadUno} ]* ${productoUno} > *${precioUno}*%0a%0a*Total:* ${total}%0a%0aTipo de envío: *${tipoDeEnvio}*%0aForma de pago: *${formaDePago}*%0a`;
              window.open("https://api.whatsapp.com/send?phone=5493813152876&text=" + pedido1Item);
            } else if (numeroPedidos > 1){
              let productoDos = document.querySelectorAll("#exampleModalLabel2")[1].textContent
              let cantidadDos = document.querySelectorAll("#sel2")[1].value
              let precioDos =  document.querySelectorAll("#price-span2")[1].textContent
              let pedido2Item = `*PEDIDO: Eco-Lapacho* %0a%0a— *[ ${cantidadUno} ]* ${productoUno} > *${precioUno}*%0a— *[ ${cantidadDos} ]* ${productoDos} > *${precioDos}* %0a %0a*Total:* ${total}%0a%0aTipo de envío: *${tipoDeEnvio}*%0aForma de pago: *${formaDePago}*%0a`;
              window.open("https://api.whatsapp.com/send?phone=5493813152876&text=" + pedido2Item);
            }
          }   
}



