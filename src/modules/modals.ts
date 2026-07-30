import { closeMobileMenu } from "./mobile-menu";
import { initModalUpload, resetModalUpload } from "./modal-upload";

let overlay: HTMLElement | null = null;
let activeModal: HTMLElement | null = null;

const getModal = (id: string) => document.querySelector<HTMLElement>(`#${id}`);

const showOverlay = () => {
  overlay?.classList.add("is-active");
};

const hideOverlayIfIdle = () => {
  if (!document.body.classList.contains("is-menu-open")) {
    overlay?.classList.remove("is-active");
  }
};

const MODAL_TRANSITION_MS = 350;

const resetModalForms = (modal: HTMLElement) => {
  modal.querySelectorAll<HTMLFormElement>("form").forEach((form) => {
    form.reset();
    form
      .querySelectorAll<HTMLElement>(".modal__check.is-invalid")
      .forEach((check) => check.classList.remove("is-invalid"));
  });

  if (modal.id === "modal-calculation") {
    resetModalUpload();
  }
};

export const closeModal = () => {
  const modal =
    activeModal ?? document.querySelector<HTMLElement>(".modal.is-open");
  if (!modal) return;

  resetModalForms(modal);

  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  activeModal = null;
  document.body.classList.remove("is-modal-open");
  hideOverlayIfIdle();
};

const showModal = (id: string) => {
  const modal = getModal(id);
  if (!modal) return;

  activeModal = modal;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("is-modal-open");
  showOverlay();

  modal.querySelector<HTMLElement>(".modal__close")?.focus();
};

export const openModal = (id: string) => {
  closeMobileMenu();
  closeModal();
  showModal(id);
};

export const openSuccessModal = () => {
  const previous =
    activeModal ?? document.querySelector<HTMLElement>(".modal.is-open");

  if (!previous) {
    closeMobileMenu();
    showModal("modal-success");
    return;
  }

  resetModalForms(previous);

  previous.classList.remove("is-open");
  previous.setAttribute("aria-hidden", "true");
  activeModal = null;

  let finished = false;
  const openNext = () => {
    if (finished) return;
    finished = true;
    previous.removeEventListener("transitionend", onTransitionEnd);
    showModal("modal-success");
  };

  const onTransitionEnd = (event: TransitionEvent) => {
    if (event.target !== previous || event.propertyName !== "opacity") return;
    openNext();
  };

  previous.addEventListener("transitionend", onTransitionEnd);
  window.setTimeout(openNext, MODAL_TRANSITION_MS);
};

export const initModals = () => {
  overlay = document.querySelector<HTMLElement>(".page-overlay");

  const consultationButtons =
    document.querySelectorAll<HTMLButtonElement>(".btn--consultation");
  const calculationButton =
    document.querySelector<HTMLButtonElement>(".btn--cta");

  consultationButtons.forEach((button) => {
    button.addEventListener("click", () => {
      openModal("modal-consultation");
    });
  });

  calculationButton?.addEventListener("click", () => {
    openModal("modal-calculation");
  });

  document
    .querySelectorAll<HTMLElement>("[data-modal-close]")
    .forEach((btn) => {
      btn.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        closeModal();
      });
    });

  document.querySelectorAll<HTMLElement>(".modal").forEach((modal) => {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeModal();
      }
    });
  });

  overlay?.addEventListener("click", () => {
    if (document.body.classList.contains("is-modal-open")) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      document.body.classList.contains("is-modal-open")
    ) {
      closeModal();
    }
  });

  initModalUpload();

  document
    .querySelectorAll<HTMLAnchorElement>(".modal__check-link")
    .forEach((link) => {
      link.addEventListener("click", (event) => {
        event.stopPropagation();
      });
    });

  const bindFormSubmit = (form: HTMLFormElement | null) => {
    if (!form) return;

    const privacyInput = form.querySelector<HTMLInputElement>(
      "input[name='privacy']",
    );
    const privacyCheck =
      privacyInput?.closest<HTMLLabelElement>(".modal__check");

    privacyInput?.addEventListener("change", () => {
      if (privacyInput.checked) {
        privacyCheck?.classList.remove("is-invalid");
      }
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!privacyInput?.checked) {
        privacyCheck?.classList.add("is-invalid");
        privacyCheck?.scrollIntoView({ block: "nearest", behavior: "smooth" });
        return;
      }

      privacyCheck?.classList.remove("is-invalid");
      openSuccessModal();
    });
  };

  bindFormSubmit(
    document.querySelector<HTMLFormElement>("#modal-calculation .modal__form"),
  );
  bindFormSubmit(
    document.querySelector<HTMLFormElement>("#modal-consultation .modal__form"),
  );
};
