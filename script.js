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

const image = document.querySelector("#work-image");
const title = document.querySelector("#work-title");
const count = document.querySelector("#work-count");
const prevLink = document.querySelector("#prev-link");
const nextLink = document.querySelector("#next-link");

function labelFor(index) {
  return `作品 ${works[index].file.replace(".png", "")}`;
}

function hrefFor(index) {
  const params = new URLSearchParams(window.location.search);
  params.set("work", works[index].file.replace(".png", ""));
  return `?${params.toString()}`;
}

function getCurrentIndex() {
  const params = new URLSearchParams(window.location.search);
  const requested = params.get("work");
  const index = works.findIndex((item) => item.file.replace(".png", "") === requested);
  return index >= 0 ? index : 0;
}

function setPager(link, index) {
  if (index < 0 || index >= works.length) {
    link.classList.add("is-disabled");
    link.removeAttribute("href");
    return;
  }

  link.classList.remove("is-disabled");
  link.href = hrefFor(index);
}

function render() {
  const index = getCurrentIndex();
  const item = works[index];
  image.src = `assets/images/${item.file}`;
  image.alt = labelFor(index);
  image.width = item.width;
  image.height = item.height;
  title.textContent = labelFor(index);
  count.textContent = `${index + 1} / ${works.length}`;
  setPager(prevLink, index - 1);
  setPager(nextLink, index + 1);
}

window.addEventListener("keydown", (event) => {
  const index = getCurrentIndex();
  if (event.key === "ArrowLeft" && index > 0) {
    window.location.href = hrefFor(index - 1);
  }
  if (event.key === "ArrowRight" && index < works.length - 1) {
    window.location.href = hrefFor(index + 1);
  }
});

render();
