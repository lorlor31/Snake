export let indexDeLettre=0

//ecriture du texte
export function writeTitle() {
    if (indexDeLettre < texte.length) {
      document.getElementById("titre").innerHTML += texte.charAt(i);
      indexDeLettre++;
      setTimeout(typeWriter, 100);
    }
} 
writeTitle()


