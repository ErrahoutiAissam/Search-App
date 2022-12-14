export const getSearchTerm = () => {
    const dummySearchTerm = document.getElementById("search").value.trim();
    const regex = /[ ]{2,}/gi;
    const searchTerm = dummySearchTerm.replaceAll(regex, " ");
    return searchTerm;

}

export const retreiveSearchResults = async (searchTerm) => {
    const wikiSearchText = getWikiSearchText(searchTerm);
    const wikiSearchResults = await fetchData(wikiSearchText);
    let resultArray = [];
    if (wikiSearchResults.hasOwnProperty("query")) {
        resultArray = handlingWikiResults(wikiSearchResults.query.pages);
    }
    return resultArray;

}

const getWikiSearchText = (searchTerm) => {
    const maxChars = getCharsMax();
    const dummySearchText = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${searchTerm}&gsrlimit=20&prop=pageimages|extracts&exchars=${maxChars}&exintro&explaintext&exlimit=max&format=json&origin=*`;
    const searchText = encodeURI(dummySearchText);
    //for the spaces and special chars  
    return searchText;
}

const getCharsMax = () => {
    const width = window.innerWidth || document.body.clientWidth;
    let maxChars;
    if (width < 414) maxChars = 65;
    if (width >= 414 && width < 1400) maxChars = 100;
    if (width >= 1400) maxChars = 130;
    return maxChars;
}

const fetchData = async (searchTerm) => {
    try {
        const response = await fetch(searchTerm);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
    }
}

const handlingWikiResults = (results) => {
    const arrayResult = [];
    Object.keys(results).forEach(key => {
        const id = key;
        const title = results[key].title;
        const text = results[key].extract;
        const img = results[key].hasOwnProperty("thumbnail")
            ? results[key].thumbnail.source : null;
        const item = {
            id: id,
            title: title,
            img: img,
            text: text
        };
        arrayResult.push(item);
    });
    return arrayResult;
}
