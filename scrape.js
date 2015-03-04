var request = require('request');
var cheerio = require('cheerio');
var azure = require('azure-storage');

var trinn = '4';
var parallell = 'C';
var ukeplaner = {};
var domenenavn = 'http://www.trasop.gs.oslo.no';


var blobSvc = azure.createBlobService();

blobSvc.createContainerIfNotExists('mycontainer', function(error, result, response){
  if(!error){
    // Container exists and allows 
    // anonymous read access to blob 
    // content and metadata within this container
  }
});


request(domenenavn + '/aktuelt/Ukeplaner/' + trinn + '.trinn.html', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);

    /* find a elements with text in ['A', 'B', 'C', 'D', 'F'] and href = '*.pdf' */
    $('a[href$=".pdf"]').each(function(i, elem) {
    	ukeplaner[$(this).text().trim()] = $(this).attr('href').replace('../..', domenenavn);

    });

    console.log(ukeplaner);
    
  }
});