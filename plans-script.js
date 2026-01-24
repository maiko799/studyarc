document.addEventListener('DOMContentLoaded', function() {
    const planList = document.getElementById('planList');
    const themeToggle = document.getElementById('themeToggle');

    // Theme toggle
    const themeIcon = document.getElementById('themeIcon');
    const themeText = document.getElementById('themeText');
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark');
        if (document.body.classList.contains('dark')) {
            themeIcon.textContent = '☀️';
            themeText.textContent = 'Light';
        } else {
            themeIcon.textContent = '🌙';
            themeText.textContent = 'Dark';
        }
    });

    loadPlans();

    function loadPlans() {
        fetch('/plans')
        .then(response => response.json())
        .then(data => {
            const plans = data.plans || [];
            if (plans.length === 0) {
                planList.innerHTML = '<li>No plans available yet.</li>';
                return;
            }
            plans.forEach(displayPlan);
        })
        .catch(error => console.error('Error:', error));
    }

    function displayPlan(plan) {
        const li = document.createElement('li');
        li.innerHTML = plan;
        planList.appendChild(li);
    }
});