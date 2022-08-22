export const searchFocus = () => {
    document.getElementById("search").focus()
}

export const displayClearTextButton = () =>{
    const search = document.getElementById("search");
    const clear = document.getElementById("remove");
    if(search.value.length) {
        clear.classList.remove("none");
        clear.classList.add("flex");
    }
    else{
        clear.classList.add("none");
        clear.classList.remove("flex");
    }
}

export const clearTextButton = (e) =>{
    e.preventDefault();
    document.getElementById("search").value = "";
    const remove = document.getElementById("remove");
    remove.classList.add("none");
    remove.classList.remove("flex");
    searchFocus();
}

export const clearPressListener = (e) =>{
    if(e.key === "Enter"   ||  e.key === " "){
        e.preventDefault()
        document.getElementById("remove").click();
    }
}