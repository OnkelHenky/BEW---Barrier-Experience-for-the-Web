//Wait until document has loaded
$(document).ready(function()
{ 
	appendCategoryListeners();
});

//Append Listeners to Category Radiobuttons
function appendCategoryListeners(){
	var categorys = document.getElementsByClassName("category_input");
	
	for (var i=0; i < categorys.length; i++)
	{
		categorys[i].onchange = function(){ checkRadioValue();}
		console.log("Listener für Radionbutton " + categorys[i] + "wurde hinzugefügt.");
	}

}

function appendBarrierListeners(){
	var barriers = document.getElementsByClassName("clarification_radiobuttons");

	for (var i=0; i < barriers.length; i++)
	{
		//barriers[i].onchange = function(){ //checkRadioValue();}
		console.log("Listener für Radionbutton " + barriers[i] + " wurde hinzugefügt.");
		console.log(barriers[i].id);
	}
	
}

//Ausgewählte Kategorie wird überprüft.
function checkRadioValue(){
	console.log("Radio value wird abgefragt.")
	var json_category;
	var headline_values = document.getElementsByClassName("category_label");

	//Das onclick event wird vor dem radio-button wechsel gestartet.
	if(document.getElementById("kat1").checked)
	{
		json_category = document.getElementById("kat1").value;		
		document.getElementById("clarifications_headline").innerText = headline_values[0].innerText + " clarifications:";
		document.getElementById("clarifications_infotext").innerText = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.";		
	}
	else if(document.getElementById("kat2").checked)
	{
		json_value = document.getElementById("kat2").value;
		document.getElementById("clarifications_headline").innerText = headline_values[1].innerText + " clarifications:";
		document.getElementById("clarifications_infotext").innerText = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.";
	}
	else if(document.getElementById("kat3").checked)
	{
		json_value = document.getElementById("kat3").value;
		document.getElementById("clarifications_headline").innerText = headline_values[2].innerText + " clarifications:";
		document.getElementById("clarifications_infotext").innerText = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.";
	}
	else
	{
		console.log("Kein Radiovalue konnte ausgewählt werden.");
		return;
	}

	console.log("JSOn File wurde ausgewählt.");
	//Text for later usage
	document.getElementById("category_value").innerText = json_category;
	document.getElementById("category_value").style.display = "none";
	openJSON_forBarriers(json_category);
}

//Buttons für einzelne Barrieren der ausgewählten Kategorien erstellen.
function create_barrier_buttons(jsonObject){
	console.log("Barriere Buttons werden erstellt.");
	console.log(jsonObject);
	document.getElementById('barrier_button_area').innerHTML = "";

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
            			};

            var template = "<div class='clarification_div'><input type='radio' id='{{Clarification_Name}}' name='clarification' value='{{Clarification_Description}}' class='clarification_radiobuttons'><label class='clarification_button' for='{{Clarification_Name}}'><img src='{{Clarification_Image_Source}}' alt='{{Clarification_Image_Alt}}'></label><label class='clarification_label'>{{Clarification_Name}}</label><div>";
            
            var output_position = document.getElementById('barrier_button_area');
            
            writeMustache(template, clarification_data, output_position, 0);
			appendBarrierListeners();
        });
      });
    });
}

//create a Mustache template
//use Mustache to render a template
function writeMustache(template, data, output_position, type){
  var output = Mustache.render(template, data);

	if(type == 0)
	{
			output_position.innerHTML = output_position.innerHTML + output;
			console.log("Mustache template wird erstellt.")
			document.getElementById("clarifications").style.display = "inline";
	}
	else if(type == 1)
	{
			output_position.innerHTML = output;
			console.log("Mustache template für infobox wird erstellt.")
			document.getElementById("clarification_details").style.display = "inline";
	}	
}

/*
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
*/

function show_clarification_details()
{
	//data???
	var template = "<h2>{{clarification_name}}</h2><div><h3>Description</h3><p>{{Clarification_Description}}</p></div><div><h3>Possible Solutions</h3><p>{{Clarification_Information}}</p></div><button type='button'>start clarification</button>";
	var output_position = document.getElementById("clarification_details");
	//writeMustache(template, data, output_position, 1)
	//appendfunction to button
}

//Prototype Functions 
//Simple Placeholder function
function function_test(){
	alert("You could start a clarification with this button.");
}

function security_hint() {
    var decision_value;
    
	if (confirm(`The following function can destroy the user experience of the site and will reduce your control over the website. 
	\nIf you want to escape from the changed enviroment press the F5-Key to reload the page with the default-settings.
	\n\nclick OK to start the experience or press cancel.`) == true)
	{
        decision_value = true;
    } 
	else 
	{
        decision_text = false;
    }

	return decision_value
}

function perception1(){
  if(security_hint())
  {
	chrome.tabs.executeScript(
			{
			file: 'js/perception1.js'
		}); 
  }
}

function understandable1(){
  if(security_hint())
  {
	chrome.tabs.executeScript(
			{
			file: 'js/perception1.js'
		}); 
  }
}

function operable1(){
  if(security_hint())
  {
	chrome.tabs.executeScript(
			{
			file: 'js/perception1.js'
		}); 
  }
}

//??????
function openJSON_forBarriers(category_value)
{	
	console.log("Die openJSON function wurde gestartet.");
	console.log("Ausgewählte Kategorie: " + category_value);

	var json_string = "../json/" + category_value;
  	$.getJSON(json_string, function(json) 
		{
			console.log(json);
			create_barrier_buttons(json);
  		});
}

//??????
function openJSON_forInformations(category_value)
{	
	console.log("Die openJSON function wurde gestartet.");
	console.log("Ausgewählte Kategorie: " + category_value);

	var json_string = "../json/" + category_value;
  	$.getJSON(json_string, function(json) 
		{
			console.log(json);
			//Informationen anzeigen (json);
  		});
}