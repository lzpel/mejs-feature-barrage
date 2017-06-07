# mejs-feature-barrage
This is a plugin of MediaElement.js
you can write comments like http://www.nicovideo.jp/ or http://www.bilibili.com/

## result
[youtube](https://www.youtube.com/watch?v=L2DeUXXGWm0)

## how to use

    <video id="player1" width="640" height="360" style="max-width:100%;">
        <source src="https://media.w3.org/2010/05/sintel/trailer.mp4">
    </video>
    
    <script src="https://rawgit.com/mediaelement/mediaelement/master/build/mediaelement-and-player.min.js"></script>
    <link rel="stylesheet" href="https://rawgit.com/mediaelement/mediaelement/master/build/mediaelementplayer.min.css">
    
    <script src="barrage.js"></script>
    <link rel="stylesheet" href="barrage.css">
    <script>
        player=new MediaElementPlayer('player1', {
    
        //1 add "barrage" to features
        features: ['playpause', 'current', 'progress', 'duration', 'volume', 'barrage', 'fullscreen'],
    
        //2 set id of controlls
        barrageLayer: "barragelayer",//default:"barragelayer"
        barrageForm: "barrageform",//default:"barrageform"
        barragePlaceholder: "write your comment",
    
        //3 set minimal seconds between the time of two comments
        barrageInterval: 2//default:2
    });
    </script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script>
    
    //4 set comment, time, animation to the layer
    $("#barragelayer").append('<p time="1" anim="animL" >a comment flowing to the left 0:01</p>')
    $("#barragelayer").append('<p time="5" anim="animR" >a comment flowing to the right 0.05</p>')
    
    //5 enable the input
    $("#barrageform").submit(function(){
        //get the time
        var time=$("video")[0].currentTime
        //get the text
        var text=$("#barrageform input").val()
        //add the comment
        $("#barragelayer").append('<p time="'+time+'" anim="animL" >'+text+'</p>')
        //refresh (important)
        player.playBarrage()
        //clear the input
        $("#barrageform input").val("")
        return false;
    })

    //6 enjoy
    </script>
