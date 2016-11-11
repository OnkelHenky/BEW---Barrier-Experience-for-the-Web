//Parse JSON to String Array
function getJSONdata()
{   
  $.getJSON("../json/clarifications.json", function(json) {
    //console.log("Content of JSON.file", json);
    rollThroughArray(json);
	happy(json);
  });
}

//iterate through String Array
function rollThroughArray(jsonObject)
{
    $.each(jsonObject,function(Index_cla, clarifications){
      //console.log(Index_cla); //JSON Name
      //console.log(clarifications); //Shows the clarifications Object with all it´s sub Items
      $.each(clarifications, function(clarification, index_y){
          //console.log(clarification); //Clarification Name
          //console.log(index_y); //Shows the Function Object with all it´s sub Items
        $.each(index_y, function(Object_key, Object_value){ 
            //console.log(Object_name); useless
            var clarification_data = {

              Clarification_Name:         Object_value.Headline,
              Clarification_Description:  Object_value.Description,
              Clarification_Image_Source: Object_value.Image_source,
              Clarification_Image_Alt:    Object_value.Image_alt,
              //Clarification_Function:     Object_value.function_name //at the moment not in use
            };

            var template = "<div><input type='radio' id='{{Clarification_Name}}' name='clarification' value='{{Clarification_Name}}'><label class='clarification_button' for='{{Clarification_Name}}'><img src='{{Clarification_Image_Source}}' alt='{{Clarification_Image_Alt}}'></label><label class='clarification_label'>{{Clarification_Name}}</label><div>";
            
            var output_position = document.getElementById('sampleArea');
            
            writeMustache(template, clarification_data, output_position);
        });
      });
    });
}

//create Arrays for stored function names
function happy(jsonObject)
{
	console.log("hohoho");
	var Clarification_counter = 0;
	var Clarification_Array = [];
	var Clarification_NameArray = [];
	
	$.each(jsonObject,function(Index_cla, clarifications){
    	$.each(clarifications, function(clarification, index_y){
			Clarification_counter = Clarification_counter + 1;
	    	$.each(index_y, function(Object_key, Object_value){ 
				Clarification_Array.push(Object_value.function_name);
				Clarification_NameArray.push(Object_value.Headline);
    		});
		});
	});
	//console.log(Clarification_counter);
	//console.log(Clarification_Array);
	//console.log(Clarification_NameArray);

	appendClarifications(Clarification_Array, Clarification_NameArray, Clarification_counter);
}


//create a Mustache template
//use Mustache to render a template
function writeMustache(template, data, output_position)
{
    var output = Mustache.render(template, data);
	var newcontent = output_position.innerHTML + output;

	output_position.innerHTML = newcontent;
}

//append the Functions to the Clarifications buttons
function appendClarifications(clarifications_functions, clarification_names, counter)
{
	for (i = 0; i < counter; i++) 
	{ 
		//Adding Dynamical functions to certain Elements
  		var handler = function(iterator, method)
		{
			console.log(iterator);
			console.log(method[iterator]);

			//calls clarifications_functions[i]
			eval(method[iterator]);
		};

		document.getElementById(clarification_names[i]).onclick = handler.bind("placeholder", i ,clarifications_functions);
	}
}

//Simple Placeholder function
function function_test()
{
	//alert("Juhu!");
	hello();
}

function reload_open_tab()
{
	chrome.tabs.reload();
}

function hello() {
  chrome.tabs.executeScript({
    file: 'js/contentscript.js'
  }); 
}

//Wait until document has loaded
$(document).ready(function()
{ 
	//call starting function
  	getJSONdata();
});
