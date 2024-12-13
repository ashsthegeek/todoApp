const inputBox = document.getElementById("input-box");
const listeContainer = document.getElementById("liste-container")

// Fonction permettant d'ajouter une tâche 

function addTask() {
    if (inputBox.value === '') {
        alert("Le nom de la tâche ne peut pas être vide !");
    }else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listeContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span)
    }
    inputBox.value = "" // Permet de vider le champ aprés la saisie
}


// Fonction permettant de sauvegarder toutes les tâches dans le localStorage
function saveTasks() {
    const tasks = [];
    const items = listeContainer.querySelectorAll("li");
    items.forEach(item => {
        const taskText = item.innerHTML.replace(/<span.*?>.*?<\/span>/, "").trim(); // Extraire le texte sans la croix
        const isChecked = item.classList.contains("checked");
        tasks.push({ text: taskText, checked: isChecked });
    });

    // Sauvegarder les tâches dans le localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// Fonction permettant de charger les tâches depuis le localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        // Créer un nouvel élément li pour chaque tâche
        let li = document.createElement("li");
        li.innerHTML = task.text; // Ajouter le texte de la tâche
        if (task.checked) {
            li.classList.add("checked"); // Si la tâche est cochée, on ajoute la classe "checked"
        }
        
        // Ajouter le bouton de suppression (croix)
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        // Ajouter la tâche au DOM
        listeContainer.appendChild(li);
    });
}

// Fonction permettant de supprimer une tâche

listeContainer.addEventListener("click", function(e) {
    // Si on clique sur un élément LI (tâche), on va ajouter ou enlever la classe "checked"
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveTasks();
    }
    // Si on clique sur le span (croix), la tâche va être supprimée
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveTasks()
    }
});

// Charger les tâches stockées dans le localStorage au démarrage
loadTasks();