const works = [
  { file: "001.png", width: 1920, height: 2713 },
  { file: "002.png", width: 1920, height: 2713 },
  { file: "003.png", width: 1920, height: 2718 },
  { file: "004.png", width: 1920, height: 2200 },
  { file: "005.png", width: 1920, height: 2670 },
  { file: "006.png", width: 1920, height: 2429 },
  { file: "007.png", width: 1920, height: 2429 },
  { file: "009.png", width: 1920, height: 3030 },
  { file: "010.png", width: 1920, height: 3030 },
  { file: "011.png", width: 1920, height: 2200 },
  { file: "012.png", width: 1920, height: 1080 },
  { file: "013.png", width: 1920, height: 1080 },
  { file: "014.png", width: 1920, height: 1080 },
  { file: "015.png", width: 1920, height: 1080 },
  { file: "016.png", width: 1920, height: 1080 },
  { file: "017.png", width: 1920, height: 1080 },
  { file: "018.png", width: 1920, height: 1080 },
  { file: "019.png", width: 1920, height: 1080 },
  { file: "020.png", width: 1920, height: 1080 },
  { file: "021.png", width: 1920, height: 1080 },
  { file: "022.png", width: 1920, height: 1080 },
  { file: "023.png", width: 1920, height: 1080 },
  { file: "024.png", width: 1920, height: 1080 },
  { file: "025.png", width: 1920, height: 1080 },
  { file: "026.png", width: 1920, height: 1080 },
  { file: "027.png", width: 1920, height: 4015 },
  { file: "028.png", width: 1920, height: 3800 },
  { file: "029.png", width: 1920, height: 4400 },
  { file: "030.png", width: 1920, height: 3669 },
  { file: "031.png", width: 1920, height: 3096 },
  { file: "032.png", width: 1920, height: 3870 },
  { file: "033.png", width: 1920, height: 1080 }
];

const gallery = document.querySelector("#gallery");
const viewer = document.querySelector("#viewer");
const viewerImage = document.querySelector("#viewer-image");
const viewerCaption = document.querySelector("#viewer-caption");
const closeButton = document.querySelector(".viewer-close");
const prevButton = document.querySelector(".viewer-prev");
const nextButton = document.querySelector(".viewer-next");
let activeIndex = 0;

function labelFor(index) {
  return `作品 ${works[index].file.replace(".png", "")}`;
}

function optimizedSrcSet(item) {
  const name = item.file.replace(".png", "");
  return [
    `assets/optimized/${name}-960.webp 960w`,
    `assets/optimized/${name}-1440.webp 1440w`,
    `assets/optimized/${name}-1920.webp 1920w`
  ].join(", ");
}

function optimizedFullSrc(item) {
  return `assets/optimized/${item.file.replace(".png", "")}-1920.webp`;
}

function openViewer(index) {
  activeIndex = index;
  const item = works[activeIndex];
  viewerImage.src = optimizedFullSrc(item);
  viewerImage.alt = labelFor(activeIndex);
  viewerCaption.textContent = `${labelFor(activeIndex)} / ${activeIndex + 1} of ${works.length}`;
  viewer.showModal();
}

function shiftViewer(direction) {
  const nextIndex = (activeIndex + direction + works.length) % works.length;
  openViewer(nextIndex);
}

works.forEach((item, index) => {
  const card = document.createElement("figure");
  card.className = "work-card";

  const button = document.createElement("button");
  button.className = "work-button";
  button.type = "button";
  button.setAttribute("aria-label", `查看${labelFor(index)}`);
  button.addEventListener("click", () => openViewer(index));

  const picture = document.createElement("picture");
  const source = document.createElement("source");
  source.type = "image/webp";
  source.srcset = optimizedSrcSet(item);
  source.sizes = "(max-width: 620px) 100vw, min(1120px, 90vw)";

  const image = document.createElement("img");
  image.src = `assets/images/${item.file}`;
  image.alt = labelFor(index);
  image.width = item.width;
  image.height = item.height;
  image.loading = index < 2 ? "eager" : "lazy";
  image.decoding = "async";
  if (index === 0) {
    image.fetchPriority = "high";
  }

  const caption = document.createElement("figcaption");
  caption.innerHTML = `<span>${labelFor(index)}</span><span>${index + 1}/${works.length}</span>`;

  picture.append(source, image);
  button.append(picture);
  card.append(button, caption);
  gallery.append(card);
});

closeButton.addEventListener("click", () => viewer.close());
prevButton.addEventListener("click", () => shiftViewer(-1));
nextButton.addEventListener("click", () => shiftViewer(1));

viewer.addEventListener("click", (event) => {
  if (event.target === viewer) {
    viewer.close();
  }
});

window.addEventListener("keydown", (event) => {
  if (!viewer.open) return;
  if (event.key === "ArrowLeft") shiftViewer(-1);
  if (event.key === "ArrowRight") shiftViewer(1);
});
