export const deleteSearchResults = () => {
    const parent = document.getElementById("search-results");
    let child = parent.lastElementChild;
    while (child) {
        parent.removeChild(child);
        child = parent.lastElementChild;
    }
};

export const buildSearchResult = (arrayResult) => {
    arrayResult.forEach((result) => {
        const resultItem = createResultItem(result);
        const contentsResult = document.createElement("div");
        contentsResult.classList.add("result-content")
        if (result.img) {
            const resultImg = createResultImg(result);
            contentsResult.append(resultImg);
        }
        const resultText = createResultText(result);
        contentsResult.append(resultText);
        resultItem.append(contentsResult);
        const searchResults = document.getElementById("search-results");
        searchResults.append(resultItem);
    })
}

//containing the result fo the search
const createResultItem = (result) => {
    const resultItem = document.createElement("div");
    resultItem.classList.add("result-item");
    const resultTitle = document.createElement("div");
    resultTitle.classList.add("result-title");
    const link = document.createElement("a");
    link.href = `https://en.wikipedia.org/?curid=${result.id}`;
    link.textContent = result.title;
    link.target = "_blank";
    resultTitle.append(link);
    resultItem.append(resultTitle);
    return resultItem;
}

//the result image of the search 
const createResultImg = (result) => {
    const resultImg = document.createElement("div");
    resultImg.classList.add("result-img");
    const img = document.createElement("img");
    img.src = result.img;
    img.alt = result.title;
    resultImg.append(img);
    return resultImg;
}

//the result text of the search 
const createResultText = (result) => {
    const resultText = document.createElement("div");
    resultText.classList.add("result-text");
    const resultDescription = document.createElement("p");
    resultDescription.classList.add("result-description");
    resultDescription.textContent = result.text;
    resultText.append(resultDescription);
    return resultText;
}

// removing the statistics line once the remove button is clicked
export const removeStatisticsLine = () => {
    document.getElementById("statistics").textContent = "";
}

//seeting a line containning the number of results are of the search
export const setStatisticsLine = (numOfResults) => {
    const statisticsLine = document.getElementById('statistics');
    if (numOfResults) {
        statisticsLine.textContent = `Displaying ${numOfResults} results.`;
    } else {

        statisticsLine.textContent = "No results are available for the search.";
    }
}

