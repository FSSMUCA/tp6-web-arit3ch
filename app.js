// Variables
let historique = [];
const maxHisto = 20;

// Éléments
const form = document.getElementById('form-calc');
const inputA = document.getElementById('nombreA');
const inputB = document.getElementById('nombreB');
const select = document.getElementById('operation');
const resultatBox = document.getElementById('affichage-resultat');
const liste = document.getElementById('liste-histo');
const total = document.getElementById('total-operations');
const btnEffacer = document.getElementById('effacer-histo');

// Calculer
function calculer(a, b, op) {
    if (op === '/' && b === 0) {
        return "ERREUR: Division par zéro impossible";
    }
    
    switch(op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return a / b;
        default: return 0;
    }
}

// Ajouter à historique
function ajouterHisto(a, b, op, res) {
    // Ne pas ajouter les erreurs à l'historique
    if (typeof res === 'string' && res.startsWith('ERREUR:')) {
        return;
    }
    
    const item = {
        a: a,
        b: b,
        op: op,
        res: res,
        heure: new Date().toLocaleTimeString()
    };
    
    historique.unshift(item);
    if (historique.length > maxHisto) {
        historique.pop();
    }
    
    // Sauvegarder
    localStorage.setItem('histoCalc', JSON.stringify(historique));
    
    // Afficher
    afficherHisto();
}

// Afficher historique
function afficherHisto() {
    total.textContent = historique.length;
    liste.innerHTML = '';
    
    if (historique.length === 0) {
        liste.innerHTML = '<div class="message-vide"><p>Aucun calcul</p></div>';
    } else {
        historique.forEach(item => {
            const div = document.createElement('div');
            div.className = 'element-histo';
            
            const symbole = {
                '+': '+',
                '-': '-',
                '*': '×',
                '/': '÷'
            }[item.op];
            
            div.innerHTML = `
                <div class="info-calc">
                    <div class="operation">${item.a} ${symbole} ${item.b} = ${item.res}</div>
                    <div class="heure">${item.heure}</div>
                </div>
                <div class="resultat">${item.res}</div>
            `;
            
            liste.appendChild(div);
        });
    }
}

// Charger historique
function chargerHisto() {
    const saved = localStorage.getItem('histoCalc');
    if (saved) {
        historique = JSON.parse(saved);
        afficherHisto();
    }
}

// Effacer historique
function effacerHisto() {
    historique = [];
    localStorage.removeItem('histoCalc');
    afficherHisto();
    resultatBox.innerHTML = '<p>Historique effacé</p>';
}

// Afficher résultat ou erreur
function montrerResultat(a, b, op, res) {
    const symboles = {
        '+': '+',
        '-': '-',
        '*': '×',
        '/': '÷'
    };
    
    if (typeof res === 'string' && res.startsWith('ERREUR:')) {
        resultatBox.innerHTML = `
            <div style="text-align: center; color: #e74c3c;">
                <div style="font-size: 24px; margin-bottom: 10px;">
                    ${a} ${symboles[op]} ${b}
                </div>
                <div style="font-size: 20px; font-weight: bold;">
                    Division par zéro impossible
                </div>
            </div>
        `;
    } else {
        // Afficher le résultat normal
        resultatBox.innerHTML = `
            <div style="text-align: center;">
                <div style="font-size: 24px; color: #aaa; margin-bottom: 10px;">
                    ${a} ${symboles[op]} ${b}
                </div>
                <div style="font-size: 40px; font-weight: bold; color: #4a90e2;">
                    = ${res}
                </div>
            </div>
        `;
        
        // Ajouter à l'historique seulement si c'est un calcul réussi
        ajouterHisto(a, b, op, res);
    }
}

// Événement formulaire
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Lire valeurs
    const a = parseFloat(inputA.value);
    const b = parseFloat(inputB.value);
    const op = select.value;
    
    // Vérifier nombres
    if (isNaN(a) || isNaN(b)) {
        resultatBox.innerHTML = `
            <div style="text-align: center; color: #e74c3c;">
                <div style="font-size: 20px; font-weight: bold;">
                    Entrez des nombres valides
                </div>
            </div>
        `;
        return;
    }
    
    // Calculer
    const res = calculer(a, b, op);
    
    // Afficher résultat ou erreur
    montrerResultat(a, b, op, res);
});

// Effacer historique
if (btnEffacer) {
    btnEffacer.addEventListener('click', effacerHisto);
}

// Démarrer
document.addEventListener('DOMContentLoaded', function() {
    chargerHisto();
    
    // Message initial
    if (historique.length === 0) {
        resultatBox.innerHTML = '<p>Entrez des nombres et calculez</p>';
    }
});