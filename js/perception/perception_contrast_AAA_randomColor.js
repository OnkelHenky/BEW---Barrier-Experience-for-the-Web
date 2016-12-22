console.log("contentscript perception_contrast.js gets executed.");

var searchterms = ["body", "div", "span", "a"];
//Change goal_values for different Guideline
var goal_contrast_normal =  7;
var goal_contrast_large	 =	4.5;
var large_textsize		 =	18.66;

for(var i=0; i < searchterms.length; i++)
{
	var elements_of_searchterms = document.getElementsByTagName(searchterms[i]);
	for(var j=0; j < elements_of_searchterms.length; j++)
	{
		try
		{
			var background 	= getComputedStyle(elements_of_searchterms[j], null).getPropertyValue("background-color");
			console.log(background);
			background 		= convertRGBtoHEX(background);			
			var font		= getComputedStyle(elements_of_searchterms[j], null).getPropertyValue("color")
			font			= convertRGBtoHEX(font);

			var fontsize 	= getComputedStyle(elements_of_searchterms[j], null).getPropertyValue("font-size");
			fontsize_number	= fontText_toNumber(fontsize);
			var contrast 	= checkcontrast(background, font); 
			console.log("fontsize: " + fontsize_number + ", backgroundColor: " + background + ", fontColor: " + font + ", contrast: " + contrast + ":1");

			if(fontsize_number > large_textsize)
			{
				while(contrast > goal_contrast_large)
				{	
					background = randomize_color(background);
					font	   = randomize_color(font);
					contrast = checkcontrast(background, font);
			console.log("fontsize: " + fontsize_number + ", backgroundColor: " + background + ", fontColor: " + font + ", contrast: " + contrast + ":1");
				}
			}
			else
			{
				while(contrast > goal_contrast_normal)
				{	
					background = randomize_color(background);
					font	   = randomize_color(font);
					contrast = checkcontrast(background, font);
			console.log("fontsize: " + fontsize_number + ", backgroundColor: " + background + ", fontColor: " + font + ", contrast: " + contrast + ":1");
				}
			}
			elements_of_searchterms[j].style.backgroundColor = "#" + background;
			elements_of_searchterms[j].style.color			= "#" + font;
		}
		catch(error)
		{
			console.log("Calculation is not successfull: " + error);
		}
	}
}

function fontText_toNumber(FontTextSize){
	var number ="";
	for(var i=0; i<FontTextSize.length-2; i++)
	{
		number = number + FontTextSize[i];
	}
	FontTextSize = number;
	return number;
}

function randomize_color(color){
	var color_value = "";
	for(var i=0; i<color.length; i++)
	{	
		var random_value = Math.floor((Math.random() * 15));
		color_value = color_value + pickHEXvalue(random_value);
	}
	return color_value
}

function reduce_luminance(color){
	for(var i=0; i<color.length; i++)
	{
		var new_value = HexToNumber(color[i]);
		new_value = new_value - 1;
		color[i] =  pickHEXvalue(new_value);
	}
	return color
}

function increase_luminance(color){
	for(var i=0; i<color.length; i++)
	{
		var new_value = HexToNumber(color[i]);
		new_value = new_value + 1;
		color[i] =  pickHEXvalue(new_value);
	}
	return color;
}

function HexToNumber(HEX){
	switch(HEX) 
	{
	case "A":
		return 10;
	case "B":
		return 11;
	case "C":
		return 12;
	case "D":		
		return 13;
	case "E":
		return 14;
	case "F":		
		return 15;
	default:
		return HEX;
	}
}

function pickHEXvalue(number){
	//http://www.w3schools.com/colors/colors_picker.asp
	switch(number) 
	{
	case 10:
		return "A";
	case 11:
		return "B";
	case 12:
		return "C";
	case 13:		
		return "D";
	case 14:
		return "E";
	case 15:		
		return "F";
	default:
		return number.toString();
	}
}

function convertRGBtoHEX(color){
	if(color[0] == "#")
	{
		return color;
	}
	else if(color[3] == "a")
	{
		//Convert from rgba to hex
		//throws error
		return color;
	}
	else
	{	
		var parts = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
		delete(parts[0]);
		for (var i=1; i<=3; ++i)
		{
			parts[i] = parseInt(parts[i]).toString(16);
			if(parts[i].length == 1) parts[i] = '0' + parts[i];
		}

		color = parts.join('');
		return color;
	}
}

function checkcontrast(background, font){	
	var color=font;
	var bgcolor=background;

	var L1 = getL(color);
	var L2 = getL(bgcolor);

	var ratio 	= (Math.max(L1, L2) + 0.05)/(Math.min(L1, L2) + 0.05);
	ratio 		= Math.round(ratio*100)/100;
	return ratio;
}

function getL(color){
	if(color.length == 3) {
		var R = getsRGB(color.substring(0,1) + color.substring(0,1));
		var G = getsRGB(color.substring(1,2) + color.substring(1,2));
		var B = getsRGB(color.substring(2,3) + color.substring(2,3));
		update = true;
	}
	else if(color.length == 6) {
		var R = getsRGB(color.substring(0,2));
		var G = getsRGB(color.substring(2,4));
		var B = getsRGB(color.substring(4,6));
		update = true;
	}
	else {
		update = false;
	}
	if (update == true) {
		var L = (0.2126 * R + 0.7152 * G + 0.0722 * B);
		return L;
	}
	else {
		return false;
	}
	
}

function getsRGB(color){
	color=getRGB(color);
	if(color!==false) {
		color = color/255;
		color = (color <= 0.03928) ? color/12.92 : Math.pow(((color + 0.055)/1.055), 2.4);
		return color;
	}
	else { 
		return false;
	}
}

function getRGB(color){
	try {
		var color = parseInt(color, 16);
	}
	catch (err) {
		var color = false;
	}
	return color;
}