from flask import Flask, request, jsonify
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
import random

# Sample data generation
def generate_sample_data(n=100):
    data = []
    for _ in range(n):
        entry = {
            'date': pd.date_range('2023-01-01', periods=1, freq='D')[0] + pd.Timedelta(days=random.randint(0,365)),
            'timeOfDay': random.choice(['morning', 'afternoon', 'evening', 'night']),
            'dayType': random.choice(['weekday', 'weekend']),
            'sessionDuration': random.choice([25,50,75,90]),
            'energyLevel': random.randint(1,10),
            'focus': random.randint(1,10),
            'mood': random.randint(1,10),
            'sleepHours': random.uniform(4,10),
            'sleepQuality': random.randint(1,10),
            'subject': random.choice(['math', 'history', 'science', 'english']),
            'difficulty': random.choice(['easy', 'medium', 'hard']),
            'studyType': random.choice(['reading', 'problem-solving', 'reviewing-notes', 'practice-tests']),
            'retentionScore': random.randint(0,100) if random.random() > 0.5 else None,
            'progress': 'Completed chapter X',
            'efficiency': random.randint(1,10) if random.random() > 0.5 else None
        }
        data.append(entry)
    return pd.DataFrame(data)

sample_df = generate_sample_data()

# Sample entries for display
sample_entries = [
    {
        'date': '2024-01-20',
        'timeOfDay': 'morning',
        'dayType': 'weekday',
        'sessionDuration': '25',
        'energyLevel': 8,
        'focus': 7,
        'mood': 8,
        'sleepHours': 7.5,
        'sleepQuality': 8,
        'subject': 'Math',
        'difficulty': 'medium',
        'studyType': 'problem-solving',
        'retentionScore': 85,
        'progress': 'Completed algebra exercises',
        'efficiency': 8
    },
    {
        'date': '2024-01-21',
        'timeOfDay': 'afternoon',
        'dayType': 'weekend',
        'sessionDuration': '50',
        'energyLevel': 6,
        'focus': 5,
        'mood': 6,
        'sleepHours': 6.0,
        'sleepQuality': 6,
        'subject': 'History',
        'difficulty': 'easy',
        'studyType': 'reading',
        'retentionScore': 90,
        'progress': 'Read chapter 5',
        'efficiency': 7
    }
]

app = Flask(__name__, static_folder='.', static_url_path='')

entries = sample_entries.copy()  # Start with sample data

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/past-entries.html')
def past_entries():
    return app.send_static_file('past-entries.html')

@app.route('/optimization.html')
def optimization():
    return app.send_static_file('optimization.html')

@app.route('/log-session', methods=['POST'])
def log_session():
    data = request.json
    entries.append(data)
    return jsonify({'status': 'success'})

@app.route('/entries', methods=['GET'])
def get_entries():
    return jsonify(entries)

@app.route('/analyze', methods=['GET'])
def analyze():
    # Use sample_df for analysis
    df = sample_df.copy()
    
    # Preprocessing
    df['timeOfDay_num'] = df['timeOfDay'].map({'morning':0, 'afternoon':1, 'evening':2, 'night':3})
    df['dayType_num'] = df['dayType'].map({'weekday':0, 'weekend':1})
    df['difficulty_num'] = df['difficulty'].map({'easy':0, 'medium':1, 'hard':2})
    
    # EDA: simple stats
    trends = {
        'avg_efficiency_by_time': df.groupby('timeOfDay')['efficiency'].mean().to_dict() if df['efficiency'].notna().any() else {},
        'avg_focus_by_day': df.groupby('dayType')['focus'].mean().to_dict(),
        'correlation_sleep_efficiency': df['sleepHours'].corr(df['efficiency']) if df['efficiency'].notna().any() else 0
    }
    
    # Predictive: predict efficiency based on variables
    features = ['timeOfDay_num', 'dayType_num', 'energyLevel', 'focus', 'mood', 'sleepHours', 'sleepQuality', 'difficulty_num']
    target = 'efficiency'
    
    df_model = df.dropna(subset=[target])
    if len(df_model) > 10:
        X = df_model[features]
        y = df_model[target]
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        model = RandomForestRegressor(n_estimators=10, random_state=42)
        model.fit(X_train, y_train)
        
        # Suggest optimal: find time with highest avg efficiency
        optimal_time = df.groupby('timeOfDay')['efficiency'].mean().idxmax()
        optimal_duration = df.groupby('sessionDuration')['efficiency'].mean().idxmax()
        
        suggestions = {
            'optimal_time_of_day': optimal_time,
            'optimal_duration': optimal_duration,
            'trends': trends
        }
    else:
        suggestions = {'message': 'Not enough data for modeling', 'trends': trends}
    
    return jsonify(suggestions)

@app.route('/plans', methods=['GET'])
def get_plans():
    # Generate plans based on analysis
    analysis = analyze().get_json()
    plans = []
    if 'optimal_time_of_day' in analysis:
        plans.append(f"Study in the {analysis['optimal_time_of_day']} for best efficiency. Use {analysis['optimal_duration']} min sessions. Improve sleep for better focus (correlation: {analysis['trends']['correlation_sleep_efficiency']:.2f}).")
        # More plans based on trends
        avg_energy = sample_df['energyLevel'].mean()
        if avg_energy < 7:
            plans.append("Your average energy is low. Try exercising or eating nutritious meals before studying.")
        avg_focus = sample_df['focus'].mean()
        if avg_focus < 7:
            plans.append("Focus levels are below optimal. Minimize distractions and use techniques like the Pomodoro method.")
        if analysis['trends']['avg_focus_by_day']['weekday'] < analysis['trends']['avg_focus_by_day']['weekend']:
            plans.append("Focus is higher on weekends. Schedule important sessions then if possible.")
        avg_mood = sample_df['mood'].mean()
        if avg_mood < 7:
            plans.append("Mood affects retention. Ensure adequate rest and positive study environment.")
        plans.append("Track retention scores regularly to measure learning effectiveness.")
        # Subject-specific
        subject_counts = sample_df['subject'].value_counts()
        if len(subject_counts) > 0:
            best_subject = subject_counts.idxmax()
            plans.append(f"You study {best_subject} most often. Focus on mastering key concepts in this subject.")
    else:
        plans.append("Collect more data to generate personalized plans.")
    
    # Add sample plans
    plans.extend([
        "Try the Pomodoro technique: 25 min study + 5 min break.",
        "Review notes within 24 hours of learning for better retention.",
        "Maintain a consistent sleep schedule to improve energy levels.",
        "Study difficult subjects in the morning when focus is highest."
    ])
    
    return jsonify({'plans': plans})

if __name__ == '__main__':
    app.run(debug=True)