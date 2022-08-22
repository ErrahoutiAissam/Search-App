import { searchFocus,
         displayClearTextButton,
         clearTextButton,
         clearPressListener
        } from "./searchInput.js"
import { getSearchTerm } from "./dataFunctions.js"
import { retreiveSearchResults } from "./dataFunctions.js"
import {
    removeStatisticsLine,
    buildSearchResult,
    setStatisticsLine,
    deleteSearchResults
} from "./searchResults.js"

document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
        initiateApp();
    }
});

const initiateApp = () => {
    // first of all we'l set the focus
    searchFocus();

    // then we'll add 3 event listeners 

    //first one for the remove button
    const search = document.getElementById("search");
    search.addEventListener("input",displayClearTextButton);

    // second for the clear search
    const remove = document.getElementById("remove");
    remove.addEventListener("click",clearTextButton);
    remove.addEventListener("keydown",clearPressListener);
    
    //clearing search with enter or space
    

    const form = document.getElementById("search-input");
    form.addEventListener("submit", submitSearch);
}

//wokflow functions 

const submitSearch = (e) => {
    e.preventDefault();
    deleteSearchResults();
    processSearch();
    searchFocus();
};

const processSearch = async () => {
    removeStatisticsLine();
    const searchTerm = getSearchTerm();
    if (searchTerm === "") return;
    const arrayResult = await retreiveSearchResults(searchTerm);
    if (arrayResult.length) buildSearchResult(arrayResult);
    // gotta import it from a new file that should be created "searchresults.js" 
    setStatisticsLine(arrayResult.length);
}