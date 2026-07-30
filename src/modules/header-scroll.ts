import { closeCatalog } from "./catalog-menu";

export const initHeaderScroll = () => {
  const header = document.querySelector<HTMLElement>(".header");
  const headerTop = document.querySelector<HTMLElement>(".header__top");

  if (!header || !headerTop) return;

  const setTopHeight = () => {
    header.style.setProperty(
      "--header-top-height",
      `${headerTop.offsetHeight}px`,
    );
  };

  setTopHeight();

  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY > headerTop.offsetHeight) {
        if (!header.classList.contains("is-scrolled")) {
          header.classList.add("is-scrolled");
          closeCatalog();
        }
      } else if (window.scrollY <= 0) {
        header.classList.remove("is-scrolled");
        setTopHeight();
      }
    },
    { passive: true },
  );

  window.addEventListener("resize", setTopHeight);
};
