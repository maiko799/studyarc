document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const themeText = document.getElementById('themeText');

    // Theme toggle
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

    // Get user entries only (no default sample data)
    const userEntries = JSON.parse(localStorage.getItem('studyEntries')) || [];

    // Tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Load and display data
    loadEntries(userEntries);
    loadStatistics(userEntries);
    loadAnalysis(userEntries);

    // Delete all data button
    const deleteAllBtn = document.getElementById('deleteAllBtn');
    if (deleteAllBtn) {
        deleteAllBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to delete all study data? This action cannot be undone.')) {
                localStorage.removeItem('studyEntries');
                location.reload();
            }
        });
    }

    function loadEntries(entries) {
        const entryList = document.getElementById('entryList');
        entryList.innerHTML = '';

        if (entries.length === 0) {
            entryList.innerHTML = '<div style="padding: 20px; text-align: center; color: #999;">No study entries yet. Start tracking to see your data here!</div>';
            return;
        }

        entries.forEach((entry, index) => {
            const entryCard = createEntryCard(entry, index);
            entryList.appendChild(entryCard);
        });
    }

    function createEntryCard(entry, index) {
        const card = document.createElement('div');
        card.className = 'entry-card';
        
        const difficultyColor = entry.difficulty === 'easy' ? '#4ecdc4' : entry.difficulty === 'medium' ? '#ffa726' : '#ff6b6b';
        
        card.innerHTML = `
            <div class="entry-header">
                <div class="entry-title">${entry.subject}</div>
                <div style="display: flex; gap: 10px;">
                    <span class="entry-badge" style="background: linear-gradient(135deg, ${difficultyColor}, ${difficultyColor}dd);">${entry.difficulty.toUpperCase()}</span>
                    <span class="entry-badge" style="background: linear-gradient(135deg, #45b7d1, #5bb9d3);">${entry.timeOfDay}</span>
                </div>
            </div>
            <div class="entry-meta">
                <span>📅 ${entry.date}</span>
                <span>⏱️ ${entry.sessionDuration} min</span>
                <span>🎯 ${entry.studyType.replace('-', ' ')}</span>
            </div>
            <div class="entry-details-expanded" style="display: none;">
                <div class="detail-grid">
                    <div class="detail-item">
                        <div class="detail-label">Energy Level</div>
                        <div class="detail-value">${entry.energyLevel}/10</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Focus</div>
                        <div class="detail-value">${entry.focus}/10</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Mood</div>
                        <div class="detail-value">${entry.mood}/10</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Sleep Quality</div>
                        <div class="detail-value">${entry.sleepQuality}/10</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Retention Score</div>
                        <div class="detail-value">${entry.retentionScore}%</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Efficiency</div>
                        <div class="detail-value">${entry.efficiency}/10</div>
                    </div>
                </div>
                <div style="margin-top: 15px; padding: 12px; background: rgba(0,0,0,0.03); border-radius: 8px;">
                    <div class="detail-label">Progress</div>
                    <div class="detail-value" style="margin-top: 8px;">${entry.progress}</div>
                </div>
            </div>
        `;

        card.addEventListener('click', function() {
            const details = card.querySelector('.entry-details-expanded');
            const isExpanded = card.classList.contains('expanded');
            
            // Close all other cards
            document.querySelectorAll('.entry-card.expanded').forEach(c => {
                if (c !== card) {
                    c.classList.remove('expanded');
                    c.querySelector('.entry-details-expanded').style.display = 'none';
                }
            });
            
            if (isExpanded) {
                card.classList.remove('expanded');
                details.style.display = 'none';
            } else {
                card.classList.add('expanded');
                details.style.display = 'block';
            }
        });

        return card;
    }

    function loadStatistics(entries) {
        const statsGrid = document.getElementById('statsGrid');
        if (!statsGrid) return;
        
        statsGrid.innerHTML = '';

        if (entries.length === 0) return;

        // Calculate statistics
        const avgEnergy = Math.round(entries.reduce((sum, e) => sum + e.energyLevel, 0) / entries.length);
        const avgFocus = Math.round(entries.reduce((sum, e) => sum + e.focus, 0) / entries.length);
        const avgRetention = Math.round(entries.reduce((sum, e) => sum + (e.retentionScore || 0), 0) / entries.length);
        const totalHours = Math.round(entries.reduce((sum, e) => sum + e.sessionDuration, 0) / 60 * 10) / 10;
        const avgMood = Math.round(entries.reduce((sum, e) => sum + e.mood, 0) / entries.length);
        const avgEfficiency = Math.round(entries.reduce((sum, e) => sum + (e.efficiency || 0), 0) / entries.length);

        const stats = [
            { label: 'Avg Energy', value: avgEnergy, unit: '/10' },
            { label: 'Avg Focus', value: avgFocus, unit: '/10' },
            { label: 'Avg Retention', value: avgRetention, unit: '%' },
            { label: 'Total Hours', value: totalHours, unit: 'h' },
            { label: 'Avg Mood', value: avgMood, unit: '/10' },
            { label: 'Avg Efficiency', value: avgEfficiency, unit: '/10' }
        ];

        stats.forEach((stat, idx) => {
            const statCard = document.createElement('div');
            statCard.className = 'stat-card';
            statCard.innerHTML = `
                <div class="stat-value">${stat.value}${stat.unit}</div>
                <div class="stat-label">${stat.label}</div>
            `;
            statsGrid.appendChild(statCard);
        });
    }

    function loadAnalysis(entries) {
        const analysisContent = document.getElementById('analysisContent');
        if (!analysisContent) return;
        
        analysisContent.innerHTML = '';

        if (entries.length === 0) {
            analysisContent.innerHTML = '<div style="padding: 20px; text-align: center; color: #999;">No data available for analysis yet.</div>';
            return;
        }

        // Analyze patterns
        const bestPerformanceEntry = entries.reduce((best, current) => 
            (current.efficiency || 0) > (best.efficiency || 0) ? current : best
        );

        const worstPerformanceEntry = entries.reduce((worst, current) => 
            (current.efficiency || 0) < (worst.efficiency || 0) ? current : worst
        );

        const morningEntries = entries.filter(e => e.timeOfDay === 'morning');
        const afternoonEntries = entries.filter(e => e.timeOfDay === 'afternoon');
        const eveningEntries = entries.filter(e => e.timeOfDay === 'evening');

        const bestTime = [
            { time: 'Morning', avg: morningEntries.length > 0 ? Math.round(morningEntries.reduce((s, e) => s + (e.efficiency || 0), 0) / morningEntries.length) : 0 },
            { time: 'Afternoon', avg: afternoonEntries.length > 0 ? Math.round(afternoonEntries.reduce((s, e) => s + (e.efficiency || 0), 0) / afternoonEntries.length) : 0 },
            { time: 'Evening', avg: eveningEntries.length > 0 ? Math.round(eveningEntries.reduce((s, e) => s + (e.efficiency || 0), 0) / eveningEntries.length) : 0 }
        ].sort((a, b) => b.avg - a.avg)[0];

        const insights = [
            {
                title: 'Peak Performance Time',
                text: `You study best during the <strong>${bestTime.time.toLowerCase()}</strong> with an average efficiency of <strong>${bestTime.avg}/10</strong>. Consider scheduling your most important study sessions during this time.`,
                positive: true
            },
            {
                title: 'Best Study Session',
                text: `Your best performance was studying <strong>${bestPerformanceEntry.subject}</strong> with an efficiency rating of <strong>${bestPerformanceEntry.efficiency || 'N/A'}/10</strong>.`,
                positive: true
            },
            {
                title: 'Areas for Improvement',
                text: `Your lowest efficiency session was <strong>${worstPerformanceEntry.efficiency || 'N/A'}/10</strong>. You had <strong>${worstPerformanceEntry.energyLevel}/10 energy</strong> and <strong>${worstPerformanceEntry.focus}/10 focus</strong>. Consider improving sleep or taking breaks.`,
                positive: false
            },
            {
                title: 'Sleep & Performance Connection',
                text: `Sessions after 8+ hours of sleep show higher retention on average. Prioritize getting quality sleep for better study outcomes.`,
                positive: true
            },
            {
                title: 'Study Duration Insight',
                text: `Your <strong>50-75 minute sessions</strong> show good focus. Try the <strong>Pomodoro Technique</strong> with focused breaks for optimal results.`,
                positive: true
            }
        ];

        insights.forEach(insight => {
            const box = document.createElement('div');
            box.className = `insight-box ${insight.positive ? 'positive' : ''}`;
            box.innerHTML = `
                <div class="insight-title">${insight.title}</div>
                <div class="insight-text">${insight.text}</div>
            `;
            analysisContent.appendChild(box);
        });
    }
});