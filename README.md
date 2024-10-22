# Frontend Mentor - Tip calculator app solution

This is a solution to the [Tip calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/tip-calculator-app-ugJNGbJUX). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Reminder](#reminder)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)


## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Calculate the correct tip and total cost of the bill per person

### Screenshot

<img src="./images/screenshot.png" alt="Screenshot" width="300"/>

### Links

- [Solution URL](https://github.com/edpau/fm_tip-calculator-app)
- [Live Site URL](https://edpau.github.io/fm_tip-calculator-app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework
- [Styled Components](https://styled-components.com/) - For styles

**Note: These are just examples. Delete this note and replace the list above with your own choices**

### What I learned

#### form

- `<form action="#" novalidate>` This ensures that the form does not submit anywhere and does not perform any validation.

- The <fieldset> element is a convenient way to create groups of widgets that share the same purpose, for styling and semantic purposes. You can label a <fieldset> by including a <legend> element just below the opening <fieldset> tag.

- The <output> HTML element is a container element into which a site or app can inject the results of a calculation or the outcome of a user action.

#### Get form data using `FormData()`

```js
const form = document.querySelector(".tip-calculator") as HTMLFormElement;

const formData = new FormData(form);
const data = Object.fromEntries(formData);

// {billAmount: '', tip-percentage: '5', numberOfPeople: ''}
```

#### Radio Button, hide radio button and only show button label

- I tried to hide the radio button, while I am using grid for my layout, `display: none` on the `.select-tip__radio[type="radio"]` seems to work, but lost the accessibility, so below is better

```css
.select-tip__radio[type="radio"] {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}
```

#### Radio Button label, checked color
- When changing checked color of the label, need to select checked on the radio button
``` css
input[type="radio"]:checked + label {
  background-color: var(--color-button-tip-selected);
  color: var(--color-button-tip-text-selected);
}
```

#### How to make custom radio input custom %
- I put a input inside the radio button label, and put it to disabled and use CSS to set `pointer-events: none`.
So user can select the custom radio label just as the other.

```html
  <label class="select-tip__radio-label select-tip__radio-label--custom" for="tip-percentage-custom">
              <input
                type="number"
                class="select-tip__radio-custom-input"
                name="tip-percentage-custom-input"
                name="other_tip"
                placeholder="Custom"
                min="0"
                disabled
            /></label>
```
- When the user selected the custom radio label I use JS to set the input `disabled = false`, set `pointer-events: auto` and focus on the input. 

``` js
 if (target.id === "tip-percentage-custom") {
    customInput.disabled = false;
    customInput.style.pointerEvents = "auto";
    customInput.focus();
  } else {
    customInput.disabled = true;
    customInput.style.pointerEvents = "none";
    customInput.value = "";
  }
```


#### TS

###### Record<K, T> utility type

- In TypeScript, the Record<K, T> utility type is used to define an object type with a set of keys K and a set of values T. It essentially represents an object where every key has a specific value type.

#### Round number to 2 decimal place

- [How to round to at most 2 decimal places, if necessary](https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary)
- toFixed() will also not round correctly in some cases, also it return a string.

  ```js
  parseFloat("1.555").toFixed(2); // Returns 1.55 instead of 1.56.
  parseFloat("1.5550").toFixed(2); // Returns 1.55 instead of 1.56.
  // However, it will return correct result if you round 1.5551.
  parseFloat("1.5551").toFixed(2); // Returns 1.56 as expected.
  ```

- [JavaScript round a number to 2 decimal places ](https://codedamn.com/news/javascript/javascript-round-a-number-to-2-decimal-places-with-examples)
- using the Math.round() function, problem it will not leave 2 decimal place.

``` js

var a = 5.678948;
let b = 10.257683;
let c = 6.6456583;
let result1 = Math.round(a*100)/100;
let result2 = Math.round(b*10)/10;
let result3 = Math.round(x*1000)/1000;
console.log(result1) // 5.68
console.log(result2) // 10.3
console.log(typeof result2) // 6.646

```


### Reminder
- use `aria-live="polite"` for displaying error

### Continued development

- improve the accessibility on the screen reader reading the Tip Amount per person and the result.

### Useful resources

#### From
- [How to structure a web form](https://developer.mozilla.org/en-US/docs/Learn/Forms/How_to_structure_a_web_form) - Learn how to use <fieldset> with radio input. Learn how to use <section>, <fieldset> for radio button to build a simple payment form with good html semantic elements.
- [How to stop form submission using JavaScript?](https://www.tutorialspoint.com/how-to-stop-form-submission-using-javascript)
- [Client-side form validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)

#### Styling Radio Buttons
-[how to create a custom Input radio button which have attributes inside it](https://stackoverflow.com/questions/72746367/how-to-create-a-custom-input-radio-button-which-have-attributes-inside-it) - show me basic, how to style an input
- [CodePen Home Radio button without the dot](https://codepen.io/jacobberglund/pen/mdPEza) - a simple example
- [Pure CSS - SVG Radio Selector Buttons](https://codepen.io/nikkipantony/pen/wpPGZp) - advance example
- [Styling Radio Buttons with CSS (59 Custom Examples)](https://www.sliderrevolution.com/resources/styling-radio-buttons/) - 59 different examples
- [Custom Styling Radio Buttons: The Modern Way](https://dev.to/adbutterfield/custom-styling-radio-buttons-the-modern-way-the-butterfield-way-emk)
- [How TO - Custom Checkbox](https://www.w3schools.com/howto/howto_css_custom_checkbox.asp)
- [HTML Forms: Radio buttons with text fields](https://stackoverflow.com/questions/12888612/html-forms-radio-buttons-with-text-fields) - How to add custom tips in radio button

#### Style input
- [How TO - Hide Arrows From Input Number](https://www.w3schools.com/howto/howto_css_hide_arrow_number.asp)

#### JS
[HTML DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp)

#### Design system
- [Design your service using GOV.UK styles, components and patterns](https://design-system.service.gov.uk) - Use this design system to make government services consistent with GOV.UK. Learn from the research and experience of other service teams and avoid repeating work that’s already been done.

## Author

- Website - [Edward Pau](https://www.edpau.me)
- Frontend Mentor - [@edpau](https://www.frontendmentor.io/profile/edpau)