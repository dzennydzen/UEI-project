import { initCatalogMenu } from "./modules/catalog-menu";
import { initMobileMenu } from "./modules/mobile-menu";
import { initHeaderScroll } from "./modules/header-scroll";
import { initModals } from "./modules/modals";

const init = () => {
  initCatalogMenu();
  initMobileMenu();
  initHeaderScroll();
  initModals();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
