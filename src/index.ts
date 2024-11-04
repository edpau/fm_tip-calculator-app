let bill: number | undefined;
let tipPercent: number | undefined;
let numberOfPeople: number | undefined;

const form = document.querySelector(".tip-calculator") as HTMLFormElement;

const billElement = document.querySelector(
  ".calculator__number-input--bill"
) as HTMLInputElement;

const tipAmount = document.querySelector(
  ".result__value--tip"
) as HTMLOutputElement;

const totalAmount = document.querySelector(
  ".result__value--total"
) as HTMLOutputElement;

const numberOfPeopleElement = document.querySelector(
  ".calculator__number-input--people"
) as HTMLInputElement;

const billError = document.querySelector(
  ".calculator__bill-error"
) as HTMLSpanElement;

const numberOfPeopleError = document.querySelector(
  ".calculator__people-error"
) as HTMLSpanElement;

const tipsError = document.querySelector(
  ".select-tip__error"
) as HTMLSpanElement;

const resetBtn = document.querySelector(
  ".result__reset-button"
) as HTMLButtonElement;

const tips = document.querySelectorAll(
  ".select-tip__radio"
) as NodeListOf<HTMLInputElement>;

const customInput = document.querySelector(
  ".select-tip__radio-custom-input"
) as HTMLInputElement;

const customRadio = document.querySelector(
  ".select-tip__radio--custom"
) as HTMLInputElement;

function calculateTip() {
  if (validateError()) {
    const data = getFormData(form);
    bill = Number(data.billAmount);
    tipPercent = Number(data["tip-percentage"]);
    numberOfPeople = Number(data["number-people"]);
    updateResult(bill, tipPercent, numberOfPeople);
  } else {
    tipAmount.value = "-";
    totalAmount.value = "-";
  }
}

function getFormData(
  form: HTMLFormElement
): Record<string, FormDataEntryValue> {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  return data;
}

function calTotalTip(bill: number, tipPercent: number): number {
  return Math.round(bill * (tipPercent / 100) * 100) / 100;
}

function calTipPerPerson(totalTip: number, numberOfPeople: number): number {
  return Math.round((totalTip / numberOfPeople) * 100) / 100;
}

function calTotalPerPerson(
  bill: number,
  totalTip: number,
  numberOfPeople: number
): number {
  return Math.round(((bill + totalTip) / numberOfPeople) * 100) / 100;
}

function updateResult(
  bill: number,
  tipPercent: number,
  numberOfPeople: number
): void {
  const totalTip = calTotalTip(bill, tipPercent);
  const tipPerPerson = calTipPerPerson(totalTip, numberOfPeople);
  const totalPerPerson = calTotalPerPerson(bill, totalTip, numberOfPeople);
  tipAmount.value = `$${tipPerPerson.toString()}`;
  totalAmount.value = `$${totalPerPerson.toString()}`;
}

function validateError() {
  let billChecked = false;
  let tipChecked = false;
  let numberOfPeopleChecked = false;
  if (billElement.validity.valueMissing) {
    billError.textContent = "Can't be zero";
    billError.classList.remove("hidden");
    billElement.classList.add("invalid");
    billChecked = false;
  } else {
    billError.textContent = "";
    billError.classList.add("hidden");
    billElement.classList.remove("invalid");
    billChecked = true;
  }

  if (numberOfPeopleElement.validity.valueMissing) {
    numberOfPeopleError.textContent = "Can't be zero";
    numberOfPeopleError.classList.remove("hidden");
    numberOfPeopleElement.classList.add("invalid");
    numberOfPeopleChecked = false;
  } else {
    numberOfPeopleError.textContent = "";
    numberOfPeopleError.classList.add("hidden");
    numberOfPeopleElement.classList.remove("invalid");
    numberOfPeopleChecked = true;
  }

  for (let i = 0; i < tips.length; i++) {
    if (tips[i].checked === true) {
      tipChecked = true;
      break;
    }
  }

  if (tipChecked) {
    tipsError.textContent = "";
    tipsError.classList.add("hidden");
  } else {
    tipsError.textContent = "Select a %";
    tipsError.classList.remove("hidden");
  }
  return billChecked && tipChecked && numberOfPeopleChecked;
}

function enableResetBtn() {
  resetBtn.disabled = false;
}
// Event handler

function handleChange(e: Event) {
  calculateTip();
  enableResetBtn();
}

function handleCustomInputChange(e: Event) {
  const target = e.target as HTMLInputElement;
  customRadio.value = target.value;
  calculateTip();
}

function handleTipChange(e: Event): void {
  const target = e.target as HTMLInputElement;

  enableResetBtn();

  if (target.id === "tip-percentage-custom") {
    customInput.disabled = false;
    customInput.style.pointerEvents = "auto";
    customInput.focus();
  } else {
    customInput.disabled = true;
    customInput.style.pointerEvents = "none";
    customInput.value = "";
  }
  calculateTip();
}

function handleReset() {
  form.reset();
  tipsError.textContent = "";
  tipsError.classList.add("hidden");
  numberOfPeopleError.textContent = "";
  numberOfPeopleError.classList.add("hidden");
  numberOfPeopleElement.classList.remove("invalid");
  billError.textContent = "";
  billError.classList.add("hidden");
  billElement.classList.remove("invalid");
  resetBtn.disabled = true;
}

function init() {
  if (!billElement || !form || !numberOfPeopleElement || !resetBtn || !tips) {
    console.error("One or more elements are missing");
    return;
  }

  tips.forEach((tip) => {
    tip.addEventListener("click", handleTipChange);
  });

  billElement.addEventListener("input", handleChange);
  form.addEventListener("submit", handleChange);
  numberOfPeopleElement.addEventListener("input", handleChange);
  resetBtn.addEventListener("click", handleReset);
  customInput.addEventListener("input", handleCustomInputChange);
}

init();
