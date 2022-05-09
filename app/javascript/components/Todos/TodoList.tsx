import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { AiFillEdit } from "react-icons/ai";

type TProps = {
  is_completed: boolean;
};

const SearchAndButtton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 32px;
`;

const SearchForm = styled.input`
  width: 100%;
  height: 40px;
  margin: 10px 0;
  padding: 10px;
  font-size: 18px;
  border: 1px solid #444;
  border-radius: 6px;
`;

const RemoveAllButton = styled.button`
  width: 140px;
  height: 40px;
  margin-left: 12px;
  padding: 0 10px;
  color: #fff;
  font-size: 13px;
  border-radius: 4px;
  cursor: pointer;
  background: #f54242;
`;

const TodoName = styled.span`
  font-size: 20px;
  ${({ is_completed }: TProps) =>
    is_completed &&
    `
    opacity: 0.4;
  `}
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px auto;
  padding: 10px;
  font-size: 20px;
`;

const CheckedBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0 7px;
  color: green;
  cursor: pointer;
`;

const UncheckedBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0 7px;
  cursor: pointer;
`;

const EditButton = styled.span`
  display: flex;
  align-items: center;
  margin: 0 6px;
`;

const TodoList = () => {
  const [todos, setTodos] = useState([]),
    [searchName, setSearchName] = useState("");

  useEffect(() => {
    axios
      .get("/api/v1/todos.json")
      .then((resp) => {
        console.log(resp.data);
        setTodos(resp.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const removeAllTodos = () => {
    const sure = window.confirm("Are you sure?");
    if (sure) {
      axios
        .delete("/api/v1/todos/destroy_all")
        .then((resp) => {
          setTodos([]);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const updateIsCompleted = (index, val) => {
    let data = {
      id: val.id,
      name: val.name,
      is_completed: !val.is_completed,
    };
    axios.patch(`/api/v1/todos/${val.id}`, data).then((resp) => {
      const newTodos = [...todos];
      newTodos[index].is_completed = resp.data.is_completed;
      setTodos(newTodos);
    });
  };

  return (
    <>
      <h2 className="page-title">リスト一覧</h2>
      <SearchAndButtton>
        <SearchForm
          type="text"
          placeholder="ToDoを検索する..."
          onChange={(event) => {
            setSearchName(event.target.value);
          }}
        />
        <RemoveAllButton onClick={removeAllTodos}>
          全てのToDoを削除する
        </RemoveAllButton>
      </SearchAndButtton>
      <div>
        {todos
          .filter((val) => {
            if (searchName === "") {
              return val;
            } else if (
              val.name.toLowerCase().includes(searchName.toLowerCase())
            ) {
              return val;
            }
          })
          .map((val, key) => {
            return (
              <Row key={key}>
                {val.is_completed ? (
                  <CheckedBox>
                    <ImCheckboxChecked
                      onClick={() => updateIsCompleted(key, val)}
                    />
                  </CheckedBox>
                ) : (
                  <UncheckedBox>
                    <ImCheckboxUnchecked
                      onClick={() => updateIsCompleted(key, val)}
                    />
                  </UncheckedBox>
                )}
                <TodoName is_completed={val.is_completed}>{val.name}</TodoName>
                <Link to={"/" + val.id + "/edit"}>
                  <EditButton>
                    <AiFillEdit />
                  </EditButton>
                </Link>
              </Row>
            );
          })}
      </div>
    </>
  );
};

export default TodoList;
