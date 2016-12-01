console.log("contentscript gets executed: no_cursor_1");

var allElements = document.getElementsByTagName("*");

for (var i=0; i<allElements.length; i++)
{
    var element = allElements[i];
    element.style.cursor = "none";
    element.style.pointerEvents = "none";
}
