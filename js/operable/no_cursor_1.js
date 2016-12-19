console.log("contentscript gets executed: no_cursor_1");

var allElements = document.getElementsByTagName("*");
steal_CursorFunctionality(allElements);

function steal_CursorFunctionality(DOM_Elements){	
    for (var i=0; i<DOM_Elements.length; i++)
    {
        var element = DOM_Elements[i];
        noCursor(element);
        noPointerEvent(element);
    }
}

function noCursor(element)
{
    element.style.cursor ="none";
}

function noPointerEvent(element)
{
    element.style.pointerEvents = "none";
}