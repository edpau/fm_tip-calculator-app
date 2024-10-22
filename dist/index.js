"use strict";
let bill = null;
let tipPercent = null;
let numberOfPeople = null;
let data = null;
const form = document.querySelector(".tip-calculator");
const billElement = document.querySelector(".calculator__number-input--bill");
const tipAmount = document.querySelector(".result__value--tip");
const totalAmount = document.querySelector(".result__value--total");
const numberOfPeopleElement = document.querySelector(".calculator__number-input--people");
const billError = document.querySelector(".calculator__bill-error");
const numberOfPeopleError = document.querySelector(".calculator__people-error");
const tipsError = document.querySelector(".select-tip__error");
const resetBtn = document.querySelector(".result__reset-button");
const tips = document.querySelectorAll(".select-tip__radio");
const customInput = document.querySelector(".select-tip__radio-custom-input");
const customRadio = document.querySelector(".select-tip__radio--custom");
function calculateTip() {
    if (validateError()) {
        const data = getFormData(form);
        bill = Number(data.billAmount);
        tipPercent = Number(data["tip-percentage"]);
        numberOfPeople = Number(data["number-people"]);
        updateResult(bill, tipPercent, numberOfPeople);
    }
    else {
        tipAmount.value = "-";
        totalAmount.value = "-";
    }
}
function getFormData(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    return data;
}
function calTotalTip(bill, tipPercent) {
    return Math.round(bill * (tipPercent / 100) * 100) / 100;
}
function calTipPerPerson(totalTip, numberOfPeople) {
    return Math.round((totalTip / numberOfPeople) * 100) / 100;
}
function calTotalPerPerson(bill, totalTip, numberOfPeople) {
    return Math.round(((bill + totalTip) / numberOfPeople) * 100) / 100;
}
function updateResult(bill, tipPercent, numberOfPeople) {
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
    }
    else {
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
    }
    else {
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
    }
    else {
        tipsError.textContent = "Select a %";
        tipsError.classList.remove("hidden");
    }
    return billChecked && tipChecked && numberOfPeopleChecked;
}
function enableResetBtn() {
    resetBtn.disabled = false;
}
// Event handler
function handleChange(e) {
    calculateTip();
    enableResetBtn();
}
function handleCustomInputChange(e) {
    const target = e.target;
    customRadio.value = target.value;
    calculateTip();
}
function handleTipChange(e) {
    const target = e.target;
    enableResetBtn();
    if (target.id === "tip-percentage-custom") {
        customInput.disabled = false;
        customInput.style.pointerEvents = "auto";
        customInput.focus();
    }
    else {
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
