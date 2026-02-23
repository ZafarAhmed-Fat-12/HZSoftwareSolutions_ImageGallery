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

async function fetchData() {
  try {
    console.log(" startingFetching data...");
    const response = await fetch("https://picsum.photos/v2/list?limit=100");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const images = await response.json();
    gallery.innerHTML = "";

    images.forEach((ImageData, index) => {
      const item = document.createElement("div");
      item.classList.add("item");
      item.setAttribute("data-id", ImageData.id);
      item.innerHTML = `
          <img src="https://picsum.photos/id/${ImageData.id}/300/200" alt="image by ${ImageData.author}" />
      <div class="text">Image ${index + 1}</div> `;
      gallery.appendChild(item);
    });
    setupEventListeners();
    loaderOverlay.classList.add("hidden");
  } catch (error) {
    console.error("Error fetching data:", error);
    gallery.innerHTML = "<p>Could not load images. Please try again later.</p>";

    loaderOverlay.classList.add("hidden");
  }
}

function setupEventListeners() {
  items = document.querySelectorAll(".item");

  items.forEach((item, index) => {
    item.addEventListener("click", () => {
      openLightbox(index);
    });
  });

  prevBtn.addEventListener("click", showPrevImage);
  nextBtn.addEventListener("click", showNextImage);
  closeIcon.addEventListener("click", closeLightbox);

  document.addEventListener("keydown", function (e) {
    if (!overlay.classList.contains("active")) {
      return;
    }
    if (e.key === "ArrowRight") showNextImage();
    if (e.key === "ArrowLeft") showPrevImage();
    if (e.key === "Escape") closeLightbox();
  });
}

function updateNavBtns() {
  if (currentIndex === 0) {
    prevBtn.style.display = "none";
  } else {
    prevBtn.style.display = "block";
  }
  if (currentIndex === items.length - 1) {
    nextBtn.style.display = "none";
  } else {
    nextBtn.style.display = "block";
  }
}

function changeImage(index) {
  const imgId = items[index].getAttribute("data-id");
  previewImg.src = `https://picsum.photos/id/${imgId}/800/600`;
  currentIndex = index;
  updateNavBtns();
}

function openLightbox(index) {
  changeImage(index);
  overlay.classList.add("active");
}

function closeLightbox() {
  overlay.classList.remove("active");
}

function showNextImage() {
  if (currentIndex < items.length - 1) {
    const index = currentIndex + 1;
    changeImage(index);
  }
}

function showPrevImage() {
  if (currentIndex > 0) {
    const index = currentIndex - 1;
    changeImage(index);
  }
}

fetchData();
