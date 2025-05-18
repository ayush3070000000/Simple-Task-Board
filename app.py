from flask import Flask, render_template, request, jsonify
import json
import os

app = Flask(__name__)

TASKS_FILE = 'tasks.json'

def load_tasks():
    if os.path.exists(TASKS_FILE):
        with open(TASKS_FILE, 'r') as f:
            try:
                return json.load(f)
            except json.JSONDecodeError:
                return []
    return []

def save_tasks(tasks):
    with open(TASKS_FILE, 'w') as f:
        json.dump(tasks, f, indent=2)

@app.route('/')
def index():
    # Serves your main HTML page (make sure you have this in templates/)
    return render_template('index.html')

@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    tasks = load_tasks()
    return jsonify(tasks)

@app.route('/api/tasks', methods=['POST'])
def update_tasks():
    tasks = request.get_json()
    if not isinstance(tasks, list):
        return jsonify({"message": "Invalid data"}), 400
    save_tasks(tasks)
    return jsonify({"message": "Tasks saved successfully"})

if __name__ == '__main__':
    app.run(debug=True)
