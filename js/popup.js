//Wait until document has loaded
$(document).ready(function(){ 
	//call starting function
	var categorys = document.getElementsByClassName("category_input");
	for (var i=0; i < categorys.length; i++)
	{
		//console.log("Is something happening?");
		console.log(categorys[i]);
		categorys[i].onchange = function(){ checkRadioValue();}
	}
});

//Ausgewählte Kategorie wird überprüft.
function checkRadioValue(){
	console.log("1: Radio value wird abgefragt.")
	var json_value;
	var headline_values = document.getElementsByClassName("category_label");

	//Das onclick event wird vor dem radio-button wechsel gestartet.

	if(document.getElementById("kat1").checked)
	{
		json_value = document.getElementById("kat1").value;
		//console.log("String contains Value: " + json_value);			
		document.getElementById("clarifications_headline").innerText = headline_values[0].innerText + " clarifications:";
		document.getElementById("clarifications_infotext").innerText = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
		//json_value + " clarifications:";
		console.log("2: JSON.data wird geladen.")
		getJSONdata(json_value);

	}
	else if(document.getElementById("kat2").checked)
	{
		json_value = document.getElementById("kat2").value;
		document.getElementById("clarifications_headline").innerText = headline_values[1].innerText + " clarifications:";
		document.getElementById("clarifications_infotext").innerText = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
		console.log("2: JSON.data wird geladen.")
		getJSONdata(json_value);
	}
	else if(document.getElementById("kat3").checked)
	{
		json_value = document.getElementById("kat3").value;
		document.getElementById("clarifications_headline").innerText = headline_values[2].innerText + " clarifications:";
		document.getElementById("clarifications_infotext").innerText = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
		console.log("2: JSON.data wird geladen.")
		getJSONdata(json_value);
	}
	else
	{
		console.log("2: no radio-button is selected.");
	}
}

//Parse JSON to String Array
function getJSONdata(clarification_typ)
{ 
	console.log(clarification_typ);
	var json_string = "../json/" + clarification_typ;

  $.getJSON(json_string, function(json) 
	{
  		console.log("3: Content of JSON.file", json);
  		rollThroughArray(json);
		happy(json);
  });
}

//iterate through String Array
function rollThroughArray(jsonObject){
	console.log("4: Buttons werden erstellt.")
	document.getElementById('sampleArea').innerHTML = "";

    $.each(jsonObject,function(Index_cla, clarifications)
		{
      //console.log(Index_cla); //JSON Name
      //console.log(clarifications); //Shows the clarifications Object with all it´s sub Items
      $.each(clarifications, function(clarification, index_y)
			{
          //console.log(clarification); //Clarification Name
          //console.log(index_y); //Shows the Function Object with all it´s sub Items
        $.each(index_y, function(Object_key, Object_value)
				{ 
            //console.log(Object_name); useless
            var clarification_data = 
						{

              Clarification_Name:         Object_value.Headline,
              Clarification_Description:  Object_value.Description,
              Clarification_Image_Source: Object_value.Image_source,
              Clarification_Image_Alt:    Object_value.Image_alt,
              //Clarification_Function:     Object_value.function_name //at the moment not in use
            };

            var template = "<div class='clarification_div'><input type='radio' id='{{Clarification_Name}}' name='clarification' value='{{Clarification_Name}}' class='clarification_radiobuttons'><label class='clarification_button' for='{{Clarification_Name}}'><img src='{{Clarification_Image_Source}}' alt='{{Clarification_Image_Alt}}'></label><label class='clarification_label'>{{Clarification_Name}}</label><div>";
            
            var output_position = document.getElementById('sampleArea');
            
            writeMustache(template, clarification_data, output_position);
        });
      });
    });
}

//create a Mustache template
//use Mustache to render a template
function writeMustache(template, data, output_position){
  var output = Mustache.render(template, data);
	var newcontent = output_position.innerHTML + output;

	output_position.innerHTML = newcontent;
	console.log("5: mustache template wird erstellt.")
}

//create Arrays for stored function names
function happy(jsonObject){
	var Clarification_counter = 0;
	var Clarification_Array = [];
	var Clarification_NameArray = [];
	
	$.each(jsonObject,function(Index_cla, clarifications)
	{
  	$.each(clarifications, function(clarification, index_y)
		{
		Clarification_counter = Clarification_counter + 1;
	   	$.each(index_y, function(Object_key, Object_value)
			{ 
			Clarification_Array.push(Object_value.function_name);
			Clarification_NameArray.push(Object_value.Headline);
    		});
		});
	});

	appendClarifications(Clarification_Array, Clarification_NameArray, Clarification_counter);
}

//append the Functions to the Clarifications buttons
function appendClarifications(clarifications_functions, clarification_names, counter)
{
	for (i = 0; i < counter; i++) 
	{ 

		console.log(clarification_names[i]);	

		//Adding Dynamical functions to certain Elements
  		var handler = function(iterator, method)
		{
			console.log(iterator);
			console.log(method[iterator]);

			//calls clarifications_functions[i]
			eval(method[iterator]);
		};

		//onclick
		console.log("6: Funktion auf Button setzten.")
		document.getElementById(clarification_names[i]).onclick = handler.bind("this", i ,clarifications_functions);
		document.getElementById("clarifications").style.display = "inline";

	}
}

//Prototype Functions 
//Simple Placeholder function
function simplyatest()
{
	alert("wuhu");
}

function function_test(){
	alert("You could start a clarification with this button.");
}

function perception1(){
  console.log("WTF");
  chrome.tabs.executeScript(
		{
    	file: 'js/perception1.js'
  	}); 
}

function understandable1(){
  console.log("WTF");
  chrome.tabs.executeScript(
		{
    	file: 'js/understandable1.js'
  	}); 
}

function operable1(){
  console.log("WTF");
  chrome.tabs.executeScript(
		{
    	file: 'js/operable1.js'
  	}); 
}
