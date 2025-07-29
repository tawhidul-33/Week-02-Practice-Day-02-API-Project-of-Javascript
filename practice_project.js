
const search_box = document.getElementById("search-button");
search_box.addEventListener("click", () => {
    food_manu();
});


const food_manu = () => {
    const search_button = document.getElementById("search-box").value;
    const mainContainer = document.getElementById("main-container");
    mainContainer.innerHTML = "";

    if (search_button === "") {//jodi faka search diya hoy
        mainContainer.innerHTML = `<h2>Please type something to search</h2>`;
        alert("seaech box empty")
        return; // stop function here
    }

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search_button}`)
        .then(res => res.json())
        .then(product => {
            if (product.meals) {
                product.meals.forEach(data => {
                    const div = document.createElement("div");
                    div.classList.add("cart");
                    div.innerHTML = `
                    <img src="${data.strMealThumb}" alt="...img not found">
                    <h3>${data.strMeal.slice(0,20)}</h3>

                 `;
                 //for details clicl on card 
                 div.addEventListener("click", () => {
                    showDetails_forSingleCart(data.idMeal);
                 });

                 mainContainer.appendChild(div)
                })   
            } else {
                mainContainer.innerHTML = `<h1><strong>food not found</strong></h1>`
            }

        }).catch(err => {
            mainContainer.innerHTML = `<p>Something went wrong</p>`;
    })
    document.getElementById("search-box").value="";
};

//showdetails
showDetails_forSingleCart=(id)=>{
   fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
   .then(Response=> Response.json())
   .then(products=>{
    const modalBody=document.getElementById("modal-body");
                   const product = products.meals[0]; // ekta meal pabe
                    modalBody.innerHTML = `
                    <img class="dimg" src="${product.strMealThumb}" alt="...img not found">
                    <h2>${product.strMeal}</h2>
                    <h6>Ingredient</h6>
                    <ul>
                        <li>${product.strIngredient1}</li>
                        <li>${product.strIngredient2}</li>
                        <li>${product.strIngredient3}</li>
                        <li>${product.strIngredient4}</li>
                        <li>${product.strIngredient5}</li>
                    </ul>
                    
                    `;
            // show modal (optional, if you're using bootstrap modal)
            
            const productModal = new bootstrap.Modal(document.getElementById('modal'));
            productModal.show();

   })
};
