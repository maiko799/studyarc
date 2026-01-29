document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('studyForm');
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

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const entry = {
            id: Date.now(),
            date: new Date().toLocaleDateString(),
            timeOfDay: formData.get('timeOfDay'),
            dayType: formData.get('dayType'),
            sessionDuration: parseInt(formData.get('sessionDuration')),
            energyLevel: parseInt(formData.get('energyLevel')),
            focus: parseInt(formData.get('focus')),
            mood: parseInt(formData.get('mood')),
            sleepHours: parseFloat(formData.get('sleepHours')),
            sleepQuality: parseInt(formData.get('sleepQuality')),
            subject: formData.get('subject'),
            difficulty: formData.get('difficulty'),
            studyType: formData.get('studyType'),
            retentionScore: formData.get('retentionScore') ? parseInt(formData.get('retentionScore')) : null,
            progress: formData.get('progress') || '',
            efficiency: formData.get('efficiency') ? parseInt(formData.get('efficiency')) : null
        };

        // Get existing entries from localStorage
        let entries = JSON.parse(localStorage.getItem('studyEntries')) || [];
        entries.push(entry);
        localStorage.setItem('studyEntries', JSON.stringify(entries));

        // Redirect to success page
        setTimeout(() => {
            window.location.href = 'success.html';
        }, 800);
    });
});