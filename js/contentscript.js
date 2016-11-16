//First get all DOM-Elements with Text inside

    var search_terms = [
        "a",
        "p",
        "span",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "img",
        "li"
    ]

    var lorem_ipsum = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.";

    var all_elements_of_searchterm;

    for (e = 0; e < search_terms.length; e++)
    {
        all_elements_of_searchterm = document.getElementsByTagName(search_terms[e]); 

        //Iterate through all captured DOM-Elements

        console.log(all_elements_of_searchterm);
        
        for (i = 0; i < all_elements_of_searchterm.length; i++) { 
            //Here you should translate the text
            try 
            {
                var Length_of_Text = all_elements_of_searchterm[i].textContent.length;
                var new_Text = "";

                for(j = 0; j < Length_of_Text; j++)
                {
                    new_Text = new_Text + lorem_ipsum[j];
                }

                all_elements_of_searchterm[i].textContent = new_Text;    
            }
            catch(err) {
                console.log("Element " + all_elements_of_searchterm[i] + "has no Textcontent." );
                console.log(err);
            }
        }

    }


