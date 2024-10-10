import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import todo from "../assets/images/todo.png";
import BackHandIcon from "@mui/icons-material/BackHand";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";
import { json } from "react-router-dom";
// use to store data in locally
const getLocalStorageData = () => {
  const list = localStorage.getItem("myTodoList");
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};
function Todo2() {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalStorageData());
  const [EditItemsValue, setEditIemsValue] = useState("");
  const [toggleButton, SetToggleButton] = useState(false);
  const [clearAllData, setClearAllData] = useState(false);

  const handlesubmit = () => {
    if (!inputData) {
      return alert("please enter somthing");
    } else if (inputData && toggleButton) {
      setItems(
        items.map((curentElem) => {
          if (curentElem.id === EditItemsValue) {
            return { ...curentElem, name: inputData };
          }
          return curentElem;
        })
      );
      setInputData("");
      setEditIemsValue(null);
      SetToggleButton(false);
    } else {
      const newInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, newInputData]);
    }
    setInputData("");
    // setAddButon(false);
  };
  const handlDelete = (index) => {
    const updatedItems = items.filter((curentItem) => {
      return curentItem.id !== index;
    });
    setItems(updatedItems);
  };
  // adding localstorage
  useEffect(() => {
    localStorage.setItem("myTodoList", JSON.stringify(items));
  }, [items]);
  const handleEdit = (index) => {
    const newEditValue = items.find((curentElem) => {
      return curentElem.id === index;
    });
    setInputData(newEditValue.name);
    setEditIemsValue(index);
    SetToggleButton(true);
  };

  return (
    <>
      {/* this is a todo list jani */}
      <Box
        sx={{
          backgroundColor: "#3f51b5",
          color: "white",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          border={"1px solid white"}
          p={2}
          textAlign={"center"}
          bgcolor={"white"}
          color={"black"}
          width={450}
          height={400}
          overflow="auto"
          borderRadius={"5%"}
          boxShadow={"2px 2px 0.5px white"}
        >
          <Box>
            <img src={todo} alt="pic is here" height={"50px"} />
            <Typography>Add your list here ✌</Typography>
            <TextField
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start"> ✍</InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      {toggleButton ? (
                        <IconButton onClick={handlesubmit}>
                          <EditIcon />
                        </IconButton>
                      ) : (
                        <IconButton onClick={handlesubmit}>
                          <AddIcon />
                        </IconButton>
                      )}
                    </InputAdornment>
                  ),
                },
              }}
              size="small"
              fullWidth
              sx={{
                backgroundColor: "white",
                color: "black",
                fontSize: "8px",
                width: "70%",
              }}
              onChange={(e) => setInputData(e.target.value)}
              value={inputData}
            />
          </Box>

          <ul
            style={{
              // height: "100px",
              overflowY: "auto",
            }}
          >
            {items.map((curretValue) => {
              return (
                <ListItem
                  key={curretValue.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "pink",
                    mt: "10px",
                    padding: "2px 5px",
                    borderBottom: "1px solid #ccc",
                    width: 380,
                  }}
                >
                  <Typography variant="subtitle1">
                    {curretValue.name}
                  </Typography>
                  <Box>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => {
                        handleEdit(curretValue.id);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="secondary"
                      onClick={() => {
                        return handlDelete(curretValue.id);
                      }}
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </Box>
                </ListItem>
              );
            })}
          </ul>
          <Box>
            <Button
              variant="contained"
              size="small"
              color="error"
              onClick={() => {
                setItems([]);
              }}
            >
              <CloseIcon fontSize="small" />
              <span style={{ fontSize: "12px" }}>Remove All </span>
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Todo2;
