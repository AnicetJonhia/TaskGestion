import React, { useContext, useState } from 'react';
import { ListGroup, ListGroupItem, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Draggable } from 'react-beautiful-dnd';
import { TaskContext } from '../../context/TaskContext';

const Complete = () => {
  const { tasks, deleteTask, editTask, setEditingTask } = useContext(TaskContext);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const toggle = (taskId) => {
    setDropdownOpen(dropdownOpen === taskId ? null : taskId);
  };

  const filteredTasks = tasks.filter(task => task.status === 'complete');

  return (
    <ListGroup>
      {filteredTasks.map((task, index) => (
        <Draggable key={task.id} draggableId={String(task.id)} index={index}>
          {(provided) => (
            <ListGroupItem
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', ...provided.draggableProps.style }}
            >
              <span>{task.name}</span>
              <Dropdown isOpen={dropdownOpen === task.id} toggle={() => toggle(task.id)} direction="left">
                <DropdownToggle tag="span" onClick={() => toggle(task.id)} style={{ cursor: 'pointer' }}>
                  <MoreVertIcon />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => setEditingTask(task)}>Edit</DropdownItem>
                  <DropdownItem onClick={() => deleteTask(task.id)}>Delete</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </ListGroupItem>
          )}
        </Draggable>
      ))}
    </ListGroup>
  );
};

export default Complete;
