//First get all DOM-Elements with Text inside

    var all = document.getElementsByTagName("h3");
    var allelements = document.querySelectorAll('p,li')

//Iterate through all captured DOM-Elements

    console.log(all);

    for (i = 0; i < all.length; i++) { 
        //Here you should translate the text
        console.log(all[i].textContent);
    }

//Translate via Translation-Service-API the DOM-Elements

    //Before you translate the Text you have to load the Google-API into the document
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'http://www.google.com/jsapi?key=AIzaSyA5m1Nc8ws2BbmPRwKu5gFradvD_hgq6G0';
    document.head.appendChild(script);
    console.log(script);

    //google ist not defined!!!!
    google.load("language", "1");

    function initialize() {

        var all = document.getElementsByTagName("h3");            
        //var text = all[0].textContent;
        var text ="Hello World.";
        console.log(text);

        google.language.translate(text, 'en', 'es', function(result) {
            var translated = document.getElementById("translation");
            if (result.translation) {
                console.log(result.translation);
                }
            });
        }

//Replace the old Text with the translated Text

    //all[i].innerText = "Translated Text";