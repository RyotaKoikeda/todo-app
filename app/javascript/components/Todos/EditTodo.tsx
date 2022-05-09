import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InputName = styled.input`
  width: 100%;
  margin: 16px 0 40px;
  padding: 10px;
  color: #888;
  font-size: 22px;
  text-align: left;
  border: 1px solid #444;
  border-radius: 6px;
`;

const CurrentStatus = styled.div`
  width: 100%;
  font-size: 22px;
  margin: 16px 0 40px;
`;

const IsCompeletedButton = styled.button`
  color: #fff;
  font-size: 17px;
  padding: 5px 10px;
  background: #f2a115;
  border-radius: 3px;
  cursor: pointer;
`;

const EditButton = styled.button`
  color: white;
  font-size: 17px;
  padding: 5px 10px;
  margin: 0 10px;
  background: #0ac620;
  border-radius: 3px;
`;

const DeleteButton = styled.button`
  color: #fff;
  font-size: 17px;
  padding: 5px 10px;
  background: #f54242;
  border-radius: 3px;
  cursor: pointer;
`;

toast.configure();

const EditTodo = (props) => {
  const initialTodoState = {
    id: null,
    name: "",
    is_completed: false,
  };

  const [currentTodo, setCurrentTodo] = useState(initialTodoState);

  const notify = () => {
    toast.success("Todo successfully updated!", {
      position: "bottom-center",
      hideProgressBar: true,
    });
  };

  const getTodo = (id) => {
    axios
      .get(`/api/v1/todos/${id}`)
      .then((resp) => {
        setCurrentTodo(resp.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getTodo(props.match.params.id);
    console.log(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentTodo({ ...currentTodo, [name]: value });
  };

  const updateIsCompleted = (val) => {
    var data = {
      id: val.id,
      name: val.name,
      is_completed: !val.is_completed,
    };
    axios.patch(`/api/v1/todos/${val.id}`, data).then((resp) => {
      setCurrentTodo(resp.data);
    });
  };

  const updateTodo = () => {
    axios
      .patch(`/api/v1/todos/${currentTodo.id}`, currentTodo)
      .then((response) => {
        notify();
        props.history.push("/");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteTodo = () => {
    const sure = window.confirm("Are you sure?");
    if (sure) {
      axios
        .delete(`/api/v1/todos/${currentTodo.id}`)
        .then((resp) => {
          console.log(resp.data);
          props.history.push("/");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <>
      <h2 className="page-title">編集ページ</h2>
      <div
        style={{
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <div
          style={{
            marginTop: "32px",
          }}
        >
          <label htmlFor="name">ToDo</label>
          <InputName
            type="text"
            id="name"
            name="name"
            value={currentTodo.name}
            onChange={handleInputChange}
          />
          <div>
            <span>現在のステータス</span>
            <br />
            <CurrentStatus>
              {currentTodo.is_completed ? "Completed" : "UnCompleted"}
            </CurrentStatus>
          </div>
        </div>
        {currentTodo.is_completed ? (
          <IsCompeletedButton
            className="badge badge-primary mr-2"
            onClick={() => updateIsCompleted(currentTodo)}
          >
            UnCompleted
          </IsCompeletedButton>
        ) : (
          <IsCompeletedButton
            className="badge badge-primary mr-2"
            onClick={() => updateIsCompleted(currentTodo)}
          >
            Completed
          </IsCompeletedButton>
        )}
        <EditButton type="submit" onClick={updateTodo}>
          更新する
        </EditButton>
        <DeleteButton className="badge badge-danger mr-2" onClick={deleteTodo}>
          削除する
        </DeleteButton>
      </div>
    </>
  );
};

export default EditTodo;
