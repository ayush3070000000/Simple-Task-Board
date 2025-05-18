let tasks = [];

const lists = {
    todo: document.getElementById('todoList'),
    'in-progress': document.getElementById('inProgressList'),
    done: document.getElementById('doneList'),
};

// Fetch tasks from backend on load
fetch('/api/tasks')
    .then((res) => res.json())
    .then((data) => {
        tasks = data;
        render();
    })
    .catch((err) => {
        console.error('Failed to fetch tasks:', err);
    });

// Save tasks to backend
function save() {
  fetch('/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tasks),
  })
    .then((res) => res.json())
    .then((data) => {
      document.getElementById('statusMsg').textContent = data.message;
      setTimeout(() => (document.getElementById('statusMsg').textContent = ''), 3000);
    })
    .catch((err) => {
      console.error('Failed to save tasks:', err);
    });
}

// Render tasks into columns
function render() {
    Object.values(lists).forEach((ul) => (ul.innerHTML = ''));

    tasks.forEach((task) => {
        const li = document.createElement('li');
        li.className = 'task bg-[#e6f6ff] border-l-4 border-[#096f92] rounded p-3 mb-3 flex justify-between items-center cursor-move';
        li.draggable = true;
        li.dataset.id = task.id;
        li.dataset.status = task.status;

        li.innerHTML = `
            <span class="text flex-1">
                ${task.text}${task.due ? ' — Due: ' + task.due : ''}
            </span>
            <div>
                <button class="edit text-[#096f92] hover:text-[#064f68] mr-2" title="Edit task">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="delete text-[#096f92] hover:text-[#064f68]" title="Delete task">
                <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;


    li.addEventListener('dragstart', (e) => {
      li.classList.add('dragging');
      e.dataTransfer.setData('text/plain', task.id);
    });

    li.addEventListener('dragend', () => li.classList.remove('dragging'));

    li.querySelector('.edit').onclick = () =>
        {
            const newText = prompt('Edit task', task.text);
            if (newText !== null) {
                const trimmedText = newText.trim();

                // Only allow editing due date if task name is not empty
                if (trimmedText === '') {
                    alert('Task name cannot be empty.');
                    return;
                }

                const newDue = prompt('Edit due date (YYYY-MM-DD)', task.due || '');
                if (newDue === '' || /^\d{4}-\d{2}-\d{2}$/.test(newDue)) {
                    task.text = trimmedText;
                    task.due = newDue.trim();
                    save();
                    render();
                } else {
                    alert('Invalid date format. Please use YYYY-MM-DD or leave it empty.');
                }
            }
        };



    li.querySelector('.delete').onclick = () =>
        {
            if (confirm('Are you sure you want to delete this task?')) {
                tasks = tasks.filter((t) => t.id !== task.id);
                save();
                render();
            }
        };

    lists[task.status].appendChild(li);
  });
}

// Make columns droppable
document.querySelectorAll('.column').forEach((col) => {
  col.addEventListener('dragover', (e) => e.preventDefault());

  col.addEventListener('drop', (e) => {
    const id = e.dataTransfer.getData('text/plain');
    const task = tasks.find((t) => t.id === id);
    if (task) {
      task.status = col.dataset.status;
      save();
      render();
    }
  });
});

// Add new task
const inputEl = document.getElementById('newTaskText');
const dueEl = document.getElementById('newTaskDue');
const addBtn = document.getElementById('addTaskBtn');

function addTask() {
    const text = inputEl.value.trim();
    const due = dueEl.value;

    if (!text) {
        alert('Enter task text!');
        return;
    }

    const newTask = {
        id: Date.now().toString(),
        text,
        status: 'todo',
        due: due || '',
    };

    tasks.push(newTask);
    inputEl.value = '';
    dueEl.value = '';
    save();
    render();
}

addBtn.onclick = addTask;

inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Save button functionality
document.getElementById('saveTasksBtn').onclick = () => {
    save();
    alert('Tasks saved successfully.');
};
