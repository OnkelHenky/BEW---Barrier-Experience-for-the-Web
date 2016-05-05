$(document).ready(function()
{
  getPersonas();
  swap_image();
  cross_domain_getJSON();
});

function getPersonas()
{

  req = new XMLHttpRequest();
  req.open('GET', 'personas.json', true);
  updatePersona(req);
}

//Dynamic creating HTML-Templates from JSON
function updatePersona(json_data)
{
        //json/personas.json
        $.getJSON('json/personas.json', function(data)
  {
        alert(data);
        var template = $('#persona_template').html();
        var output = Mustache.render(template, data);
        document.getElementById('profiles').innerHTML = output;
  });
}

//Function changes the Icons below the Personas
function swap_image()
{
  $.getJSON('json/personas.json', {}, function(data)
  {
    var icons_eye = document.getElementsByClassName('icon_eye');
    for(var i = 0; i < icons_eye.length; i++)
    {
      var icon = icons_eye[i];
      if(hasClass(icon) )
      {icon.src = "img/auge.png"}
      else
      {icon.src = "img/auge_black.png"}
    }

    var icons_ear = document.getElementsByClassName('icon_ear');
    for(var i = 0; i < icons_ear.length; i++)
    {
      var icon = icons_ear[i];
      if(hasClass(icon) )
      {icon.src = "img/ohr.png"}
      else
      {icon.src = "img/ohr_black.png"}
    }

    var icons_arm = document.getElementsByClassName('icon_arm');
    for(var i = 0; i < icons_arm.length; i++)
    {
      var icon = icons_arm[i];
      if(hasClass(icon) )
      {icon.src = "img/hand.png"}
      else
      {icon.src = "img/hand_black.png"}
    }

    var icons_head = document.getElementsByClassName('icon_head');
    for(var i = 0; i < icons_head.length; i++)
    {
      var icon = icons_head[i];
      if(hasClass(icon) )
      {icon.src = "img/kopf.png"}
      else
      {icon.src = "img/kopf_black.png"}
    }
  });
}

//Helper Function for swap_image
function hasClass(dom_obj)
{
  var boolean_result;
  if(dom_obj.classList.contains("true"))
  {boolean_result = true;}
  else
  {boolean_result = false;}
  return boolean_result;
}

//Test Function for accessing cross domain json_data
function cross_domain_getJSON()
{
  $.getJSON('http://personabrowser.gpii.eu/test.php?jsonp=?', function(data)
  {

    alert(data);
  });
}
