const sumbitButton = document.getElementById("submit");
const imagesContainer = document.getElementById("images-container");

const allButton = document.getElementById("all");
const watchedButton = document.getElementById("watched");
const unwatchedButton = document.getElementById("unwatched");

const data = [];

allButton.addEventListener("click", showAllItems);
watchedButton.addEventListener("click", showWatchedItems);
unwatchedButton.addEventListener("click", showUnwatchedItems);

function removeItemsOfImagesContainer() {
  while (imagesContainer.firstChild) {
    imagesContainer.removeChild(imagesContainer.firstChild);
  }
}

function showAllItems(e) {
  e.target.className = "activeTab";
  watchedButton.classList.remove("activeTab");
  unwatchedButton.classList.remove("activeTab");

  const items = data.map((item) => {
    return createImageContainer(item.title, item.url, item.isWatched);
  });
  removeItemsOfImagesContainer();
  imagesContainer.append(...items);
}

function showWatchedItems(e) {
  if (e) {
    e.target.className = "activeTab";
    allButton.classList.remove("activeTab");
    unwatchedButton.classList.remove("activeTab");
  }

  const watchedData = data.filter((item) => item.isWatched === true);
  const items = watchedData.map((item) => {
    return createImageContainer(item.title, item.url, item.isWatched);
  });
  removeItemsOfImagesContainer();
  imagesContainer.append(...items);
}
function showUnwatchedItems(e) {
  if (e) {
    e.target.className = "activeTab";
    allButton.classList.remove("activeTab");
    watchedButton.classList.remove("activeTab");

  }
  const unwatchedData = data.filter((item) => item.isWatched === false);
  const items = unwatchedData.map((item) => {
    return createImageContainer(item.title, item.url, item.isWatched);
  });
  removeItemsOfImagesContainer();
  imagesContainer.append(...items);
}

function createImageContainer(title, url, checked) {
  const imageContainer = document.createElement("div");
  imageContainer.className = "image-container";

  const headingContainer = document.createElement("div");
  headingContainer.className = "heading-container";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = checked;
  checkbox.addEventListener("change", (e) => {
    const clickedItemTitle = e.target.parentNode.childNodes[1].textContent;
    const value = e.target.checked;

    const idx = data.findIndex((item) => item.title === clickedItemTitle);
    data[idx].isWatched = value;

    if (watchedButton.classList.contains("activeTab")) {
      showWatchedItems();
    }
  });

  const heading = document.createElement("h1");
  heading.innerText = title;
  heading.className = "heading";

  headingContainer.append(checkbox, heading);

  const image = document.createElement("img");
  image.src = url;
  image.className = "image";

  imageContainer.append(headingContainer, image);

  return imageContainer;
}

sumbitButton.addEventListener("click", (e) => {
  const titleTag = document.getElementById("title");
  const title = titleTag.value;

  const urlTag = document.getElementById("image");
  const url = urlTag.value;

  if (title === "" || url === "") return;

  const item = {
    title: title,
    url: url,
    isWatched: false,
  };
  data.unshift(item);

  const imageContainer = createImageContainer(title, url);

  imagesContainer.prepend(imageContainer);

  titleTag.value = "";
  urlTag.value = "";
});
