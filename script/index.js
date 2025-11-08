function loadCategories() {
    // console.log("category is loading");

    //1- fetch the data 
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        //2- convert promise to json
        .then((res) => res.json())
        //3- send data to display 
        .then((data) => displayCategories(data.categories));
}

function loadVideos() {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
        .then((response) => response.json())
        .then((data) => displayVideos(data.videos));
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

const displayVideos = (videos) => {
    // console.log(videos);
    const videoContainer = document.getElementById("video-container")
    videos.forEach(video => {
        // console.log(video);
        const videoCard = document.createElement("div");

        videoCard.innerHTML = `
         <div class="card bg-base-100 ">
            <figure class="relative">
                <img class="w-full h-[200px] object-cover" src="${video.thumbnail}" alt="Shoes" />
                <span class="absolute bottom-2 right-2 text-white bg-black text-sm px-2 rounded">3hrs 56 min ago</span>
            </figure>
            <div class=" flex gap-3 px-0 py-5">
                <div class="profile">
                    <div class="avatar">
                        <div class="ring-primary ring-offset-base-100 w-[40px] rounded-full">
                            <img src="${video.authors[0].profile_picture}" />
                        </div>
                    </div>
                </div>
                <div class="intro">
                    <h2 class="text-sm font-semibold mb-[10px]">Midnight Serenade</h2>
                    <p class="text-sm text-gray-400 flex gap-1 mb-[10px]">${video.authors[0].profile_name} <img class="w-5 h-5" src="https://img.icons8.com/?size=32&id=6xO3fnY41hu2&format=png" alt=""></p>

                    <p class="text-sm text-gray-400">${video.others.views}</p>
                </div>
            </div>
        </div>
        `
        videoContainer.append(videoCard);
    });
};

loadCategories();
loadVideos();