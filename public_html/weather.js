/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
// Array for saved cities
 var savedCities = [];

$( document ).ready(function(){
       
    // Function when search button is pressed   
    $('#Weather').click(function(e){    
        e.preventDefault();
        // name of the city
        var city = $('#city').val();
        $("#error").html('');
        // if city field is not empty, program will fetch the weather information from that city using openweathermap API
        if(city){
            $.ajax({
                type: "GET",
                url: 'http://api.openweathermap.org/data/2.5/weather?q=' +city+ '&units=metric&APPID=f9f6afb5c2a23a4f1fcb8f8e15c32be7',
                dataType: 'jsonp',
                
                // The information will be added to html document, into div (id=show)
                success: function(data){
                    var widget = show(data);
                    $("#show").html(widget);
                }
            });
        }else{
            //if the field is empty, the message will be shown
             $("#error").html("Can't be empty!");
        }
        
        
    });
    // Function when save button is pressed
    $('#Save').click(function(e){
        var list = '';
        e.preventDefault();
        var city = $('#city').val();
        // if the array does not contain the city already, it is added to it
        if($.inArray(city, savedCities)===-1){
            savedCities.push(city);
        }
        $("#error").html('');
        // The program will fetch the weather information from all of the saved cities
        for (i = 0; i < savedCities.length; i++){
                var location =savedCities[i];
                $.ajax({
                    type: "GET",
                    url: 'http://api.openweathermap.org/data/2.5/weather?q=' +location+ '&units=metric&APPID=f9f6afb5c2a23a4f1fcb8f8e15c32be7',
                    dataType: 'jsonp',
                    // The weather information will be added to a list and shown in html document in div (id=list)
                    success: function(data){
                        var widget = show(data);
                        list+=widget;
                        $("#list").html(list);
                }
                
            });
            
        }
         
    });
    
    });
    // Function that formats the weather information in a form that is easy to read
    function show(data){
        return "<h2>Weather in "+data.name+"</h2>\n\n\
        <text>Temperature: "+data.main.temp+" &deg;C</text></br>\
        <text>Maximum temperature: "+data.main.temp_max+" &deg;C</text></br>\n\
        <text>Minimum temperature: "+data.main.temp_min+" &deg;C</text></br>\n\
        <text>Description of the weather: " +data.weather[0].description+"</text> </br>\n\
        <text>Wind speed: "+data.wind.speed+" m/s</text></br>\
        <img src='http://openweathermap.org/img/w/"+data.weather[0].icon+".png'>";
    }
    
    

