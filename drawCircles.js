
/////////////dessin des cercles

let x=5
let y =5
let cercleId=0
let cercleRemplissage

export  function draw(){
    const ctx=canevas.getContext("2d")
    ctx.fillStyle = "rgb(100,213,315)"
    //arc(x, y, rayon, angleInitial, angleFinal, antihoraire)
    const timeoutid= setTimeout(draw, 500);

    //dessiner un cercleplein

        function cerclePlein() {
            ctx.beginPath();
            ctx.arc(x, y, 10, 0, Math.PI * 2, true);  // Cercle extérieur
            ctx.fill();
        }
        function cercleVide() {
            ctx.beginPath();
            ctx.arc(x, y, 10, 0, Math.PI * 2, true);  // Cercle extérieur
            ctx.stroke();
        }

    function cercleDefRemplissage(){
        if (cercleId%2==0) {
            cercleRemplissage=cerclePlein()
        }
        else if (cercleId%2!=0) {
            cercleRemplissage=cercleVide()
        }
    }

    if (x<=120 ) {
        cercleDefRemplissage()
        cercleRemplissage
        x=x+25
        cercleId++
        timeoutid
    }
    if (x>120) {
        y=y+25
        x=5
        cercleDefRemplissage()
        cercleRemplissage
        cercleId++
        x=x+25
        timeoutid
    }
    if (cercleId>=25) {
        clearTimeout(timeoutid)
    }
}
draw()


