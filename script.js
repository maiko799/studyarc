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
            date: new Date().toLocaleDateString(),
            timeOfDay: formData.get('timeOfDay'),
            dayType: formData.get('dayType'),
            sessionDuration: formData.get('sessionDuration'),
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

        fetch('/log-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(entry)
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                // Whimsical success animation
                const btn = document.querySelector('.submit-btn');
                btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17L4 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> Saved! <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17L4 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
                setTimeout(() => {
                    btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L15 8L22 9L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9L9 8L12 2Z" fill="white"/></svg> Save Entry <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L15 8L22 9L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9L9 8L12 2Z" fill="white"/></svg>';
                }, 2000);
                form.reset();
            }
        })
        .catch(error => console.error('Error:', error));
    });
});