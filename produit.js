
//Récuperation de l'id produit
let id = new URL(document.location).searchParams.get("id");

//Modification de l'adresse d'appel API
const newUrl = `http://localhost:3000/api/teddies/${id}`

class Product {
  constructor(id, name, price, quantity, imgurl) {
    this.id = id;
    this.name = name;
    this.price = +price;
    this.quantity = +quantity;
    this.imgurl = imgurl;

  }
};

fetch(newUrl)
  .then((response) => response.json())
  .then((data) => {
    product = new Product(data._id, data.name, data.price, 1, data.imageUrl);
    addCard(data);
  });
console.log(newUrl);

//Création de la card de la page produit
function addCard(product) {
console.log(product) 
  
// information card produit
  const selectionProductImage = document.getElementById("productImage");
  selectionProductImage.innerHTML += `
  <img src="${product.imageUrl}" class="img-fluid img-thumbnail" alt="${product.name}">
  `;
  const selectionProductName = document.getElementById("productName");
  selectionProductName.innerHTML += `
  <h5 class="card-title">${product.name}</h5>
  `;
  const selectionProductPrice = document.getElementById("productPrice");
  selectionProductPrice.innerHTML += `
   <h5 class="card-title">${changePrice(product.price)}</h5>`
    ;

  const selectionProductDescription = document.getElementById("productDescription");
  selectionProductDescription.innerHTML += `
        <p class="card-text">${product.description}</p>
        `;

  const displayItemOptions = document.querySelector("#itemOptions");
  product.colors.forEach((itemOption) => {
    let addOption = `<option class="item__desc__options__selector__selection" value="${itemOption}">${itemOption}</option`;
    displayItemOptions.insertAdjacentHTML("beforeend", addOption);
  });

  panierIcone()
};

// Function pour convertir le prix
function changePrice(productPrice) {
  let price = `${productPrice}`;
  price = Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(price / 100);
  return price;
};

const addToBasket = document.getElementById("addProduit");
//Ajouter un produit au panier
addToBasket.addEventListener("click", ()=> {
  
  let storageProducts = JSON.parse(localStorage.getItem("panier"));
  
  let addProduct = {
    imgurl: product.imgurl,
    name: product.name,
    price: product.price,
    quantity: product.quantity,
    id: product.id 
    };
  
  if (!storageProducts || storageProducts.length < 1 ) {

  storageProducts = [];
    
  storageProducts.push(addProduct);
  

  } else {
    let productFound = false;

    storageProducts.forEach(element => {
    if(element.name == addProduct.name){
      element.quantity++
      productFound = true
  
    }
  
  });

    if (!productFound) {
      storageProducts.push(addProduct)
      
    } 
  };


  localStorage.setItem("panier", JSON.stringify(storageProducts));
  
})


