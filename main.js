import { defaultTheme } from "./modules/createSvg.js";
const span = document.createElement("span");
span.innerHTML = defaultTheme();

document.body.appendChild(span)
