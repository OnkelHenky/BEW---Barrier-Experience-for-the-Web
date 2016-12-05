function perception_screenreader(){
	chrome.tabs.executeScript(
	{
		file: 'js/perception/perception_screenreader.js'
	}); 
}

function perception_contrast_AA(){
	chrome.tabs.executeScript(
	{
		file: 'js/perception/perception_contrast_AA.js'
	}); 
}

function perception_contrast_AAA(){
chrome.tabs.executeScript(
	{
		file: 'js/perception/perception_contrast_AAA.js'
	}); 
}