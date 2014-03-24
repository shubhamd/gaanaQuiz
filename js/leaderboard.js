     
    // In order to use the various functions available under a particular API, a developer will have to call the   
    // App42.initialize method by passing the apiKey and the secretKey.  

App42.initialize("fc3920dd1a276bddbcd4fae03c1a87d6d04d3294d165262fad4de9e243b0fdd6","4906ed1022c0b33700f59a9e59d521db8942a73f402ba3c4d884fab22ceb8da0");  
        var scoreBoardService  = new App42ScoreBoard();   
        var gameName = "ggaammee",  

    userName = "Bond" ; 


function saveScore(gameScore){    
    scoreBoardService.saveUserScore(gameName,userName,gameScore,{    
        success: function(object)   
        {    
            var game = JSON.parse(object);    
            result = game.app42.response.games.game;  
            console.log("gameName is : " + result.name)  
            var scoreList = result.scores.score;  
            console.log("userName is : " + scoreList.userName)  
            console.log("scoreId is : " + scoreList.scoreId)  
            console.log("value is : " + scoreList.value)  
        },    
        error: function(error) {    
        }    
    });   

   } 


function getBoard(){
   $("#brd").click();
   Sounds.bg.stop();
   scoreBoardService.getTopNRankings(gameName,5,{     
    success: function(object)   
    { var sb = "" ;   
        var game = JSON.parse(object);    
        result = game.app42.response.games.game;  
        console.log("gameName is : " + result.name)  
        var scoreList = result.scores.score;  
        for(var i=0;i<scoreList.length;i++)  
        {  
            sb+= '<p><code><shubham style="font:bold 20px tahoma">'+scoreList[i].userName+'</shubham> &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp <score>'+scoreList[i].value+'</score></code> </p>' ;
           
        }  
        document.getElementById("Board").innerHTML = sb ;
    },    
    error: function(error) {    
    }    
});   
Sounds.appl.play();
   }