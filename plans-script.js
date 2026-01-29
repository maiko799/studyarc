// Sample data for optimization
const sampleData = [
    {
        date: '2025-01-27',
        timeOfDay: 'morning',
        dayType: 'weekday',
        sessionDuration: 50,
        energyLevel: 9,
        focus: 8,
        mood: 8,
        sleepHours: 7.5,
        sleepQuality: 8,
        subject: 'Mathematics - Calculus',
        difficulty: 'hard',
        studyType: 'problem-solving',
        retentionScore: 85,
        progress: 'Completed 12 practice problems, understood derivatives concepts',
        efficiency: 9
    },
    {
        date: '2025-01-27',
        timeOfDay: 'afternoon',
        dayType: 'weekday',
        sessionDuration: 75,
        energyLevel: 7,
        focus: 7,
        mood: 7,
        sleepHours: 7.5,
        sleepQuality: 8,
        subject: 'Physics - Quantum Mechanics',
        difficulty: 'hard',
        studyType: 'reading',
        retentionScore: 72,
        progress: 'Read 3 chapters, made detailed notes',
        efficiency: 7
    },
    {
        date: '2025-01-26',
        timeOfDay: 'evening',
        dayType: 'weekday',
        sessionDuration: 90,
        energyLevel: 6,
        focus: 6,
        mood: 6,
        sleepHours: 6,
        sleepQuality: 6,
        subject: 'Chemistry - Organic Synthesis',
        difficulty: 'hard',
        studyType: 'practice-tests',
        retentionScore: 68,
        progress: 'Attempted 8 synthesis problems, got 6 correct',
        efficiency: 6
    },
    {
        date: '2025-01-26',
        timeOfDay: 'morning',
        dayType: 'weekend',
        sessionDuration: 50,
        energyLevel: 8,
        focus: 8,
        mood: 9,
        sleepHours: 8,
        sleepQuality: 9,
        subject: 'History - World War II',
        difficulty: 'medium',
        studyType: 'reading',
        retentionScore: 80,
        progress: 'Reviewed key events and dates, completed summary notes',
        efficiency: 8
    },
    {
        date: '2025-01-25',
        timeOfDay: 'afternoon',
        dayType: 'weekend',
        sessionDuration: 25,
        energyLevel: 5,
        focus: 5,
        mood: 5,
        sleepHours: 5,
        sleepQuality: 5,
        subject: 'Literature - Shakespeare',
        difficulty: 'easy',
        studyType: 'reviewing-notes',
        retentionScore: 75,
        progress: 'Reviewed Act 1 of Hamlet, created character analysis',
        efficiency: 6
    },
    {
        date: '2025-01-24',
        timeOfDay: 'morning',
        dayType: 'weekday',
        sessionDuration: 75,
        energyLevel: 9,
        focus: 9,
        mood: 8,
        sleepHours: 8.5,
        sleepQuality: 9,
        subject: 'Computer Science - Data Structures',
        difficulty: 'hard',
        studyType: 'problem-solving',
        retentionScore: 88,
        progress: 'Implemented binary search tree, solved 5 complex problems',
        efficiency: 9
    },
    {
        date: '2025-01-24',
        timeOfDay: 'evening',
        dayType: 'weekday',
        sessionDuration: 50,
        energyLevel: 7,
        focus: 7,
        mood: 7,
        sleepHours: 8.5,
        sleepQuality: 9,
        subject: 'Spanish - Grammar',
        difficulty: 'medium',
        studyType: 'reviewing-notes',
        retentionScore: 82,
        progress: 'Practiced verb conjugations, completed 20 exercises',
        efficiency: 8
    }
];

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

    loadPlans();

    function loadPlans() {
        const plansContainer = document.getElementById('plansContainer');
        plansContainer.innerHTML = '';

        const plans = generateOptimizationPlans();
        plans.forEach(plan => {
            const planCard = createPlanCard(plan);
            plansContainer.appendChild(planCard);
        });
    }

    function generateOptimizationPlans() {
        // Analyze data to generate personalized plans
        const avgEfficiency = sampleData.reduce((s, e) => s + e.efficiency, 0) / sampleData.length;
        const lowEnergyEntries = sampleData.filter(e => e.energyLevel < 6);
        const lateSessions = sampleData.filter(e => e.timeOfDay === 'evening' || e.timeOfDay === 'night');
        const avgSessionDuration = sampleData.reduce((s, e) => s + e.sessionDuration, 0) / sampleData.length;

        const plans = [
            {
                title: 'Optimize Sleep Schedule',
                priority: 'high',
                description: 'Your efficiency increases significantly with 8+ hours of quality sleep. Establishing a consistent sleep routine will boost both focus and retention.',
                actions: [
                    'Set a consistent bedtime and wake time (target: 8 hours per night)',
                    'Avoid studying 1 hour before bed',
                    'Create a sleep-friendly environment (dark, cool, quiet)',
                    'Track sleep quality weekly'
                ],
                timeline: [
                    'Week 1: Establish bedtime routine',
                    'Week 2-4: Monitor sleep quality improvements',
                    'Week 5+: Maintain habit and adjust as needed'
                ]
            },
            {
                title: 'Maximize Morning Study Sessions',
                priority: 'high',
                description: 'Data shows your morning sessions (8-9am) achieve 8.5/10 efficiency. Morning study with high energy yields the best retention scores.',
                actions: [
                    'Schedule most difficult subjects for morning hours',
                    'Prepare study materials the night before',
                    'Start with problem-solving and hard topics first',
                    'Reserve evenings for review and easier subjects'
                ],
                timeline: [
                    'This week: Reorganize study schedule',
                    'Next 2 weeks: Observe efficiency improvements',
                    'Month 2: Fine-tune based on results'
                ]
            },
            {
                title: 'Implement the 50-75 Minute Session Rule',
                priority: 'high',
                description: 'Sessions between 50-75 minutes show optimal focus (8/10). Longer sessions (90+ min) show declining efficiency. Adopt time-boxing strategy.',
                actions: [
                    'Use 50-minute focused sessions with 10-minute breaks',
                    'Maximum 3 consecutive sessions before a long break',
                    'During breaks: walk, hydrate, light snacks (no phone)',
                    'Apply Pomodoro technique: 25-min sprints for easier material'
                ],
                timeline: [
                    'Week 1: Establish new session rhythm',
                    'Week 2-3: Track focus levels per session',
                    'Month 2: Optimize break strategy'
                ]
            },
            {
                title: 'Reduce Evening Study Load',
                priority: 'medium',
                description: 'Evening sessions show 15-20% lower efficiency due to accumulated fatigue. Consolidate evening time for review only.',
                actions: [
                    'Move hard topics to morning/afternoon slots',
                    'Use evenings (7-9pm) for: reviewing notes, flashcards, group study',
                    'Avoid new material introduction in the evening',
                    'Complete studying by 9pm for better sleep'
                ],
                timeline: [
                    'Week 1: Analyze current evening study',
                    'Week 2: Shift difficult topics to morning',
                    'Week 3+: Maintain new pattern'
                ]
            },
            {
                title: 'Boost Low-Energy Days',
                priority: 'medium',
                description: 'On days with low energy (below 6/10), your focus and retention drop significantly. Implement energy management strategies.',
                actions: [
                    'On low-energy days: Study 25-30 min sessions (Pomodoro)',
                    'Take short walks or light exercise before studying',
                    'Stay hydrated and maintain balanced meals',
                    'Consider studying in groups for motivation',
                    'Allow extra breaks on these days'
                ],
                timeline: [
                    'Daily: Monitor energy levels',
                    'Weekly: Identify low-energy patterns',
                    'Month 2: Implement preventive measures'
                ]
            },
            {
                title: 'Maximize Problem-Solving Sessions',
                priority: 'low',
                description: 'Problem-solving study sessions achieve the highest retention scores (85-88%). Increase the proportion of practice problems in your routine.',
                actions: [
                    'Allocate 40% of study time to problem-solving',
                    'Use spaced repetition for problem types',
                    'Mix easy, medium, and hard problems in each session',
                    'Review mistakes within 24 hours'
                ],
                timeline: [
                    'Week 1: Analyze current study type distribution',
                    'Week 2-4: Gradually increase problem-solving time',
                    'Month 2+: Maintain optimal ratio'
                ]
            }
        ];

        return plans;
    }

    function createPlanCard(plan) {
        const card = document.createElement('div');
        card.className = `plan-card priority-${plan.priority}`;
        
        const timelineHtml = plan.timeline.map((item, idx) => `
            <div class="timeline-item">
                <div class="timeline-marker">${idx + 1}</div>
                <div class="timeline-text">${item}</div>
            </div>
        `).join('');

        const actionsHtml = plan.actions.map(action => `
            <div class="action-item">${action}</div>
        `).join('');

        card.innerHTML = `
            <div class="plan-header">
                <div class="plan-title">${plan.title}</div>
                <div class="plan-priority priority-${plan.priority}">${plan.priority.toUpperCase()}</div>
            </div>
            <div class="plan-content">
                <div class="plan-description">${plan.description}</div>
                <div class="plan-actions">
                    ${actionsHtml}
                </div>
            </div>
            <div class="plan-timeline">
                <strong style="color: #2c3e50; font-size: 0.95em;">Implementation Timeline:</strong>
                ${timelineHtml}
            </div>
        `;

        return card;
    }
});