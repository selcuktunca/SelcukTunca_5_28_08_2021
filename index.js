const itemParent = document.getElementById("itemParent");

async function getItems(){
    try {
        const request = await fetch("http://localhost:3000/api/teddies")
        const itemList = await request.json()
        console.log(itemList)
        addItemsInDom(itemList)
    } catch (error) {
        console.log(error);
    }
};
function addItemsInDom(arrayItems){
    if (Array.isArray(arrayItems) || arrayItems.length < 1){
        arrayItems.forEach(item => {
            const htmlElement = ` 
            <div class="container-fluid id="itemParent"">   
                <div class="row justify-content-center item-list__item">
                    <div class="col-12 col-sm-6 item-list__figure">
                        <div class="card">
                            <img src="${item.imageUrl}" class="card-img-top item-list__img " alt="...">
                            <div class="card-body">
                            <h3 class="item-list__heading">${item.name}</h3>
                            </div>
                            <a class="item-list__button" href="./produit.html?id=${item._id}">Voir Produit</a>
                        </div>
                    </div>
                </div>
            </div> 
             `;
        itemParent.insertAdjacentHTML("beforeend", htmlElement)
        });
    }
}
window.onload = getItems();

