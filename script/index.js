function loadCategories() {
    // console.log("category is loading");

    //1- fetch the data 
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        //2- convert promise to json
        .then((res) => res.json())
        //3- send data to display 
        .then((data) => displayCategories(data.categories));
}

function displayCategories(categories) {
    // console.log(categories);

    // step - 1 : get the container 
    const categoryContainer = document.getElementById("category-container");

    // step - 2 : Loop operation on array of object
    for (let cat of categories) {
        // console.log(cat);

        // step - 3 : Create the Element 
        const categoryDiv = document.createElement("div");

        categoryDiv.innerHTML = `
         <button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `
        // step - 4 : Append the Element 
        categoryContainer.append(categoryDiv);
    }

}

loadCategories();