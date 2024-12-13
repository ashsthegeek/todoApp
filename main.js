const inputBox = document.getElementById("input-box");
const listeContainer = document.getElementById("liste-container");

// Fonction permettant d'ajouter une tâche 
function addTask() {
    if (inputBox.value === '') {
        alert("Le nom de la tâche ne peut pas être vide !");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listeContainer.appendChild(li);
        let span = document.createElement("span");
        span.classList.add("delete-task"); // Ajout d'une classe spécifique pour la croix
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        saveTasks();
    }
    inputBox.value = ""; // Permet de vider le champ après la saisie
}

// Fonction permettant de sauvegarder toutes les tâches dans le localStorage
function saveTasks() {
    const tasks = [];
    const items = listeContainer.querySelectorAll("li");
    items.forEach(item => {
        const taskText = item.innerText.replace(/\u00d7/g, "").trim(); // Extraction du texte sans la croix
        const isChecked = item.classList.contains("checked");
        tasks.push({ text: taskText, checked: isChecked });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Fonction permettant de charger les tâches depuis le localStorage
function loadTasks() {
    try {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => {
            let li = document.createElement("li");
            li.innerHTML = task.text;
            if (task.checked) {
                li.classList.add("checked");
            }
            let span = document.createElement("span");
            span.classList.add("delete-task");
            span.innerHTML = "\u00d7";
            li.appendChild(span);
            listeContainer.appendChild(li);
        });
    } catch (error) {
        console.error("Erreur de lecture du localStorage:", error);
    }
}

// Fonction permettant de supprimer une tâche
listeContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveTasks();
    } else if (e.target.tagName === "SPAN" && e.target.classList.contains("delete-task")) {
        e.target.parentElement.remove();
        saveTasks();
    }
});

// Charger les tâches stockées dans le localStorage au démarrage
loadTasks();
