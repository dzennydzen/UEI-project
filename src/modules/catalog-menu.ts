let catalogRoot: HTMLElement | null = null;
let catalogButton: HTMLButtonElement | null = null;
let catalogMenu: HTMLElement | null = null;
let catalogItems: NodeListOf<HTMLButtonElement> | null = null;
let catalogPanels: NodeListOf<HTMLElement> | null = null;

export const closeCatalog = () => {
  catalogButton?.setAttribute("aria-expanded", "false");
  catalogMenu?.classList.remove("is-open");
  catalogItems?.forEach((item) => item.setAttribute("aria-expanded", "false"));
  catalogPanels?.forEach((panel) => panel.classList.remove("is-open"));
};

export const initCatalogMenu = () => {
  catalogRoot = document.querySelector<HTMLElement>(".header__catalog");
  catalogButton = document.querySelector<HTMLButtonElement>(
    ".header__catalog > .btn",
  );
  catalogMenu = document.querySelector<HTMLElement>("#catalog-menu");
  catalogItems = document.querySelectorAll<HTMLButtonElement>(
    ".catalog-menu__item",
  );
  catalogPanels = document.querySelectorAll<HTMLElement>(
    ".catalog-menu__services",
  );

  catalogButton?.addEventListener("click", () => {
    const willOpen = catalogButton?.getAttribute("aria-expanded") !== "true";

    if (willOpen) {
      catalogButton?.setAttribute("aria-expanded", "true");
      catalogMenu?.classList.add("is-open");
    } else {
      closeCatalog();
    }
  });

  catalogItems.forEach((item) => {
    item.addEventListener("click", () => {
      const willOpen = item.getAttribute("aria-expanded") !== "true";
      const panel = document.querySelector<HTMLElement>(
        `#catalog-panel-${item.dataset.panel}`,
      );

      catalogItems?.forEach((el) => el.setAttribute("aria-expanded", "false"));
      catalogPanels?.forEach((el) => el.classList.remove("is-open"));

      if (willOpen) {
        item.setAttribute("aria-expanded", "true");
        panel?.classList.add("is-open");
      }
    });
  });

  document.addEventListener("click", (event) => {
    if (!catalogRoot?.contains(event.target as Node)) {
      closeCatalog();
    }
  });
};
