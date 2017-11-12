var prefix = './output';
var extension = '.wav';
var num_clips = 6;

var url = "https://speech.platform.bing.com/speech/recognition/interactive/cognitiveservices/v1?language=en-US&format=detailed";
var method = "POST";
var postData = "Some data";

// You REALLY want shouldBeAsync = true.
// Otherwise, it'll block ALL execution waiting for server response.
var shouldBeAsync = false;// temporary hack to get around async annoying. todo: fix

var request = [];
for (let i = 0; i < num_clips; i++) {
    request[i] = new XMLHttpRequest();

    request[i].open(method, url, shouldBeAsync);
    request[i].setRequestHeader("Accept", "application/json;text/xml");
    request[i].setRequestHeader("Content-Type", "audio/wav; codec=audio/pcm; samplerate=16000");
    request[i].setRequestHeader("Ocp-Apim-Subscription-Key", getKey(readTextFile("keys")));
    request[i].onload = function () {
       // You can get all kinds of information about the HTTP response.
       status = request[i].status; // HTTP response status, e.g., 200 for "200 OK"
       data = request[i].responseText; // Returned data, e.g., an HTML document.
        // console.log(data);
        console.log((JSON.parse(data))["NBest"][0]["Display"]);
    };
}
var status;
var data;

// returns a list of line-by-line content in the file
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
                allText = rawFile.responseText.split(/\r?\n/);
                // alert(allText);
            }
        }
    }
    rawFile.send(null);
    return allText;
}
// gets key from a string array that was generated by readTextFile
function getKey(stringArray){
    return stringArray[1].substring(7);
}

// request.setRequestHeader("Host", "speech.platform.bing.com");
// request.setRequestHeader("Transfer-Encoding", "chunked");
// request.setRequestHeader("Expect", "100-continue");
var xhr = [];

for (let i = 0; i < num_clips; i++) {
    xhr.push(0);
}
for (let clip = 0; clip < num_clips; clip++) {
    var filename = prefix + (clip + 1) + extension;
    console.log('current clip: ' + filename);
    xhr[clip] = new XMLHttpRequest();
    xhr[clip].open("GET", filename);
    xhr[clip].responseType = "blob";
    var response = null;

    xhr[clip].onload = function() 
    {
        // analyze_data(xhr.response);
        // console.log(xhr[clip].response);
        request[clip].send(xhr[clip].response);
    }

    xhr[clip].send();
    // Actually sends the request to the server.
}
