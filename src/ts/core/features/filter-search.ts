import {Feature, Settings} from '../settings'

export const config: Feature = { // An object that describes new feature we introduce
    id: 'filter_search',  // Feature id - any unique string would do
    name: 'Filter Search',  // Feature name - would be displayed in the settings menu
    warning: 'Experimental feature',
    enabledByDefault: false,
}

const checkSettingsAndSetupFilterSearchToggle = () => {
    Settings.isActive('filter_search').then(active => {
        toggleFilterSearch(active)
    })
}
checkSettingsAndSetupFilterSearchToggle()

const toggleFilterSearch = (active: boolean) => {
    const jsDoc = document;
    if (active) {
        jsDoc.addEventListener("click", filterSearch);
    } else {
        jsDoc.removeEventListener("click", filterSearch);
        var allByClass = document.querySelectorAll('div.rm-reference-container > div:first-child');
        var pageRefDiv = (<HTMLElement>allByClass[0]);
        if(typeof pageRefDiv !== 'undefined' && pageRefDiv !== null){pageRefDiv.removeEventListener("click", pageRefClick);}
        var newInput = (<HTMLElement>document.getElementById("fbSearchInput"));
        if(typeof newInput !== 'undefined' && newInput !== null)
        {
            newInput.removeEventListener("input", newInputClick);
            newInput.style.display = "none";
        }
    }
}

var debugMode = 0;

function filterSearch(evt: MouseEvent)
{
    var evtTarget = (<HTMLElement>evt.target);
    if(evtTarget !== null)
    {
        if(debugMode == 1){console.log(evtTarget.className);}
        if(evtTarget.className === 'bp3-icon bp3-icon-filter' || evtTarget.className === 'bp3-button')
        {
            //Check if filter search input box is there, otherwise need to load it (new page)
            var tbInputTest = document.getElementById("fbSearchInput");

            if(tbInputTest === null)
            {
                var allByClass = document.querySelectorAll('div.rm-reference-container > div:first-child');
                var pageRefDiv = (<HTMLElement>allByClass[0]);

                pageRefDiv.addEventListener("click", pageRefClick);
                var newDiv = document.createElement('div');
                    newDiv.id = 'filterBoxSearch';
                    newDiv.style.cssText = 'display:flex';
                    pageRefDiv.insertBefore(newDiv, pageRefDiv.lastElementChild)

                var newInput = document.createElement('input');
                    newInput.value = '';
                    newInput.id = 'fbSearchInput';
                    newInput.name = 'fbSearchInput';
                    newInput.style.cssText = 'width:150px;display:flex;margin-left:10px';
                    newDiv.appendChild(newInput);
                    newInput.focus();

                newInput.addEventListener("input", newInputClick);
            }
            else {
                tbInputTest.focus();
            }
        }
    }
    //console.log("document click")
}

function pageRefClick()
{
    if(debugMode == 1){console.log('clicked');}
    var searchInput = document.getElementById("fbSearchInput");
    if(searchInput !== null){searchInput.focus();}
}

function newInputClick()
{
    var inputTxtVal = (<HTMLInputElement>document.getElementById("fbSearchInput")).value.toString();
    if(debugMode == 1){console.log(inputTxtVal);}

    //Get filter box (only works when opened)
    var allByClass2 = document.querySelectorAll('.bp3-overlay.bp3-overlay-open.bp3-overlay-inline');
    var filterBox = allByClass2[0];
    if(typeof filterBox !== "undefined")
    {
        var allFilterButtons = filterBox.querySelectorAll('div:not(.flex-h-box) > div > button.bp3-button');

        for(var i = 0; i < allFilterButtons.length; i++)
        {
            var curElement = allFilterButtons.item(i);

            if(inputTxtVal !== '')
            {
                var curElemText = (<HTMLElement>curElement).innerText.toString().toLowerCase();
                //if(debugMode == 1){console.log(curElemText);}
                if(curElemText.indexOf(inputTxtVal.toLowerCase()) > -1){(<HTMLElement>curElement).style.display = "inline-flex"}else{(<HTMLElement>curElement).style.display = "none"}
            }else{(<HTMLElement>curElement).style.display = "inline-flex"}
        }
    }else
    {
        if(debugMode == 1){console.log('filter box is NOT open');}
    }
}
