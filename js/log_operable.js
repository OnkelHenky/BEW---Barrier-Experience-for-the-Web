function no_cursor_1(){
  if(security_hint())
  {
	chrome.tabs.executeScript(
			{
			file: 'js/operable/no_cursor_1.js'
		}); 
  }
}

function no_cursor_2(){
  if(security_hint())
  {
	chrome.tabs.executeScript(
			{
			file: 'js/operable/no_cursor_2.js'
		}); 
  }
}