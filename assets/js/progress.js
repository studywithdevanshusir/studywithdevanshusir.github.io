/**
 * Progress Tracking System for Study with Devanshu Sir
 * Uses LocalStorage to save "Mark as Done" state without login.
 */

document.addEventListener('DOMContentLoaded', () => {
    initProgressSystem();
});

function initProgressSystem() {
    // 1. Identify valid progress checkboxes
    const checkboxes = document.querySelectorAll('.progress-checkbox');
    if (checkboxes.length === 0) return;

    // 2. Load saved state
    checkboxes.forEach(box => {
        const id = box.dataset.id;
        if (localStorage.getItem(id) === 'true') {
            box.checked = true;
            updateParentStyle(box);
        }

        // 3. Add Change Listener
        box.addEventListener('change', (e) => {
            const isChecked = e.target.checked;
            localStorage.setItem(id, isChecked);
            updateParentStyle(e.target);
            updateProgressBar();

            // Celebration effect
            if (isChecked) triggerConfetti(e.target);
        });
    });

    // 4. Initial Progress Bar Update
    updateProgressBar();
}

function updateParentStyle(checkbox) {
    const parentContainer = checkbox.closest('.topic-card');
    if (parentContainer) {
        if (checkbox.checked) {
            parentContainer.classList.add('completed-topic');
            parentContainer.style.borderColor = '#10B981';
            parentContainer.style.background = 'rgba(16, 185, 129, 0.1)';
        } else {
            parentContainer.classList.remove('completed-topic');
            parentContainer.style.borderColor = 'rgba(255,255,255,0.1)';
            parentContainer.style.background = 'rgba(30, 41, 59, 0.6)';
        }
    }
}

function updateProgressBar() {
    const checkboxes = document.querySelectorAll('.progress-checkbox');
    const total = checkboxes.length;
    const checked = document.querySelectorAll('.progress-checkbox:checked').length;

    const percentage = total === 0 ? 0 : Math.round((checked / total) * 100);

    const progressBar = document.getElementById('course-progress-bar');
    const progressText = document.getElementById('course-progress-text');

    if (progressBar) {
        progressBar.style.width = `${percentage}%`;
        if (percentage === 100) {
            progressBar.style.backgroundColor = '#10B981'; // Green for complete
        } else {
            progressBar.style.backgroundColor = '#3B82F6'; // Blue for progress
        }
    }

    if (progressText) {
        progressText.innerText = `${percentage}% Completed`;
    }
}

function triggerConfetti(element) {
    // Simple visual feedback if confetti library isn't loaded
    const feedback = document.createElement('span');
    feedback.innerText = '🎉';
    feedback.style.position = 'absolute';
    feedback.style.left = '50%';
    feedback.style.top = '50%';
    feedback.style.fontSize = '2rem';
    feedback.style.transform = 'translate(-50%, -50%)';
    feedback.style.pointerEvents = 'none';
    feedback.className = 'fade-up-vanish'; // Defined in CSS

    element.parentElement.appendChild(feedback);

    setTimeout(() => {
        feedback.remove();
    }, 1000);
}
