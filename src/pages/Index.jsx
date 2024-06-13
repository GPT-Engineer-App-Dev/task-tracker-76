import React, { useState } from 'react';
import { Container, VStack, HStack, Input, Button, IconButton, Checkbox, Text } from "@chakra-ui/react";
import { FaTrash, FaEdit } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddTask = () => {
    if (!inputValue.trim()) return;
    if (isEditing) {
      const updatedTasks = tasks.map((task, index) => 
        index === editIndex ? { ...task, text: inputValue } : task
      );
      setTasks(updatedTasks);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setTasks([...tasks, { text: inputValue, completed: false }]);
    }
    setInputValue("");
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleEditTask = (index) => {
    setInputValue(tasks[index].text);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleToggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) => 
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} w="100%">
        <HStack w="100%">
          <Input 
            placeholder="Enter a task" 
            value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)} 
          />
          <Button onClick={handleAddTask}>{isEditing ? "Edit" : "Add"}</Button>
        </HStack>
        <VStack spacing={2} w="100%">
          {tasks.map((task, index) => (
            <HStack key={index} w="100%" spacing={4}>
              <Checkbox 
                isChecked={task.completed} 
                onChange={() => handleToggleComplete(index)}
              />
              <Text 
                as={task.completed ? "s" : ""}
                flex="1"
              >
                {task.text}
              </Text>
              <IconButton 
                aria-label="Edit task" 
                icon={<FaEdit />} 
                onClick={() => handleEditTask(index)} 
              />
              <IconButton 
                aria-label="Delete task" 
                icon={<FaTrash />} 
                onClick={() => handleDeleteTask(index)} 
              />
            </HStack>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;