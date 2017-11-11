var filename = 'output.mp3';

var url = "https://speech.platform.bing.com/speech/recognition/interactive/cognitiveservices/v1?language=en-US&format=detailed";
var method = "POST";
var postData = "Some data";

// You REALLY want shouldBeAsync = true.
// Otherwise, it'll block ALL execution waiting for server response.
var shouldBeAsync = true;

var request = new XMLHttpRequest();
var status;
var data;
request.onload = function () {
   // You can get all kinds of information about the HTTP response.
   status = request.status; // HTTP response status, e.g., 200 for "200 OK"
   data = request.responseText; // Returned data, e.g., an HTML document.
};

request.open(method, url, shouldBeAsync);

request.setRequestHeader("Accept", "application/json;text/xml");
request.setRequestHeader("Content-Type", "audio/mpeg; codec=audio/mpga; samplerate=44100");
function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    var allText;
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                allText = rawFile.responseText;
                // alert(allText);
            }
        }
    }
    rawFile.send(null);
    return allText;
}
console.log(readTextFile("keys"));
request.setRequestHeader("Ocp-Apim-Subscription-Key", readTextFile("keys"));
// todo: put api key here, retrieving it from a file. DO NOT put it in plaintext. probably for hackathon purposes just stick it into a gitignored text file. 
request.setRequestHeader("Host", "speech.platform.bing.com");
request.setRequestHeader("Transfer-Encoding", "chunked");
request.setRequestHeader("Expect", "100-continue");

// Actually sends the request to the server.
// request.send(postData);

// console.log(status);
// console.log(data);