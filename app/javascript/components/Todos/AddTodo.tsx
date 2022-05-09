import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiSend } from "react-icons/fi";

const InputAndButton = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 42px;
`;

const InputName = styled.input`
  font-size: 18px;
  width: 100%;
  height: 40px;
  padding: 10px;
  border: 1px solid #444;
  border-radius: 6px;
`;

const Button = styled.button`
  margin-left: 10px;
  padding: 2px 10px;
  color: #fff;
  font-size: 18px;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
  background: #1e90ff;
  ${({ disabled }) =>
    disabled &&
    `
    opacity: 0.5;
    cursor: default;
  `}
`;

const Icon = styled.span`
  display: flex;
  align-items: center;
  margin: 0 7px;
`;

toast.configure();

const AddTodo = (props) => {
  const initialTodoState = {
    id: null,
    name: "",
    is_completed: false,
  };

  const [todo, setTodo] = useState(initialTodoState);

  const notify = () => {
    toast.success("Todo successfully created!", {
      position: "bottom-center",
      hideProgressBar: true,
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTodo({ ...todo, [name]: value });
  };

  const saveTodo = () => {
    var data = {
      name: todo.name,
    };

    axios
      .post("/api/v1/todos", data)
      .then((resp) => {
        setTodo({
          id: resp.data.id,
          name: resp.data.name,
          is_completed: resp.data.is_completed,
        });
        notify();
        props.history.push("/");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <h2 className="page-title">新規作成</h2>
      <InputAndButton>
        <InputName
          type="text"
          required
          value={todo.name}
          onChange={handleInputChange}
          name="name"
        />
        <Button
          onClick={saveTodo}
          disabled={!todo.name || /^\s*$/.test(todo.name)}
        >
          <Icon>
            <FiSend />
          </Icon>
        </Button>
      </InputAndButton>
    </>
  );
};

export default AddTodo;
