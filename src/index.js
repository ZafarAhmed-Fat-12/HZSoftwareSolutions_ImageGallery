const filterButtons = document.querySelectorAll(".filter-btn");
const gallery = document.querySelector(".gallery");
const loaderOverlay = document.querySelector(".loader-overlay");
const overlay = document.querySelector(".galleryOverlay");
const imgBox = document.querySelector(".imgBox");
const closeIcon = document.querySelector(".closeIcon");
const previewImg = imgBox.querySelector("img");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

let currentIndex;
let items = [];
let allFetchedImages = [];

async function fetchData() {
  try {
    // The extra, nested function has been removed from here.
    const response = await fetch("https://picsum.photos/v2/list?limit=100");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const images = await response.json();

    const categories = ["nature", "city", "people", "abstract"];
    allFetchedImages = images.map((img, index) => {
      img.category = categories[index % categories.length];
      return img;
    });

    renderGallery(allFetchedImages);
    setupFilterListeners();
    loaderOverlay.classList.add("hidden");
  } catch (error) {
    console.error("Error fetching data:", error);
    gallery.innerHTML = "<p>Could not load images. Please try again later.</p>";
    loaderOverlay.classList.add("hidden");
  }
}

function renderGallery(imagesToRender) {
  gallery.innerHTML = "";
  imagesToRender.forEach((imageData) => {
    const item = document.createElement("div");
    item.classList.add("item");
    item.dataset.category = imageData.category;
    item.innerHTML = `
      <img src="${imageData.download_url}" alt="${imageData.author}" />
      <div class="text">${imageData.author}</div>
    `;
    gallery.appendChild(item);
  });

  items = document.querySelectorAll(".item");
  items.forEach((item) => {
    item.addEventListener("click", () => {
      const imageSrc = item.querySelector("img").src;
      const originalIndex = allFetchedImages.findIndex(
        (img) => img.download_url === imageSrc,
      );
      if (originalIndex !== -1) {
        openLightbox(originalIndex);
      }
    });
  });
}

function setupFilterListeners() {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelector(".filter-btn.active").classList.remove("active");
      button.classList.add("active");

      const category = button.dataset.category;

      if (category === "all") {
        renderGallery(allFetchedImages);
      } else {
        const filteredImages = allFetchedImages.filter(
          (img) => img.category === category,
        );
        renderGallery(filteredImages);
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
  const imgSrc = allFetchedImages[index].download_url;
  previewImg.src = imgSrc;
  currentIndex = index;
  updateNavBtns();
}

function openLightbox(index) {
  changeImage(index);
  overlay.classList.add("active");
  document.body.classList.add("no-scroll");
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

fetchData();
