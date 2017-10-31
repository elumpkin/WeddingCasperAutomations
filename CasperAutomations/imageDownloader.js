const sql = require('mssql')

var fs = require('fs');

//function getImages(req, res) { 
  var config = {
    user: 
    password: 
    server:  
    database: 
  };
  var text = fs.readFileSync('');
  var textByLine = text.toString().split("\r\n");
 // console.log("textByLine " + textByLine);

  sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
        for (var i = 0; i < textByLine.length -1 ; i ++){    
        // query to the database and get the records
         
          if (i < textByLine.length -2){
            request.query(textByLine[i]);
          } else if (i == textByLine.length -2){
            request.query(textByLine[i]);
            
            request.query(
              `WITH x as(
              SELECT ROW_NUMBER() OVER (PARTITION BY [URL]
                                        ORDER BY  URL DESC ) RN
              FROM   WeddingDB.dbo.Photos)
            delete from x where RN>1`).then(sql.close);
          }
          
        }
        
       // request.done(console.log("That's all folks"));
});
 
//};

//getImages();
