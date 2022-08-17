import createComponent from './createComponent.js';
import * as ClickCounter from './ClickCounter.js';

createComponent(ClickCounter);

document.body.innerHTML = `
<click-counter start="0"></click-counter>
`;

const element = document.querySelector('click-counter');

const props = {}
Array.from(element.attributes).forEach(attr => props[attr.nodeName] = attr.nodeValue);