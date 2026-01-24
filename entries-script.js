document.addEventListener('DOMContentLoaded', function() {
    const entryList = document.getElementById('entryList');
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

    loadEntries();

    function loadEntries() {
        fetch('/entries')
        .then(response => response.json())
        .then(entries => {
            if (entries.length === 0) {
                entryList.innerHTML = '<li>No entries yet. Start tracking!</li>';
                return;
            }
            entries.forEach(displayEntry);
        })
        .catch(error => console.error('Error:', error));
    }

    function displayEntry(entry) {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="entry-summary">
                <strong>${entry.date} - ${entry.timeOfDay} (${entry.dayType})</strong> | Subject: ${entry.subject} | Duration: ${entry.sessionDuration} min
                <button class="expand-btn">Expand</button>
            </div>
            <div class="entry-details" style="display: none;">
                Energy: ${entry.energyLevel}/10 | Focus: ${entry.focus}/10 | Mood: ${entry.mood}/10<br>
                Sleep: ${entry.sleepHours}h (Quality: ${entry.sleepQuality}/10)<br>
                Difficulty: ${entry.difficulty} | Study Type: ${entry.studyType}<br>
                ${entry.retentionScore !== null ? `Retention: ${entry.retentionScore}/100 | ` : ''}Efficiency: ${entry.efficiency || 'N/A'}/10<br>
                Progress: ${entry.progress}
            </div>
        `;
        li.querySelector('.expand-btn').addEventListener('click', function() {
            const details = li.querySelector('.entry-details');
            const btn = li.querySelector('.expand-btn');
            if (details.style.display === 'none') {
                details.style.display = 'block';
                btn.textContent = 'Collapse';
            } else {
                details.style.display = 'none';
                btn.textContent = 'Expand';
            }
        });
        entryList.appendChild(li);
    }
});