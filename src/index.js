const gallery = document.querySelector(".gallery");
const overlay = document.querySelector(".galleryOverlay");
const imgBox = document.querySelector(".imgBox");
const closeIcon = document.querySelector(".closeIcon");
const previewImg = imgBox.querySelector("img");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const loaderOverlay = document.querySelector(".loader-overlay");
const filterButtons = document.querySelectorAll(".filter-btn");
const imgLoader = document.querySelector(".img-loader");

let items = [];
let allFetchedImages = [];
let currentIndex;

const apiKey = "uQ9VRuXQj4pTW3uO4cfBc8Pu5G8IA1aES37F0QxvzMYi7F2gpcJfjWwI";

async function fetchData(query = "curated") {
  loaderOverlay.classList.remove("hidden");
  gallery.innerHTML = "";

  let url;
  if (query === "curated") {
    url = "https://api.pexels.com/v1/curated?per_page=100 ";
  } else {
    url = `https://api.pexels.com/v1/search?query=${query}&per_page=100`;
  }

  if (apiKey === "YOUR_PEXELS_API_KEY") {
    gallery.innerHTML = "<p>ERROR: Please add your Pexels API key </p>";
    loaderOverlay.classList.add("hidden");
    return;
  }

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    allFetchedImages = data.photos;

    renderGallery(allFetchedImages);
    loaderOverlay.classList.add("hidden");
  } catch (error) {
    console.error("Error fetching data from Pexels:", error);
    gallery.innerHTML =
      "<p>Could not load images. Please check your API key or network connection.</p>";
    loaderOverlay.classList.add("hidden");
  }
}

function renderGallery(imagesToRender) {
  gallery.innerHTML = "";
  imagesToRender.forEach((imageData) => {
    const item = document.createElement("div");
    item.classList.add("item");
    item.innerHTML = `
      <img src="${imageData.src.large}" alt="${imageData.photographer}" />
      <div class="text">${imageData.photographer}</div>
    `;
    gallery.appendChild(item);
  });

  items = document.querySelectorAll(".item");
  items.forEach((item) => {
    item.addEventListener("click", () => {
      const imageSrc = item.querySelector("img").src;
      const originalIndex = allFetchedImages.findIndex(
        (img) => img.src.large === imageSrc,
      );
      if (originalIndex !== -1) {
        openLightbox(originalIndex);
      }
    });
  });
}

function setupEventListeners() {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelector(".filter-btn.active").classList.remove("active");
      button.classList.add("active");

      const category = button.dataset.category;

      if (category === "all") {
        fetchData("curated");
      } else {
        fetchData(category);
      }
    });
  });

  prevBtn.addEventListener("click", showPrevImage);
  nextBtn.addEventListener("click", showNextImage);
  closeIcon.addEventListener("click", closeLightbox);
  document.addEventListener("keydown", function (e) {
    if (!overlay.classList.contains("active")) return;
    if (e.key === "ArrowRight") showNextImage();
    if (e.key === "ArrowLeft") showPrevImage();
    if (e.key === "Escape") closeLightbox();
  });
}

function updateNavBtns() {
  prevBtn.style.display = currentIndex === 0 ? "none" : "block";
  nextBtn.style.display =
    currentIndex === allFetchedImages.length - 1 ? "none" : "block";
}

function changeImage(index) {
  const imgSrc = allFetchedImages[index].src.original;
  previewImg.src = imgSrc;
  currentIndex = index;
  updateNavBtns();
}

function openLightbox(index) {
  overlay.classList.add("active");
  document.body.classList.add("no-scroll");
  changeImage(index);
}

function closeLightbox() {
  overlay.classList.remove("active");
  document.body.classList.remove("no-scroll");
}

function showNextImage() {
  if (currentIndex < allFetchedImages.length - 1) {
    changeImage(currentIndex + 1);
  }
}

function showPrevImage() {
  if (currentIndex > 0) {
    changeImage(currentIndex - 1);
  }
}

setupEventListeners();
fetchData("curated");
