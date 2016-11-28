function perception_screenreader(){
  if(security_hint())
  {
	chrome.tabs.executeScript(
			{
			file: 'js/perception/perception_screenreader.js'
		}); 
  }
}

function perception_contrast(){
  if(security_hint())
  {
						console.log("Test");
	chrome.tabs.executeScript(
			{
			file: 'js/perception/perception_contrast.js'
		}); 
  }
}