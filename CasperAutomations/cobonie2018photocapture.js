function casperPhotoURLGrab(){
    phantom.casperPath = "C:/casperjs";
    phantom.injectJs(phantom.casperPath + '/bin/bootstrap.js');
 
    var utils = require('utils');
    var casper = require('casper').create({
        verbose: true,
        logLevel: 'error' 
    });
          
    var allArgs = casper.cli.args;
    var x = require('casper').selectXPath;

    var successSteps = 0;
    casper.echo("***Welcome. Let's have some fun! :D***");

    url = casper.start('https://www.instagram.com/explore/tags/cobonie2018/',function(){
    
    successSteps++;

    this.wait(9000,function(){
        casper.capture('.\\CasperImages\\InstagramGrab_A_cs.png');
    });

    this.echo('Page retrieved: '+this.getTitle());
    url = casper.evaluate(function(){
    
            var url2 = [];
            var images = document.querySelectorAll('._2di5p');
            
            for (var i = 0; i < images.length; i++) {
                var image = images[i];
                //you can't pass dom elements out of casper.evaluate,so you need to get the outer HTML
                url2[i] =  images[i].outerHTML.slice(images[i].outerHTML.indexOf("h") ).split("jpg")[0]+'jpg' ;            
            }
        
            return url2;
        });
        
    var fs = require('fs');     
    casper.echo("URL:  " +url[0].toString());
    for (var i = 0; i < url.length  ; i++) {
        var file = url[i].toString();

        casper.echo("URL2 :  " +url[i]);
        if (i == 0){
            fs.write('', 
            'insert into WeddingDB.dbo.Photos("URL", "Date") values ( \'' + url[i] + '\', getdate())' + "\r\n", 'w');
            casper.echo("file  :  " + file );
        }else {
            fs.write('', 
            'insert into WeddingDB.dbo.Photos("URL", "Date") values ( \'' + url[i] + '\', getdate())' + "\r\n", 'a');
            casper.echo("file  :  " + file);
        } 
    }
    });	


    casper.then(function(){
        if(successSteps==1){
            this.echo("SCRIPT-STATUS:SUCCESS");
        }else{
            this.echo("SCRIPT-STATUS:FAILED");
        }
        this.echo('Bye bye! :D');
        casper.exit();
    });

    casper.run();
}
casperPhotoURLGrab();

