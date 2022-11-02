function setCssVariable(varname, value){
    document.querySelector(":root").style.setProperty(varname, value);
}

function removeClassFromElement(elementSelector, className){
    document.querySelector(elementSelector).classList.remove(className);
}

function addClassFromElement(elementSelector, className){
    document.querySelector(elementSelector).classList.add(className);
}



export { setCssVariable, removeClassFromElement, addClassFromElement };