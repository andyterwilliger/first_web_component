/*
What are web components?
Custom HTML element
    -register your own html tags
Shadow Dom
    -manage a separate DOM node tree for your html elements(including scoped CSS styles)
Templates and Slots
    -write HTML templates that you can add to your HTML elements
HTML Imports
    -not continued

Browser Support
-not all browsers support these specifications
    -specifically older (IE)
-all major browsers do

Types of custom elements
    -Autonomous elements
        -your own custom elements,
    -extended built in elements
        -extending a paragraph/button etc

Web component lifecycle

1. Element created
    -constructor
    -called when element is created
    -not attached to the DOM yet, created in memory
    -basic initialization, values, properties, wrong place to access the DOM because the lement hasn't been added yet
2. Element attached to dom
    -connectedCallback()
    -DOM intializations
3. disconnectedCallback
    -cleanup work
4. Attribute changed callback
    -upload data/dom
*/
//class is a built in JS feature, blueprint for JS object
//here contains all the logic to build element
class Tooltip extends HTMLElement{
    //will execute this method any time the class is instantiated
    constructor(){
        //built in method executes constructor of base class youre extending (HTMLElement in this case)
        super();
        this._tooltipContainer;
        
    }
    connectedCallback(){
        const tooltipIcon = document.createElement('span');
        tooltipIcon.textContent = " (?)"
        //this keyword to access web component object 
        tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this))
        tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this))
        this.appendChild(tooltipIcon);
    }
    //underscore is convention to call method only in class
    _showTooltip(){
        this._tooltipContainer = document.createElement('div');
        this._tooltipContainer.textContent = 'Text';
        this.append(this._tooltipContainer)

    }

    _hideTooltip(){
        //to access tooltip container we converted const tooltipContainer and instantiated it in the constructor method with this keyword 
        this.removeChild(this._tooltipContainer);
    }
}
//object that allows us to register an HTML element
//two arguments, first is the name for the tag, second is JS class containing logic
//some rules for tag, must have dash, no underscore, no single word
//should be unique to avoid conflict 
customElements.define('at-tooltip', Tooltip);