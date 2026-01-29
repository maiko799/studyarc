// AI-generated quote generation
function generateUniqueQuote() {
    const subjects = [
        "Your consistent effort", "Every small step", "Daily practice", "Your dedication", 
        "Persistent learning", "Regular study", "Each session you complete", "Your commitment",
        "Steady progress", "Incremental growth"
    ];
    
    const actions = [
        "compounds into remarkable results", "creates powerful momentum", "builds unshakeable foundations",
        "unlocks hidden potential", "sculpts excellence", "forges lasting mastery", 
        "transforms dreams into reality", "elevates your capabilities", "shapes your future",
        "creates waves of success"
    ];
    
    const motivations = [
        "Keep learning, keep growing.",
        "Your future self will thank you.",
        "Every moment invested pays dividends.",
        "Progress over perfection, always.",
        "Small wins create big victories.",
        "You're stronger than yesterday.",
        "Consistency is your superpower.",
        "Your effort matters more than you know.",
        "The best time to start is now.",
        "You've got this!"
    ];
    
    const subject = subjects[Math.floor(Math.random() * subjects.length)];
    const action = actions[Math.floor(Math.random() * actions.length)];
    const motivation = motivations[Math.floor(Math.random() * motivations.length)];
    
    const quoteText = `${subject} ${action}. ${motivation}`;
    const author = "You";
    
    return { text: quoteText, author: author };
}

document.addEventListener('DOMContentLoaded', function() {
    // Generate unique quote
    const generatedQuote = generateUniqueQuote();
    document.getElementById('quote').textContent = `"${generatedQuote.text}"`;

    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
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
});
