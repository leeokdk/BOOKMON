/**
 * DOM refrences
 */
const app = document.getElementById("app");
const thickness = document.getElementById("thickness");
const thicknessOutput = document.getElementById("thickness-output");

/*change action*/
const bookWrapper = document.getElementById("book-wrapper");
const movieWrapper = document.getElementById("movie-wrapper");
const mediaButtons = document.getElementById("media-buttons");
const feedbt = document.getElementById("feedbt");
const monster = document.getElementById("monster");
const title = document.getElementById("title");
const typo = document.getElementById("typo");

thicknessOutput.innerHTML = thickness.value;

/**
 * Attach event handlers
 */
thickness.oninput = function() {
    thicknessOutput.innerHTML = this.value;
    app.style.setProperty("--thickness", `${this.value}px`);
}

mediaButtons.addEventListener("click", e => {
    if (!e.target.value) { return; }
    app.setAttribute("data-current-media", e.target.value)
    if(e.target.value == 'movie'){
        title.style.setProperty('display','none');
        feedbt.style.setProperty('display','inline');
        typo.style.setProperty('display','none');
    }else{
        title.style.setProperty('display','inline');
        feedbt.style.setProperty('display','none');
        typo.style.setProperty('display','inline');
    }
});

monster.addEventListener("click", e => {
    window.location.href = "./inside.html";
});