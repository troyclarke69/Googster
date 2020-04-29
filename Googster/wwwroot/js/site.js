function GetNews(records, country, q) {
    //ex. Top US headlines
    //'https://newsapi.org/v2/top-headlines?' +	'country=' + country +
    //					'&apiKey=de67b2237afe4fb1b77bfbe773987fca';

    //ex. Topic:
    //https://newsapi.org/v2/everything?
    //q=bitcoin&
    //from=2019-10-01&
    //sortBy=publishedAt&
    //apiKey=API_KEY

    // country codes: 'us', 'ca', ...............................

    var API_KEY = "apiKey=de67b2237afe4fb1b77bfbe773987fca";
    var sortBy = "sortBy=publishedAt";
    var dFrom = "from=2019-10-15";
    var dTo = "to=2019-10-31";
    var q = "q=" + q;
    var urlRoot = "https://newsapi.org/v2/";
    var urlTopicPrefix = "everything?";
    var urlCountryPrefix = "country=" + country;
    var amper = "&";
    var pageSize = "pageSize=100"; // 100 max. 20 is default.
    var language = "language=en";

    var url = urlRoot + urlTopicPrefix + q + amper
        + dFrom + amper
        + dTo + amper
        + sortBy + amper
        + pageSize + amper
        + language + amper
        + API_KEY;

    //console.log('country: ' + country);
    //console.log('q: ' + q);

    try {
        //tests >>>
        //var url = 'https://newsapi.org/v2/top-headlines?' +
        //			'country=' + country +
        //				'&apiKey=de67b2237afe4fb1b77bfbe773987fca';
        //var url = 'https://newsapi.org/v2/everything?q=trump&from=2019-10-15&" +
        //			"sortBy=publishedAt&apiKey=de67b2237afe4fb1b77bfbe773987fca';
        //tests <<<

        var req = new Request(url);

        //console.log('url: ' + url);
        fetch(req)
            .then(function(response) {
                //alert("Status: " + response.status);	//200=OK
                return response.json();

            }).then(function(jsonData) {

                //alert("#: " + jsonData.totalResults);
                //alert("Title: " + jsonData.articles[0].title);
                //alert("Desc: " + jsonData.articles[0].description);
                //alert(jsonData.articles[0].publishedAt);
                //alert("Auth: " + jsonData.articles[0].author);
                //alert("URL: " + jsonData.articles[0].url);
                //alert("URLImage: " + jsonData.articles[0].urlToImage);
                //alert("URL: " + jsonData.articles[0].content);

                var strRow = "";
                var strURL = "";

                //determine max loop counter. 
                //If # of records returned is less than param passed, an error will occur.
                //Keep in mind: max. 'pageSize' is 100 so 'records' cannot be set higher than 100.
                if (jsonData.totalResults < records) {
                    records = jsonData.totalResults;
                }

                //var i;
                for (var i = 0; i < records; i++) {

                    strURL = "<a href='" + jsonData.articles[i].url + "' target='_blank'>></a>";

                    strRow += "<tr>" +
                        "<td><em>" + jsonData.articles[i].title + "</em></td>" +
                        "<td>" + jsonData.articles[i].content + "</td>" +
                        "<td><b>" + strURL + "</b></td>" +

                        "</tr>";
                    //console.log(strURL);

                    strURL = "";	//clear temp var			  
                }
                document.getElementById("news").innerHTML = strRow;
            });
    }
    catch (err) {
        alert(err.message);
    }
}