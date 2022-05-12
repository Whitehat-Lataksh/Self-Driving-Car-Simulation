AFRAME.registerComponent('drive', {
    init: function () {
        var gameState = this.el.getAttribute("game");
        if (gameState == "play"){
            this.drive();
        }
    },

    tick: function () {

    },


    drive: function () {
        var wheelRotation = 0;
        var accleration = 10;
        var sounds = document.querySelector("#sound1");

        //Key Down Events
        window.addEventListener('keydown', function (e) {
            //Steering Wheel Rotatation  on Right & Left Arrow Keyup
            var wheel = document.querySelector("#control-wheel")

            if (e.code == "ArrowRight" && wheelRotation > -40) {
                wheelRotation -= 5
                wheel.setAttribute("rotation", { x: 0, y: 0, z: wheelRotation })

            }

            if (e.code == "ArrowLeft" && wheelRotation < 40) {
                wheelRotation += 5
                wheel.setAttribute("rotation", { x: 0, y: 0, z: wheelRotation })
            }

            //Camera Movement Control: Rotation & Direction on Right & Left Arrow Keyup
            var cameraRig = document.querySelector("#camera-rig")
            var cameraRotation = cameraRig.getAttribute("rotation")
            var cameraPosition = cameraRig.getAttribute("position")
            var cameraMoveControl = cameraRig.getAttribute("movement-controls")

            cameraRig.setAttribute("movement-controls", { "speed": cameraMoveControl.speed + 0.005 })

            var cameraDirection = new THREE.Vector3();
            cameraRig.object3D.getWorldDirection(cameraDirection);

            if (e.code == "ArrowRight") {
                cameraRotation.y -= 5
                cameraRig.setAttribute("rotation", { x: 0, y: cameraRotation.y, z: 0 })
                cameraRig.setAttribute("movement-controls", { "speed": cameraMoveControl.speed + 0.005 })
            }

            if (e.code == "ArrowLeft") {
                cameraRotation.y += 5
                cameraRig.setAttribute("rotation", { x: 0, y: cameraRotation.y, z: 0 })
                cameraRig.setAttribute("movement-controls", { "speed": cameraMoveControl.speed + 0.005 })
            }

            if (e.code == "ArrowUp") {
                accleration += 0.5;

                sounds.setAttribute("sound", {autoplay : true});

                if (accleration <= 100 && cameraPosition.z > -500) {
                    cameraRig.setAttribute('movement-controls', { "speed": cameraMoveControl.speed + 0.005 });
                    var acclerationImage = document.querySelector("#control-acce");
                    acclerationImage.setAttribute("material", { color: 'green' });
                    var carSpeed = document.querySelector('#speed');
                    carSpeed.setAttribute("text", { value: accleration });
                }
            }


            if (e.code == "Space") {
                cameraRig.setAttribute('movement-controls', { "speed": 0 });
                var brakeImage = document.querySelector("#control-break");
                brakeImage.setAttribute("material", { color: 'red' });
                var carSpeed = document.querySelector('#speed');
                carSpeed.setAttribute("text", { value: "0" });
                accleration = 0;
                sounds.setAttribute("sound", {autoplay : false});

            }
        });

        window.addEventListener("keyup", function(e){
            var cameraRig = document.querySelector("#camera-rig")
            var cameraMoveControl = cameraRig.getAttribute("movement-controls")

            var cameraDirection = new THREE.Vector3();
            cameraRig.object3D.getWorldDirection(cameraDirection);

            if (e.code == "Space") {
                var brakeImage = document.querySelector("#control-break");
                brakeImage.setAttribute("material", { color: 'grey' });
            }

            if (e.code == "ArrowUp"){
                if (accleration > 10){
                    accleration -= 1;
                    var carSpeed = document.querySelector('#speed');
                    carSpeed.setAttribute("text", { value: accleration });
                    cameraRig.setAttribute('movement-controls', { "speed": cameraMoveControl.speed + 0.05});
                    var acclerationImage = document.querySelector("#control-acce");
                    acclerationImage.setAttribute("material", { color: 'grey' });
                }
            }   
        })

    }
});
