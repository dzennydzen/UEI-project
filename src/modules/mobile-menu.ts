import { closeCatalog } from "./catalog-menu";

let burger: HTMLButtonElement | null = null;
let mobileMenu: HTMLElement | null = null;
let mobileMenuClose: HTMLButtonElement | null = null;
let overlay: HTMLElement | null = null;
let mobileCatalogToggle: HTMLButtonElement | null = null;
let mobileCatalog: HTMLElement | null = null;
let mobileLabButtons: NodeListOf<HTMLButtonElement> | null = null;

const closeMobileLabs = () => {
  mobileLabButtons?.forEach((btn) => {
    btn.setAttribute("aria-expanded", "false");
    const panel = document.querySelector<HTMLElement>(
      `#mobile-panel-${btn.dataset.panel}`,
    );
    panel?.setAttribute("hidden", "");
  });
};

const closeMobileCatalog = () => {
  mobileCatalogToggle?.setAttribute("aria-expanded", "false");
  mobileCatalog?.setAttribute("hidden", "");
  closeMobileLabs();
};

const closeMobileMenu = () => {
  burger?.setAttribute("aria-expanded", "false");
  burger?.setAttribute("aria-label", "Открыть меню");
  mobileMenu?.classList.remove("is-open");
  mobileMenu?.setAttribute("aria-hidden", "true");
  document.body.classList.remove("is-menu-open");
  if (!document.body.classList.contains("is-modal-open")) {
    overlay?.classList.remove("is-active");
  }
  closeMobileCatalog();
};

export { closeMobileMenu };

const openMobileMenu = () => {
  closeCatalog();
  burger?.setAttribute("aria-expanded", "true");
  burger?.setAttribute("aria-label", "Закрыть меню");
  mobileMenu?.classList.add("is-open");
  mobileMenu?.setAttribute("aria-hidden", "false");
  overlay?.classList.add("is-active");
  document.body.classList.add("is-menu-open");
  mobileMenuClose?.focus();
};

export const initMobileMenu = () => {
  burger = document.querySelector<HTMLButtonElement>(".header__burger");
  mobileMenu = document.querySelector<HTMLElement>("#mobile-menu");
  mobileMenuClose =
    document.querySelector<HTMLButtonElement>(".mobile-menu__close");
  overlay = document.querySelector<HTMLElement>(".page-overlay");
  mobileCatalogToggle = document.querySelector<HTMLButtonElement>(
    ".mobile-menu__catalog-toggle",
  );
  mobileCatalog = document.querySelector<HTMLElement>("#mobile-catalog");
  mobileLabButtons = document.querySelectorAll<HTMLButtonElement>(
    ".mobile-menu__catalog-lab",
  );

  burger?.addEventListener("click", () => {
    const willOpen = burger?.getAttribute("aria-expanded") !== "true";
    if (willOpen) {
      openMobileMenu();
    } else {
      closeMobileMenu();
    }
  });

  mobileMenuClose?.addEventListener("click", closeMobileMenu);
  overlay?.addEventListener("click", closeMobileMenu);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mobileMenu?.classList.contains("is-open")) {
      closeMobileMenu();
      burger?.focus();
    }
  });

  mobileCatalogToggle?.addEventListener("click", () => {
    const willOpen =
      mobileCatalogToggle?.getAttribute("aria-expanded") !== "true";

    if (willOpen) {
      mobileCatalogToggle?.setAttribute("aria-expanded", "true");
      mobileCatalog?.removeAttribute("hidden");
    } else {
      closeMobileCatalog();
    }
  });

  mobileLabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const willOpen = btn.getAttribute("aria-expanded") !== "true";
      const panel = document.querySelector<HTMLElement>(
        `#mobile-panel-${btn.dataset.panel}`,
      );

      closeMobileLabs();

      if (willOpen) {
        btn.setAttribute("aria-expanded", "true");
        panel?.removeAttribute("hidden");
      }
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 976) {
      closeMobileMenu();
    }
  });
};
