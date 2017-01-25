function understandable_teenager(){
	chrome.tabs.executeScript(
	{
		file: 'js/understandable/understandable_teenager.js'
	}); 
}

function understandable_child(){
    chrome.tabs.executeScript(
        {
            file: 'js/understandable/understandable_child.js'
        });
}

function understandable_dyslexia(){
    chrome.tabs.executeScript(
        {
            file: 'js/understandable/dyslexia.js'
        });
}
