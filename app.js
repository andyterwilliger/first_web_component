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
//light dom styles override shadow dom
class Tooltip extends HTMLElement{
    //will execute this method any time the class is instantiated
    constructor(){
        //built in method executes constructor of base class youre extending (HTMLElement in this case)
        super();
        this._tooltipVisible = false;
        this._tooltipContainer;
        this._tooltipIcon;
        this._toolTipText='Some dummy text'
        //creates shadow dom
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML= `
        <style>
        div {
            font-weight: normal;
            background-color: black;
            color: white;
            position: absolute;
            top: 1.5rem;
            left: 0.75rem;
            z-index: 10;
            padding: 0.15rem;
            border-radius: 3px;
            box-shadow: 1px 1px 6px rgba(0 ,0, 0, 0.26);
        }
        :host{
            position: relative;
        }
        :host(.important){
            background: var(--color-primary)
            padding: 0.15rem;
            
        }
        :host-context(p){
            font-weight: bold;
        }
        .highlight{
            background-color: red;
        }

        ::slotted(.highlight){
            border-bottom: 1px dotted red;
        }

        .icon{
            background: black;
            color: white;
            padding: 0.15rem 0.5rem;
            text-align: center;
            border-radius: 10px;
        }

        </style>
        <slot></slot><span class="icon"> ?</span>
        
        `;
        //boolean to see if deep or shallow clone (nested elements or no nested elements- only top level)
        
    }
    connectedCallback(){
        if(this.hasAttribute('text')){
            this._tooltipContainer = this.getAttribute('text')
        }
        this._tooltipIcon = this.shadowRoot.querySelector('span');
        //this keyword to access web component object 
        this._tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this))
        this._tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this))
        this.shadowRoot.appendChild(this._tooltipIcon);
        //this.style.position = 'relative';
        this.style.zIndex= '10'
    }
    //life cycle hook, executes when observed attribute updated
    attributeChangedCallback(name, oldValue, newValue){
        if(oldValue === newValue){
            return;
        } 
        if(name === 'text'){
            this._toolTipText = newValue;
        }
    }
    // must call this to tell js what attributes should be observed
    static get observedAttributes(){
        //return an array with all attribute names to be observed
        return['text'];
    }

    disconnectedCallback(){
        console.log('disconnect')
        this._tooltipIcon.removeEventListener('mousenter', this._showTooltip)
        this._tooltipIcon.removeEventListener('mousenter', this._hideTooltip)

    }
    //the more components you have, more sense it makes to contain all logic for accessing shadow dom and adding
    _render(){
        //responsible for updating the dom
        if(this._tooltipVisible){
            this._tooltipContainer = document.createElement('div');
            this._tooltipContainer.textContent = this._toolTipText;
            this.shadowRoot.appendChild(this._tooltipContainer)
        } else{
            if(this._tooltipContainer){
                this.shadowRoot.removeChild(this._tooltipContainer);
            }

        }
    }

    //underscore is convention to call method only in class
    
    _showTooltip(){
        //this._tooltipContainer = document.createElement('div');
        //this._tooltipContainer.textContent = this._toolTipText;
       // this.shadowRoot.append(this._tooltipContainer)
       this._tooltipVisible = true;
       this._render();

    }

    _hideTooltip(){
        //to access tooltip container we converted const tooltipContainer and instantiated it in the constructor method with this keyword 
        //this.shadowRoot.removeChild(this._tooltipContainer);
        this._tooltipVisible = false;
        this._render();

    }
    
}
//object that allows us to register an HTML element
//two arguments, first is the name for the tag, second is JS class containing logic
//some rules for tag, must have dash, no underscore, no single word
//should be unique to avoid conflict 
customElements.define('at-tooltip', Tooltip);


/*
conditional host styling
:host(.important) wrap classes, id selectors

styling with host content

:host-context(p) setting style if inside of paragraph
 */
