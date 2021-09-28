function panierIcone (){
    let actualProducts = JSON.parse(localStorage.getItem("panier"))
    document.getElementById("panierIcone").innerHTML = actualProducts.length;
  
  }