import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";

const Header = () => {
  return (
    <>
      <AppBar position="fixed" sx={{ background: "#fff", color: "#444" }}>
        <Toolbar
          sx={{
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 40px",
          }}
        >
          <h1>
            <Link to="/">todo app</Link>
          </h1>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0 16px",
            }}
          >
            <ButtonGroup
              variant="contained"
              aria-label="large text button group"
            >
              <Link to="/">
                <Button
                  sx={{
                    color: "#444",
                    background: "#ffcd83",
                  }}
                >
                  リスト
                </Button>
              </Link>
              <Link to="/new">
                <Button sx={{ color: "#444", background: "#ffcd83" }}>
                  新規作成
                </Button>
              </Link>
            </ButtonGroup>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
