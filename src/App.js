import {
  Button,
  Card,
  Col,
  Divider,
  Input,
  Row,
  Space,
  Typography,
} from "antd";
import styled from "styled-components";
import React, { useState } from 'react';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  padding: 16px 24px;
`;

const initialSubTask = {
  name: 'Subtask Name (Todo)',
  isDone: false,
};

const initialTask = [
  {
    name: 'Sample Task',
    isAllDone: false,
    subTasks: [initialSubTask]
  },
];


function App() {
  const [task, setTask] = useState(initialTask);
  const [name, setName] = useState('');
  const [subName, setSubName] = useState('');
  const [isAllDone, setIsAllDone] = useState(false);

  function handleChangeTask(event) {
    setName(event.target.value);
  }

  function handleAddTask() {
    const newTask = task.concat({ name, isAllDone: false, subTasks: [] });
    setTask(newTask);
    setName('');
  }

  function handleRemoveTask(name) {
    const newTask = task.filter((item) => item.name !== name);
    setTask(newTask);
  }

  function handleChangeSubTask(event) {
    setSubName(event.target.value);
  }

  function handleAddSubTask(aTask) {
    const updatedTask = task.map(item =>
      (item.name === aTask.name ? { ...item, subTasks: [...item.subTasks, { name: subName, isDone: false }] } : item));
    setTask(updatedTask);
    setSubName('');
  }

  function handleRemoveSubTask(taskName, subTaskName, i) {
    let { subTasks } = task[i]
    let newSubTask = subTasks.filter(subTask => subTask.name !== subTaskName)
    const updatedTask = task.map(item =>
      (item.name === taskName ? { ...item, subTasks: newSubTask } : item));
    setTask(updatedTask);
  }

  function done_undoSubTask(taskName, subTaskName, i, state) {
    let { subTasks } = task[i]
    let newSubTask = subTasks.map(subTask => subTask.name === subTaskName ? { ...subTask, isDone: state } : subTask)
    const updatedTask = task.map(item =>
      (item.name === taskName ? { ...item, subTasks: newSubTask } : item));
    setTask(updatedTask);
  }

  return (
    <Container>
      <Space>
        <Input style={{ width: 400 }} placeholder="Enter Task Name" value={name} onChange={handleChangeTask} />
        <Button type="primary" onClick={handleAddTask}>Create Task</Button>
      </Space>
      <Space direction="vertical" style={{ marginTop: 24 }}>
        {task && task.map((aTask, i) => (
          <Card
            key={aTask.name}
            title={aTask.name}
            style={{ width: 600 }}
            extra={
              <>
                <Button type="primary">Duplicate</Button>{" "}
                <Button type="primary" danger onClick={() => handleRemoveTask(aTask.name)}>
                  Delete
              </Button>
              </>
            }
          >
            <Space direction="vertical" style={{ width: "100%" }}>
              <Space>
                <Input key={`input-sub-${aTask.name}`} placeholder="Enter Subtask Name" style={{ width: 400 }} value={subName} onChange={handleChangeSubTask} />
                <Button type="primary" onClick={() => handleAddSubTask(aTask)}>Add Subtask</Button>
              </Space>
              <Divider />
              {aTask && aTask.subTasks && aTask.subTasks.map((aSubTask, index) => (
                <Row key={`row-${index}`}>
                  <Col span={16}>
                    <Typography.Text style={aSubTask.isDone && { textDecoration: "line-through" }}>{aSubTask.name}</Typography.Text>
                  </Col>
                  <Col span={8}>
                    {!aSubTask.isDone && <Button key={`b-done-${index}`} type="primary" onClick={() => done_undoSubTask(aTask.name, aSubTask.name, i, true)}>Done</Button>}{" "}
                    {aSubTask.isDone && <Button key={`b-delete-${index}`} type="primary" onClick={() => done_undoSubTask(aTask.name, aSubTask.name, i, false)}>Undo</Button>}{" "}
                    <Button type="danger" onClick={() => handleRemoveSubTask(aTask.name, aSubTask.name, i)}>Delete</Button>
                  </Col>
                </Row>
              ))}
              {/* <Row>
                <Col span={16}>
                  <Typography.Text style={{ textDecoration: "line-through" }}>
                    Subtask Name (Done)
                </Typography.Text>
                </Col>
                <Col span={8}>
                  <Button type="primary">Undo</Button>{" "}
                  <Button type="danger">Delete</Button>
                </Col>
              </Row> */}
            </Space>
          </Card>
        ))}
      </Space>
    </Container>
  );
}

export default App;
