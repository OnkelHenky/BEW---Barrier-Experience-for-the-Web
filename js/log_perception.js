function perception_screenreader(){
  if(security_hint())
  {
	chrome.tabs.executeScript(
			{
			file: 'js/perception/perception_screenreader.js'
		}); 
  }
}

function perception_contrast_AA(){
  if(security_hint())
  {
						console.log("Test");
	chrome.tabs.executeScript(
			{
			file: 'js/perception/perception_contrast_AA.js'
		}); 
  }
}

function perception_contrast_AAA(){
  if(security_hint())
  {
						console.log("Test");
	chrome.tabs.executeScript(
			{
			file: 'js/perception/perception_contrast_AAA.js'
		}); 
  }
}