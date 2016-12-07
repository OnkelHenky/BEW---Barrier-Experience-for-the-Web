console.log("contentscript gets executed.");
//First get all DOM-Elements with Text inside

    var replacement_words = ["lorem", "dolor", "consetutur", "sadipscing", "aliquyam", "takimata", "eirmod"];
    var replacement_counter = 0;
    //ReadingLevel Children
    var ReadingLevel = 90;

    //Durchschnittliche Silbenlänge
    var SOLL_ASL = 3.8;

    var elements_of_searchterm;

    elements_of_searchterm = document.getElementsByTagName("p"); 
        
    for (i = 0; i < elements_of_searchterm.length; i++) 
    {
        var element_content = elements_of_searchterm[i].innerHTML;
        element_content = element_content.replace(/<[^>]*>/g, "");
        
        //Anzahl der Wörter aus element_content beziehen
        var words_in_text   = element_content.split(" ").length;
        console.log("Amount of Word in Text: " + words_in_text);

        //Anzahl der Sätze aus element_content beziehen
        var sentence_in_text   = element_content.split(".").length;
        console.log("Sentence in Text: " + sentence_in_text);

        //Average Sentence length
        var ASL = words_in_text / sentence_in_text;
        console.log("Average Sentence length: " + ASL);

        var symbols_1  = element_content.split(",").length;
        var symbols_2  = element_content.split(":").length;
        var symbols_3  = element_content.split(";").length;

        //Anzahl der Silben im Wort aus element_content beziehen
        var syllables_in_text   = (element_content.length - symbols_1 - symbols_2 - symbols_3 - sentence_in_text - words_in_text)/SOLL_ASL;
        console.log("Syllabeles in Text: " + syllables_in_text);
        
        //Average Number of Syllabeles per words_in_text
        var ASW = syllables_in_text / words_in_text;
        console.log("Average Number of Syllabeles per word: " + ASW);

        var FleschValue = 180 - ASL - (58.5 * ASW);
        console.log("The readiablity value of the text is: " +  FleschValue);

        if(FleschValue > 100)
        {
            console.log("Text to short for calculating credible FleschValue.");
            console.log("###################################################");
        }

        if(FleschValue < ReadingLevel)
        {
            var array_of_words = element_content.split(" ");
            for(var j=0; j < array_of_words.length; j++)
            {
                var word_length = array_of_words[j].length;
                
                if (word_length > 7)
                {
                    array_of_words[j] = replacement_words[replacement_counter];
                
                    if(replacement_counter+1 == replacement_words.length)
                    {
                        replacement_counter = 0;
                    }
                    else
                    {
                        replacement_counter++;
                    }
                }
            }

            element_content = "";

            for(var k=0; k < array_of_words.length; k++)
            {
                element_content = element_content + array_of_words[k] + " "; 
            }

            elements_of_searchterm[i].innerHTML = element_content;
        }
}



