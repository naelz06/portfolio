// Fonction pour afficher une section spécifique
function showSection(sectionId) {
    // Masquer toutes les sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Retirer la classe active de tous les boutons
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Afficher la section demandée
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Activer le bouton correspondant
    const activeButton = document.querySelector(`[onclick="showSection('${sectionId}')"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
    
    // Faire défiler vers le haut pour une meilleure expérience utilisateur
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    // S'assurer que la page d'accueil est affichée par défaut
    showSection('accueil');
    
    // Ajouter des gestionnaires d'événements pour une navigation plus fluide
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Ajouter un petit effet visuel au clic
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
            }, 100);
        });
    });
});

// Fonction pour les boutons d'upload (placeholder)
function handleDocumentUpload() {
    alert('Fonctionnalité d\'upload à implémenter selon vos besoins. Vous pouvez ajouter ici l\'intégration avec un service de stockage ou simplement des liens vers vos documents.');
}

// Optionnel : Navigation au clavier (touches numériques 1-5)
document.addEventListener('keydown', function(e) {
    const keyMap = {
        '1': 'accueil',
        '2': 'description', 
        '3': 'objectifs',
        '4': 'sae',
        '5': 'projection'
    };
    
    if (keyMap[e.key]) {
        showSection(keyMap[e.key]);
    }
});

// Fonction pour mettre à jour les barres de progression des compétences
function updateSkillProgress() {
    const skillBars = document.querySelectorAll('.skill-progress-bar');
    
    skillBars.forEach((bar, index) => {
        // Animation d'apparition des barres de progression
        setTimeout(() => {
            bar.style.transition = 'width 1s ease-in-out';
            bar.style.width = bar.style.width || '0%';
        }, index * 200);
    });
}

// Observer pour déclencher les animations quand la section projection est visible
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.id === 'projection') {
            updateSkillProgress();
        }
    });
}, observerOptions);

// Observer la section projection
document.addEventListener('DOMContentLoaded', function() {
    const projectionSection = document.getElementById('projection');
    if (projectionSection) {
        observer.observe(projectionSection);
    }
});
function navigateToSAE(saeId) {
    // D'abord, afficher la section SAÉ
    showSection('sae');
    
    // Attendre un petit délai pour que la section soit affichée
    setTimeout(() => {
        // Trouver l'élément SAÉ correspondant
        const saeElement = document.getElementById(saeId);
        if (saeElement) {
            // Faire défiler vers l'élément SAÉ avec un offset pour le header fixe
            const headerHeight = document.querySelector('nav').offsetHeight || 0;
            const elementPosition = saeElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
            
            // Ajouter un effet de surbrillance temporaire
            saeElement.style.boxShadow = '0 0 20px rgba(52, 152, 219, 0.4)';
            saeElement.style.transform = 'scale(1.02)';
            saeElement.style.transition = 'all 0.3s ease';
            
            // Retirer l'effet après 2 secondes
            setTimeout(() => {
                saeElement.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
                saeElement.style.transform = 'scale(1)';
            }, 2000);
        }
    }, 100);
}

// Fonction pour initialiser la navigation des SAÉ
function initializeSAENavigation() {
    // Ajouter des IDs aux éléments SAÉ existants
    const saeItems = document.querySelectorAll('.sae-item');
    saeItems.forEach((item, index) => {
        if (!item.id) {
            // Générer un ID basé sur le titre de la SAÉ ou un index
            const saeTitle = item.querySelector('.sae-title');
            if (saeTitle) {
                const titleText = saeTitle.textContent.trim();
                const saeMatch = titleText.match(/SAÉ\s+(\d+\.\d+)/);
                if (saeMatch) {
                    item.id = `sae-${saeMatch[1].replace('.', '-')}`;
                } else {
                    item.id = `sae-item-${index + 1}`;
                }
            }
        }
    });
    
    // Ajouter des gestionnaires de clic aux previews SAÉ
    const saePreviews = document.querySelectorAll('.sae-preview');
    saePreviews.forEach(preview => {
        preview.style.cursor = 'pointer';
        preview.addEventListener('click', function() {
            const saeText = this.querySelector('strong').textContent;
            const saeMatch = saeText.match(/SAÉ\s+(\d+\.\d+)/);
            if (saeMatch) {
                const saeId = `sae-${saeMatch[1].replace('.', '-')}`;
                navigateToSAE(saeId);
            }
        });
        
        // Ajouter un effet hover pour indiquer que c'est cliquable
        preview.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        preview.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Ajouter cette fonction à l'initialisation existante
document.addEventListener('DOMContentLoaded', function() {
    // Votre code d'initialisation existant...
    showSection('accueil');
    
    // Initialiser la navigation SAÉ
    initializeSAENavigation();
    
    // Votre code existant pour les boutons...
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
            }, 100);
        });
    });
});