//Parse JSON to String Array
function getJSONdata()
{
    //has data to be on a server?
    //using the personabrowser Server?
}

//read single Items from String Array
function readNestedArray()
{

}

//iterate through String Array
function rollThroughArray()
{
  //Test Loop
  for (i = 0; i < 3; i++) 
  {
     console.log(new Date());
  }
}

//create a Mustache template
//use Mustache to render a template
function writeMustache()
{
    var template = "<h4> {{ Headline }} </h4> <p> {{ Description }} </p>";
    var output = Mustache.render(template, data);
    document.getElementById('sampleArea').innerHTML = output;
}

$(document).ready(function()
{
  //call functions
  rollThroughArray();
});
