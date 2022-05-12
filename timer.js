AFRAME.registerComponent('game', {
    schema: {
        gameState: { type: "string", default: "play" }
    },

    init: function () {
        // Do something when component first attached.
        var duration = 200;
        var timer = document.querySelector("#timer");
        this.startTimer(duration, timer);
    },

    tick: function () {
        // Do something on every scene tick or frame.
    },

    startTimer: function (duration, timer) {
        var minutes = 00;
        var seconds = 00;

        setInterval(() => {
            if (duration > 0) {
                this.data.gameState = "play";

                minutes = parseInt(duration / 60);
                seconds = parseInt(duration % 60);

                if (minutes < 10) {
                    minutes = "0" + minutes;
                }
                if (seconds < 10) {
                    seconds = "0" + seconds;
                }

                timer.setAttribute("text", { value: minutes + ":" + seconds });
                duration--;
            }
            else{
                this.data.gameState = "over"
                var cameraRig = document.querySelector("#camera-rig");
                cameraRig.setAttribute("velocity", {x:0, y:0, z:0});
                cameraRig.setAttribute("movement-controls", {speed : 0});

                var speed = document.querySelector("#speed");
                speed.setAttribute("text", {value : "0"});

                var gameOverText = document.querySelector("#over");
                gameOverText.setAttribute("visible", true);


            }

        })

    }
});
