import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, ListGroup, InputGroup, FormControl, Card, Alert } from 'react-bootstrap';

const TaskMananger = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [editTaskName, setEditTaskName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/tasks'); 
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks', error);
        setErrorMessage('Failed to load tasks.');
      }
    };

    fetchTasks();
  }, []);

  const handleCreateTask = async () => {
    try {
      const response = await axios.post('/api/tasks', { name: newTask, dueDate }); 
      setTasks([...tasks, response.data]);
      setNewTask('');
      setDueDate('');
      setErrorMessage('');
    } catch (error) {
      console.error('Error creating task', error);
      setErrorMessage('Failed to create task.');
    }
  };

  const handleUpdateTask = async (taskId) => {
    try {
      const response = await axios.put(`/api/tasks/${taskId}`, { name: editTaskName }); 
      const updatedTasks = tasks.map(task =>
        task.id === taskId ? response.data : task
      );
      setTasks(updatedTasks);
      setEditingTask(null);
      setEditTaskName('');
      setErrorMessage('');
    } catch (error) {
      console.error('Error updating task', error);
      setErrorMessage('Failed to update task.');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`/api/tasks/${taskId}`);
      setTasks(tasks.filter(task => task.id !== taskId));
      setErrorMessage('');
    } catch (error) {
      console.error('Error deleting task', error);
      setErrorMessage('Failed to delete task.');
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Task Manager</h1>

      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      <Card className="mb-4">
        <Card.Body>
          <Form>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="New task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
              <FormControl
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
              <Button variant="primary" onClick={handleCreateTask}>Add Task</Button>
            </InputGroup>
          </Form>
        </Card.Body>
      </Card>

      <ListGroup>
        {tasks.map(task => (
          <ListGroup.Item key={task.id} className="d-flex justify-content-between align-items-center">
            {editingTask === task.id ? (
              <div className="d-flex">
                <Form.Control
                  type="text"
                  value={editTaskName}
                  onChange={(e) => setEditTaskName(e.target.value)}
                  className="me-2"
                />
                <Button variant="success" onClick={() => handleUpdateTask(task.id)} className="me-2">Save</Button>
                <Button variant="secondary" onClick={() => setEditingTask(null)}>Cancel</Button>
              </div>
            ) : (
              <div className="d-flex justify-content-between align-items-center w-100">
                <div>
                  <span className="me-3">{task.name}</span>
                  <span className="badge bg-secondary">{task.dueDate}</span>
                </div>
                <div className="d-flex">
                  <Button variant="warning" onClick={() => { setEditingTask(task.id); setEditTaskName(task.name); }} className="ms-2">Edit</Button>
                  <Button variant="danger" onClick={() => handleDeleteTask(task.id)} className="ms-2">Delete</Button>
                </div>
              </div>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default TaskMananger;
