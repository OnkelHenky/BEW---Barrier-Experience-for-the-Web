console.log("contentscript perception_contrast.js gets executed.");

var text = document.getElementsByTagName("p");
console.log(text);

var element = document.getElementsByTagName('body');
console.log(element);
    style = window.getComputedStyle(element);
console.log(style);
    top = style.getPropertyValue('top');
console.log(top);
/*    
for(i=0; i<text.length; i++)
{   
    console.log(text[i]);
    console.log(i);
    
    text[i].style.color = "red";
    var font_color = text[i].style.color;
    console.log(font_color);
    hex2rgb(font_color);
    console.log("Schriftfarbe: " + font_color);
    
    text[i].style.backgroundColor = "blue";
    console.log(background_color);  
    var background_color = text[i].style.backgroundColor;
    console.log("Hintergrundfarbe: " + background_color);
}

function hex2rgb( colour ) 
{
    var r,g,b;
    if ( colour.charAt(0) == '#' ) 
    {
        colour = colour.substr(1);
    }

    r = colour.charAt(0) + '' + colour.charAt(1);
    g = colour.charAt(2) + '' + colour.charAt(3);
    b = colour.charAt(4) + '' + colour.charAt(5);

    r = parseInt( r,16 );
    g = parseInt( g,16 );
    b = parseInt( b,16);

    console.log(r);
    console.log(g);
    console.log(b);
    return rgb( + r + "," + g + "," + b + "");
}

function luminanace(r, g, b) 
{
    var a = [r,g,b].map(function(v) 
    {
        v /= 255;
        return (v <= 0.03928) ?
        v / 12.92 :
        Math.pow( ((v+0.055)/1.055), 2.4 );    
    });

    console.log(a);
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

(luminanace(255, 255, 255) + 0.05) / (luminanace(255, 255, 0) + 0.05); // 1.074 for yellow
(luminanace(255, 255, 255) + 0.05) / (luminanace(0, 0, 255) + 0.05); // 8.592 for blue
// minimal recommended contrast ratio is 4.5 or 3 for larger font-sizes

*/