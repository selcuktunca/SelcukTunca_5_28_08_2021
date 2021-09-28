//Recup du panier dans le local storage
let storageProducts = JSON.parse(localStorage.getItem("panier")) ? JSON.parse(localStorage.getItem("panier")) : [];

//Emplacement du Html
let storageTab = document.getElementById("storageTab");

let storageContent = document.getElementById("storageContent");

//Si il y a un produit dans le panier le message emptyStorage disparait
if (storageProducts.length > 0) {
document.getElementById("emptyStorage").classList.add("undisplay-element");
panierIcone()
}

//Calcul du montant total / envoie au local storage
function totalDuPanier (){
  let totalElements = [...document.getElementsByClassName("productTotal")];
  let totalPrice = 0;
  
  totalElements.forEach((element)=>{
  totalPrice += parseInt(element.innerHTML)
  })
  
  document.getElementById("totalPanier").innerHTML=totalPrice + " €";
  localStorage.setItem("prixTotal", totalPrice)

  panierIcone()
}
//Funtion pour signaler un produit dans le panier
function panierIcone (){
  let actualProducts = JSON.parse(localStorage.getItem("panier"))
  document.getElementById("panierIcone").innerHTML = actualProducts.length;

}

//Boucle sur le panier affichage des information dans le html
storageProducts.forEach((product, i) => {

  storageTab.insertAdjacentHTML("beforeend",  ` 
    <tr id="trFor${product.name}"> <td>${product.name}</td>
    <td><input type = "number" value = ${product.quantity} min=0 max=10 id="quantity${product.name}"></td>
    <td>${product.price / 100}€</td>
    <td id="productTotal${product.name}" class="productTotal">${product.quantity * product.price / 100}€</td>
    <td><button id="delete${product.name}">supprimer</button></td></tr>
    `)
  
//Gestion des quantités
    document.getElementById("quantity"+product.name).addEventListener("change", (e)=>{
      let value = e.target.value;
    
      document.getElementById(`productTotal${product.name}`).innerHTML = value * product.price / 100;
     
      let actualProducts = JSON.parse(localStorage.getItem("panier"));

      actualProducts.forEach(element => {
        if(element.name == product.name){
          element.quantity = value
           
    }})
        
    localStorage.setItem("panier", JSON.stringify(actualProducts))
    storageProducts = actualProducts
        
    totalDuPanier();
   
    })
    
//Supprimer un produit du panier
    document.getElementById("delete"+product.name).addEventListener("click" , (e)=>{
      let actualProducts = JSON.parse(localStorage.getItem("panier"));
      actualProducts = actualProducts.filter(item => item.name !== product.name);
      console.log(actualProducts)
      localStorage.setItem("panier", JSON.stringify(actualProducts))
      storageProducts = actualProducts
      document.getElementById("trFor"+product.name).remove()
      totalDuPanier()
    })

});
 
 totalDuPanier();

//___________
//vider le panier
let viderPanier = document.getElementById('viderPanier')
viderPanier.addEventListener('click', supprimerPanier);

//FONCTION SUPPRIME TOUT LE PANIER
function supprimerPanier() {
  
    storageContent.innerHTML = "";
    localStorage.clear();
    console.log("suprimer")
  
};

//gestion du formulaire
function sendOrder() {
    let form = document.getElementById("form");
    if (form.reportValidity() == true && storageProducts.length>0) {
      let contact = {
        'firstName': document.getElementById("nom").value,
        'lastName': document.getElementById("prenom").value,
        'address': document.getElementById("adresse").value,
        'city': document.getElementById("ville").value,
        'email': document.getElementById("email").value
      };
   
      let products = []
      storageProducts.forEach((item) =>{
        products.push(item.id)
      });
      
      let formulaireClient = JSON.stringify({
        contact,
        products,
      });
  
// APEL API AVEC FETCH // ENVOIE DES DONNEES AVEC POST 
      fetch('http://localhost:3000/api/teddies/order', {
        method: 'POST',
        headers: {
          'content-type': "application/json"
        },
        mode: "cors",
        body: formulaireClient
        })
        .then(function (response) {
          return response.json()
        })
        .then(function (r) {
          console.log(r)
          sessionStorage.setItem("contact", JSON.stringify(r.contact));
          localStorage.removeItem("panier")
          window.location.assign("confirmation.html?orderId=" + r.orderId);
        })
//SI PROBLEME API
        .catch(function (err) {
          console.log("fetch Error");
        });
    }
    else{
      alert(" Une erreur est survenue votre panier est  peux étre vide ou le formulaire n'a pas été correctement rempli!")
    };
  }
  
  let envoiFormulaire = document.getElementById("envoiFormulaire");
  
  envoiFormulaire.addEventListener('click', function (event) {
    event.preventDefault();
    sendOrder();
  });