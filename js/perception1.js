console.log("contentscript gets executed.");

function text_to_speech(message)
{
    var voice_message = new SpeechSynthesisUtterance(message);

    var voices = window.speechSynthesis.getVoices();
    voice_message.voice = voices[10]; // Note: some voices don't support altering params
    voice_message.voiceURI = 'native';
    voice_message.volume = 1; // 0 to 1
    voice_message.rate = 1; // 0.1 to 10
    voice_message.pitch = 2; //0 to 2
    voice_message.lang = document.documentElement.lang;

    console.log("Voice Language:" + voice_message.lang);
    console.log("Voice Text:" + voice_message.text);
    voice_message.onend = function(e) 
        {
            console.log('Finished in ' + event.elapsedTime + ' seconds.');
        };

    window.speechSynthesis.speak(voice_message);
}

    //Maussteuerung deaktivieren
    document.body.style.pointerEvents  = "none";
    document.body.style.cursor = "none";

    //Hide all Elements
    var x = document.getElementsByTagName("*");
    for(i=0; i<x.length; i++)
    {
        x[i].style.opacity = "0";
    }
    document.body.style.backgroundColor = "black";

    //OnKey Read Event
    document.onkeypress = function (e) {
        e = e || window.event;
        console.log(e);
        console.log(document.activeElement);

        if(e.key == "r")
        {
            try
            {
                if(document.activeElement.tagName == "BODY")
                {
                    console.log("tag: " + document.activeElement.tagName + "ist ausgewählt. Body elemente werden nicht gelesen, da sonst der komplette Webseite Text vorgelesen wird.");
                }
                else
                {         
                    console.log(document.activeElement);
                    console.log(document.activeElement.tagName);
                    text_to_speech(document.activeElement.innerText);
                }
            }
            catch(error)
            {
                console.log(error);
            }
        }
        else
        {
            console.log("not the right key was pressed");
        }
        
        // use e.keyCode
    };