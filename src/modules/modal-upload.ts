const REMOVE_ICON = `
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
  </svg>
`;

const MAX_FILES = 3;

let files: File[] = [];
let input: HTMLInputElement | null = null;
let list: HTMLElement | null = null;
let control: HTMLElement | null = null;

const syncInput = () => {
  if (!input) return;
  const dataTransfer = new DataTransfer();
  files.forEach((file) => dataTransfer.items.add(file));
  input.files = dataTransfer.files;
};

const updateControlState = () => {
  if (!control || !input) return;
  const isMax = files.length >= MAX_FILES;
  control.classList.toggle("is-max", isMax);
  input.disabled = isMax;
};

const renderList = () => {
  if (!list) return;
  list.replaceChildren();

  files.forEach((file, index) => {
    const item = document.createElement("li");
    item.className = "modal__upload-item";

    const name = document.createElement("span");
    name.className = "modal__upload-name";
    name.textContent = file.name;

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "modal__upload-remove";
    remove.setAttribute("aria-label", `Удалить файл ${file.name}`);
    remove.innerHTML = REMOVE_ICON;
    remove.addEventListener("click", () => {
      files = files.filter((_, i) => i !== index);
      syncInput();
      renderList();
    });

    item.append(name, remove);
    list?.append(item);
  });

  updateControlState();
};

export const resetModalUpload = () => {
  files = [];
  syncInput();
  renderList();
};

export const initModalUpload = () => {
  input = document.querySelector<HTMLInputElement>(
    "#modal-calculation .modal__upload-input",
  );
  list = document.querySelector<HTMLElement>(
    "#modal-calculation .modal__upload-list",
  );
  control = document.querySelector<HTMLElement>(
    "#modal-calculation .modal__upload-control",
  );

  if (!input || !list || !control) return;

  input.addEventListener("change", () => {
    const selected = input?.files;
    if (!selected?.length) return;

    Array.from(selected).forEach((file) => {
      if (files.length >= MAX_FILES) return;

      const alreadyAdded = files.some(
        (item) => item.name === file.name && item.size === file.size,
      );
      if (!alreadyAdded) {
        files.push(file);
      }
    });

    syncInput();
    renderList();
  });
};
