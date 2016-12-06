//Wait until document has loaded
$(document).ready(function()
{ 
	appendCategoryListeners();
});

//Append Listeners to Category Radiobuttons
function appendCategoryListeners(){
	var categorys = document.getElementsByClassName("category_input");
	console.log(categorys);

	for (var i=0; i < categorys.length; i++)
	{
		categorys[i].onchange = function(){ checkRadioValue();}
		console.log("Listener für Radionbutton " + categorys[i] + "wurde hinzugefügt.");
		console.log(categorys[i]);
	}

}

//Append Listeners to Clarifications Radiobuttons
function appendBarrierListeners(){
	var barriers = document.getElementsByClassName("clarification_radiobuttons");

	for (var i=0; i < barriers.length; i++)
	{
		barriers[i].onchange = function(){ showInformationBox();}
		console.log("Listener für Radionbutton " + barriers[i] + " wurde hinzugefügt.");
		console.log(barriers[i].id);
	}
	
}

//Ausgewählte Kategorie wird überprüft.
function checkRadioValue(){
	console.log("Radio value wird abgefragt.")
	var json_category = "not radiotbutton selected";
	var headline_values = document.getElementsByClassName("category_label");

	//Das onclick event wird vor dem radio-button wechsel gestartet.
	if(document.getElementById("kat1").checked)
	{	
		console.log("kat1 selected");
		json_category = document.getElementById("kat1").value;
		document.getElementById("clarifications_headline").innerText = headline_values[0].innerText;
		document.getElementById("clarifications_infotext").innerText = "Informationen und Bestandteile der Benutzerschnittstelle müssen den Benutzern so präsentiert werden, dass diese sie wahrnehmen können.";
		document.getElementById("auge").src = "images/auge.png";
		document.getElementById("hand").src	= "images/hand_black.png";
		document.getElementById("kopf").src = "images/kopf_black.png";
	}
	else if(document.getElementById("kat2").checked)
	{
		console.log("kat2 selected");
		json_category = document.getElementById("kat2").value;
		document.getElementById("clarifications_headline").innerText = headline_values[1].innerText;
		document.getElementById("clarifications_infotext").innerText = "Bestandteile der Benutzerschnittstelle und Navigation müssen bedienbar sein.";
		document.getElementById("auge").src = "images/auge_black.png";
		document.getElementById("hand").src	= "images/hand.png";
		document.getElementById("kopf").src = "images/kopf_black.png";
	}
	else if(document.getElementById("kat3").checked)
	{
		console.log("kat3 selected");
		json_category = document.getElementById("kat3").value;
		document.getElementById("clarifications_headline").innerText = headline_values[2].innerText;
		document.getElementById("clarifications_infotext").innerText = "Informationen und Bedienung der Benutzerschnittstelle müssen verständlich sein.";
		document.getElementById("auge").src = "images/auge_black.png";
		document.getElementById("hand").src	= "images/hand_black.png";
		document.getElementById("kopf").src = "images/kopf.png";
	}
	else
	{
		console.log("Kein Radiovalue konnte ausgewählt werden.");
		return;
	}

	console.log("JSOn File wurde ausgewählt.");
	console.log(json_category);
	//Text for later usage
	document.getElementById("category_value").innerText = json_category;

	document.getElementById("clarification_details").style.display = "none";
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

            var template = "<div class='clarification_div'><input type='radio' id='{{Clarification_Name}}' name='clarification' value='{{Clarification_Description}}' class='clarification_radiobuttons'><label class='clarification_button' for='{{Clarification_Name}}'><img src='{{Clarification_Image_Source}}' alt='{{Clarification_Image_Alt}}'></label><label class='clarification_label'>{{Clarification_Name}}</label></div>";
            
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

//Write Informationen for each Clarification 
function showInformationBox()
{
	//var selected_id = $('input[name=clarification]:checked', '#clarification_form').val();
	var selected_id = $('input[name=clarification]:checked', '#clarification_form').attr('id');
	console.log(selected_id);

	//Ändern
	console.log("Die openJSON function wurde gestartet.");
	var category_value = document.getElementById("category_value").innerText;
	console.log("Ausgewählte Kategorie: " + category_value);
	var json_string = "../json/" + category_value;

  	$.getJSON(json_string, function(jsonObject) 
		{
			console.log(jsonObject);
			//Informationen anzeigen (json);
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
						if(Object_value.Headline == selected_id)
						{
							var clarification_data = 
									{
										Clarification_Name:         Object_value.Headline,
										Clarification_Description:  Object_value.Description,
										Clarification_Information:	Object_value.Helping_information,
										Clarification_Link:			Object_value.Helping_link
									};

							var template = "<h2>{{Clarification_Name}}</h2><div><h3>Beschreibung</h3><p>{{Clarification_Description}}</p></div><div><h3>Hilfsmittel</h3><p>{{Clarification_Information}}</p><a href='{Clarification_Link}' target='blank'>weitere Hilfen</a></div><button type='button' id='start_button'>Barriere starten</button>";
							var output_position = document.getElementById("clarification_details");
							writeMustache(template, clarification_data, output_position, 1);

							document.getElementById("clarification_details").style.display = "inline";
							console.log(Object_value.function_name);

							document.getElementById("start_button").onclick = eval(Object_value.function_name);
							"eval is evil"
							return;
						}
						});
					});
				});
		});
}

//Sicherheitshinweis bevor die Funktionen gestartet werden
/*
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
*/

//JSON File wird geladen und weiter verarbeitet
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