//Funtion pour signaler un produit dans le panier
function panierIcone (){
  let actualProducts = JSON.parse(localStorage.getItem("panier"))
  let total = 0;
  actualProducts.forEach(Element =>{
    total += Element.quantity++
  })
  document.getElementById("panierIcone").innerHTML = total;
}

