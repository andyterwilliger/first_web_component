class ConfirmLink extends HTMLAnchorElement{
    connectedCallback(){
        this.addEventListener('click', e =>{
            if(!confirm('Do you really want to leave?')){
                e.preventDefault(); //supresses default behavior, which is to redirect user on click
            }
        })
    }
}
// if extending specific element, must have 3rd argument definign which element
//to 
customElements.define('at-confirm-link', ConfirmLink, { extends: 'a'});