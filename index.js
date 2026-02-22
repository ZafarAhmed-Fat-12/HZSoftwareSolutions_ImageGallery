const items = document.querySelectorAll(".item");
const overlay = document.querySelector(".galleryOverlay");
const imgBox = document.querySelector(".imgBox");
const previewImg = imgBox.querySelector("img");
const closeIcon = imgBox.querySelector("span");

const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
let currentIndex ;

function updateNavBtns() {
  if (currentIndex === 0) {
    prevBtn.style.display = "none";
}else{
    prevBtn.style.display = "block";
}
    if (currentIndex === items.length - 1) {
    nextBtn.style.display = "none";
}else{    nextBtn.style.display = "block";
}
}

function changeImage(index) {
  const imgSrc = items[ index].querySelector("img").src;
  previewImg.src = imgSrc;
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

items.forEach((item, index) => {
  item.addEventListener("click", () => {
    openLightbox(index);
  });

  });

  prevBtn.addEventListener("click", showPrevImage);
  nextBtn.addEventListener("click", showNextImage);

closeIcon.addEventListener("click", closeLightbox);
overlay.addEventListener("click", function (e) {
  if (e.target === overlay) {
    closeLightbox();
  }
});

document.addEventListener("keydown", function (e) {
  if(overlay.classList.contains("active")) {
    if(e.key==="ArrowRight") {
      showNextImage();
    } else if(e.key==="ArrowLeft") {
      showPrevImage();
    }else if(e.key==="Escape") {
      closeLightbox();
    }       
}
});

