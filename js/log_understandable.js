function understandable_Akademiker(){
  if(security_hint())
  {
	chrome.tabs.executeScript(
			{
			file: 'js/understandable/understandable_Akademiker.js'
		}); 
  }
}

function understandable_teenager(){
  if(security_hint())
  {
	chrome.tabs.executeScript(
			{
			file: 'js/understandable/understandable_teenager.js'
		}); 
  }
}

function understandable_child(){
  if(security_hint())
  {
	chrome.tabs.executeScript(
			{
			file: 'js/understandable/understandable_child.js'
		}); 
  }
}
