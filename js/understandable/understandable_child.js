console.log("contentscript gets executed.");
//First get all DOM-Elements with Text inside

    var replacement_words = ["lorem", "dolor", "consetutur", "sadipscing", "aliquyam", "takimata", "eirmod"];
    //ReadingLevel Children
    var ReadingLevel = 90;

    //Durchschnittliche Silbenlänge
    var soll_asl = 3.8;

    var elements_of_searchterms;

    elements_of_searchterms = document.getElementsByTagName("p"); 
        
    for (i = 0; i < elements_of_searchterms.length; i++) 
    {
        var element_content = elements_of_searchterms[i].innerHTML;
        element_content = stripText(element_content);
        
        var asl = calcASL(element_content);
        var asw = calcASW(element_content, soll_asl);
        var FleschValue = calcFleschValue(asl, asw)
    
        checkFleschValue(element_content, FleschValue, ReadingLevel, replacement_words)
}

function stripText(element_content)
{
    nakedText = element_content.replace(/<[^>]*>/g, "");
    return nakedText;
}

function calcASL(element_content)
{
    //Anzahl der Wörter aus element_content beziehen
        var words_in_text   = element_content.split(" ").length;
        console.log("Amount of Word in Text: " + words_in_text);

        //Anzahl der Sätze aus element_content beziehen
        var sentence_in_text   = element_content.split(".").length;
        console.log("Sentence in Text: " + sentence_in_text);

        //Average Sentence length
        var asl = words_in_text / sentence_in_text;
        console.log("Average Sentence length: " + asl);

        return asl;
}

function calcASW(element_content, soll_asl)
{
        var sentence_in_text   = element_content.split(".").length;
        var words_in_text   = element_content.split(" ").length;
        var symbols_1  = element_content.split(",").length;
        var symbols_2  = element_content.split(":").length;
        var symbols_3  = element_content.split(";").length;

        //Anzahl der Silben im Wort aus element_content beziehen
        console.log(element_content.length);
        console.log(symbols_1);
        console.log(symbols_2);
        console.log(symbols_3);
        console.log(sentence_in_text);
        console.log(words_in_text);
        console.log(soll_asl);
        var syllables_in_text = (element_content.length - symbols_1 - symbols_2 - symbols_3 - sentence_in_text - words_in_text)/soll_asl;
        console.log("Syllabeles in Text: " + syllables_in_text);
        
        //Average Number of Syllabeles per words_in_text
        var asw = syllables_in_text / words_in_text;
        console.log("Average Number of Syllabeles per word: " + asw);

        return asw;
}

function calcFleschValue(asl, asw)
{
        console.log(asl);
                console.log(asw);
        var FleschValue = 180 - asl - (58.5 * asw);
        console.log("The readiablity value of the text is: " +  FleschValue);

        return FleschValue;
}

function checkFleschValue(Textcontent, FleschValue, ReadingLevel, replacement_words)
{
        var replacement_counter = 0;

        if(FleschValue > 100)
        {
            console.log("Text to short for calculating credible FleschValue.");
            console.log("###################################################");
        }

        if(FleschValue < ReadingLevel)
        {
            var array_of_words = Textcontent.split(" ");
            for(var j=0; j < array_of_words.length; j++)
            {
                var word_length = array_of_words[j].length;               
                if (word_length > 10)
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

            Textcontent = "";
            for(var k=0; k < array_of_words.length; k++)
            {
                Textcontent = Textcontent + array_of_words[k] + " "; 
            }
            elements_of_searchterms[i].innerHTML = Textcontent;
        }
}



