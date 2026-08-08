import { closeCatalog } from "./catalog-menu";

export function initHeaderScroll() {
  const header = document.querySelector<HTMLElement>(".header");
  const headerTop = document.querySelector<HTMLElement>(".header__top");

  if (!header || !headerTop) return;

  const headerElem = header;
  const headerTopElem = headerTop;

  function setTopHeight() {
    headerElem.style.setProperty(
      "--header-top-height",
      `${headerTopElem.offsetHeight}px`,
    );
  }

  setTopHeight();

  window.addEventListener("scroll", () => {
    if (window.scrollY > headerTopElem.offsetHeight) {
      if (!headerElem.classList.contains("is-scrolled")) {
        headerElem.classList.add("is-scrolled");
        closeCatalog();
      }
    } else {
      headerElem.classList.remove("is-scrolled");
    }
  });

  window.addEventListener("resize", setTopHeight);
}
