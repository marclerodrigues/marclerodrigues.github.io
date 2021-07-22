const getCssBackgroundColor = (color) => {
  return `linear-gradient(45deg,var(--${color}),var(--light-${color}))`;
};

const updateElementsColor = () => {
  const colorSelected = document.querySelector(".colors__item--selected");
  const sizeSelected = document.querySelector(".sizes__item--selected");
  const currentColor = colorSelected.dataset.color;
  const currentSize = sizeSelected.dataset.size;
  const currentImage = document.querySelector(".shoes.active");
  const newImage = document.querySelector(`.shoes[data-color=${currentColor}`);

  currentImage.classList.remove("active");
  newImage.classList.add("active");

  const elementsWithColor = document.querySelectorAll(".selected-color");
  const sizes = document.querySelectorAll(".sizes__item");
  const lightColors = ["blue", "black", "green"];
  const banner = document.querySelector(".banner");
  const belowBanner = document.querySelector(".below-banner");
  const shareIcon = document.querySelector(".share__icon");
  const cssColor = lightColors.includes(currentColor)
    ? `var(--light-${currentColor})`
    : `var(--${currentColor})`;

  sizes.forEach((element) =>
    element.style.setProperty("background-color", "var(--alto)")
  );
  elementsWithColor.forEach((element) =>
    element.style.setProperty("background-color", cssColor)
  );

  banner.style.setProperty(
    "background-image",
    getCssBackgroundColor(currentColor)
  );

  if (!banner.classList.contains(currentColor)) {
    banner.classList.add("change-color-animation");
    banner.style.animation = "none";
    banner.offsetHeight;
    banner.style.animation = null;
  }

  belowBanner.style.setProperty(
    "background-image",
    getCssBackgroundColor(currentColor)
  );

  shareIcon.style.setProperty("fill", cssColor);

  updateHistory(currentColor, currentSize);
};

const updateHistory = (color, size) => {
  const search = new URLSearchParams();

  search.append("color", color);
  search.append("size", size);

  const url = `${window.location.pathname}?${search.toString()}`;

  history.pushState("new-page", document.title, url);
};

const selectColor = (element) => {
  const selectedString = "colors__item--selected";
  const colorSelected = document.querySelector(`.${selectedString}`);

  if (colorSelected === element) {
    return;
  }

  colorSelected.classList.remove(selectedString);

  element.classList.add(selectedString);

  updateElementsColor();
};

const selectSize = (element) => {
  const itemSelected = "sizes__item--selected";
  const controlClass = "selected-color";
  const item = document.querySelector(`.${itemSelected}`);

  if (item === element) {
    return;
  }

  item.classList.remove(itemSelected, controlClass);
  element.classList.add(itemSelected, controlClass);

  updateElementsColor();
};

const share = () => {
  const input = document.createElement("input");

  document.body.appendChild(input);

  input.value = window.location.href;

  input.focus();
  input.select();

  document.execCommand("copy");

  console.log("copied ", input.value);
  document.body.removeChild(input);
};

const selectFirstOptions = () => {
  const search = new URLSearchParams(window.location.search);

  for (let entry of search) {
    const [key, value] = entry;

    if (key === "color") {
      const color = document.querySelector(
        `.colors__item[data-color=${value}]`
      );
      selectColor(color);
    }

    if (key === "size") {
      const size = document.querySelector(`.sizes__item[data-size="${value}"]`);
      selectSize(size);
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  selectFirstOptions();
});

window.onpopstate = () => {
  selectFirstOptions();
};
