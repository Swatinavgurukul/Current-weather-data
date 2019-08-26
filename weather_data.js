const http =require('http')
const fs = require('fs')
const request=require('request');
var readlineSync = require('readline-sync');
var cityName = readlineSync.question('Inter the city name : - ');
var weatherUrl=`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=4dd1ac5a32c35cde09f36265c3c2cf94`
    
request(weatherUrl,{json:true},(err,body)=>{
    http.createServer((req,res)=>{
        if(req.url==="/request"){
            response=body.body
            res.write(JSON.stringify(response));
            let data = JSON.stringify(response);
            console.log(data)
            fs.writeFileSync('wetherData.json', data);
            fs.readFile('./wetherData.json', 'utf8', function(err, contents) {
                if (err) {
                  console.log(err)
                } else {
                  const data = JSON.parse(contents);
                //   console.log(data)
                  var name=data["name"];
                //   console.log(name)
                  var id = data["id"];
                //   console.log(id)
                  var cod = data["cod"];
                //   console.log(cod)
                  var lon = data.coord.lon;
                //   console.log(lon)
                  var lat = data.coord.lat;
                //   console.log(lat)
                  let wether = { 
                      name:[name],
                      id: id,
                      cod:cod,
                      lon: lon,
                      lat: lat
              };   
                    let dataWether = JSON.stringify(wether);
                    console.log(dataWether)
                    fs.writeFileSync('wetherParticularData.json', dataWether);
                }
              });          
            res.end();
        }
    }).listen(3000);
    console.log("service running on 3000 port....");
});  


