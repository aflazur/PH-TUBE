const showLoader = () => {
    document.getElementById("loader").classList.remove("hidden");
    document.getElementById("video-container").classList.add("hidden");
};
const hideLoader = () => {
    document.getElementById("loader").classList.add("hidden");
    document.getElementById("video-container").classList.remove("hidden");
};

function removeActiveClass() {
    const activeButtons = document.getElementsByClassName("active");
    for (let btn of activeButtons) {
        btn.classList.remove("active");
    }
}

function loadCategories() {
    showLoader();
    // console.log("category is loading");

    //1- fetch the data 
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        //2- convert promise to json
        .then((res) => res.json())
        //3- send data to display 
        .then((data) => displayCategories(data.categories));
}

function loadVideos(searchText = "") {
    showLoader();
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then((response) => response.json())
        .then((data) => {
            removeActiveClass();
            document.getElementById("btn-all").classList.add("active")
            displayVideos(data.videos)
        });
}

const loadCategoryVideos = (id) => {
    showLoader();
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActiveClass();
            const clickedButton = document.getElementById(`btn-${id}`);
            // console.log(clickedButton);
            clickedButton.classList.add("active");
            displayVideos(data.category)

        })

}

const loadVideoDetails = (videoId) => {
    // console.log(videoId);
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`

    fetch(url)
        .then(res => res.json())
        .then(data => displayVideoDetails(data.video))
};

const displayVideoDetails = (video) => {
    document.getElementById("video_details").showModal();
    const detailsContainer = document.getElementById("details-container");
    detailsContainer.innerHTML =
        `
    <div class="card bg-base-100 image-full w-full shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>Description : ${video.description}</p>
    <div class="card-actions justify-end">
    
    </div>
  </div>
</div>
    `
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
         <button id = "btn-${cat.category_id}" onclick = "loadCategoryVideos (${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `
        // step - 4 : Append the Element 
        categoryContainer.append(categoryDiv);
    }
    hideLoader();
}

const displayVideos = (videos) => {
    // console.log(videos);
    const videoContainer = document.getElementById("video-container");

    videoContainer.innerHTML = "";
    if (videos.length == 0) {
        videoContainer.innerHTML = `
        <div class="col-span-full flex flex-col justify-center items-center text-center py-[200px]">
            <img class="w-[140px]" src="assets/Icon.png" alt="">
            <h2 class="text-2xl font-bold ">Oops!! Sorry, There is no <br> content here</h2>
        </div>
`
        hideLoader();
        return;
    }

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
                    <h2 class="text-sm font-semibold mb-[10px]">${video.title}</h2>
                    <p class="text-sm text-gray-400 flex gap-1 mb-[10px]">${video.authors[0].profile_name} 
                    ${video.authors[0].verified == true ? ` <img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt="">` : `<img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=18803&format=png" alt="">`}
                    </p>

                    <p class="text-sm text-gray-400">${video.others.views}</p>
                </div>
            </div>
            <button onclick = loadVideoDetails('${video.video_id}') class="btn btn-block">Show Details</button>
        </div>
        `
        videoContainer.append(videoCard);
    });
    hideLoader();
};

document.getElementById("search-input").addEventListener("keyup", (event) => {
    const input = event.target.value;
    // console.log(input);
    loadVideos(input);
})

loadCategories();
// loadVideos();