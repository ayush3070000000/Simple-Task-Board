# Simple Task Board

A minimal and intuitive task board web application built with Flask, Tailwind CSS, and vanilla JavaScript. This project offers an elegant solution for managing tasks across different statuses — *To Do*, *In Progress*, and *Done* — with a drag-and-drop interface and persistent storage.

---

## Overview

The Task Board allows users to:

- Add tasks with optional due dates
- Edit or delete existing tasks
- Move tasks between status columns via drag-and-drop
- Save tasks persistently using a local JSON file
- Experience a responsive and modern UI built with Tailwind CSS

Ideal for learning how frontend and backend technologies interact in a full-stack project.

---


## Technologies Used

### Frontend
- HTML5
- Tailwind CSS (via CDN)
- Vanilla JavaScript

### Backend
- Python 3
- Flask Web Framework

### Storage
- JSON file (`tasks.json`) for task persistence

---

Got it! Here's a cleaner and better-formatted version of your project structure for the README, using proper indentation and code block styling for readability:


Ah, I see! You want the project structure *directly written* in markdown (not inside triple backticks or code block) but formatted nicely so it looks good in the README file.

Here’s a version that looks neat and readable **without code block**, using markdown lists and indentation:

---

## Project Structure

* **task-board/**

  * `app.py` — Flask backend server
  * `tasks.json` — Local JSON file for storing tasks
  * **templates/**

    * `index.html` — Main HTML page
  * **static/**

    * `style.css` — Custom styles
    * `script.js` — Frontend logic and interactivity

---


## Setup Instructions

### 1. Prerequisites

Make sure you have the following installed on your system:

* **Python 3.7** or higher
* **pip** (Python package manager)



Got it! Here’s the **Clone the Repository** step updated with your GitHub username:

---

### 2. Clone the Repository

```bash
git clone https://github.com/ayush3070000000/task-board.git
cd task-board
```


Sure! Here are points **3, 4, and 5** for your **Setup Instructions** section, polished and ready to paste:

---

### 3. (Optional) Create a Virtual Environment

It's a good practice to create a virtual environment to keep dependencies isolated:

```bash
python -m venv venv
source venv/bin/activate        # macOS/Linux
venv\Scripts\activate           # Windows
```

---

### 4. Install Dependencies

Install the required Python packages with pip:

```bash
pip install flask
```

---

### 5. Run the Application

Start the Flask development server:

```bash
python app.py
```

Then open your browser and visit: `http://localhost:5000`

---


Absolutely! Here are the **API Reference** and **Customization & Extensions** sections for your README, formatted cleanly:

---

## API Reference

### `GET /api/tasks`

Returns the list of tasks as a JSON array.

---

### `POST /api/tasks`

Accepts an array of task objects to update the task list. Example request body:

```json
[
  {
    "id": "1716045128743",
    "text": "Finish README file",
    "status": "in-progress",
    "due": "2025-05-18"
  }
]
```

---

## Customization & Extensions

Here are some ideas to extend and customize this project:

* Replace the local `tasks.json` storage with a database (e.g., SQLite, PostgreSQL) for better scalability
* Add user authentication and authorization (using Flask-Login or similar)
* Enable priority labels or color-coded tags for tasks
* Implement task filtering or search functionality
* Add notifications or reminders for due dates
* Deploy the app to cloud platforms like Render, Railway, or Heroku

---

