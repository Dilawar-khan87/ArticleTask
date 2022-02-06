import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';


export default function App() {
  const [state, setState] = useState({
    isLoading: true,
    isError: false,
    data: [],
    rows: [],
  });
  useEffect(() => {
    fetch(
      "https://storage.googleapis.com/aller-structure-task/test_data.json"
    ).then((res) => {
      res.json().then((data) => {
        data.map((item) => {
          item.map((rows) => {
            console.log(rows);
            setState({
              isLoading: false,
              isError: false,
              data: data,
            });
          });
        });
      });
    });
    return () => {};
  }, []);

  return (
    <div>
      {!state.isLoading &&
        state.data.map((subArray, index) => {
          return (
            <div key={index}>
              {subArray.map((subitem, i) => {
                return (
                  <div>
                    {subitem.columns.map((item, index) => {
                      return (
                        <div
                          key={index}
                          style={{
                            width: "16%",
                            height: 400,
                            margin: "auto",
                          }}
                        >
                          <Card>
                            <CardActionArea>
                              <CardMedia>
                                <img src={item.imageUrl} alt="green iguana" height={'140'} />
                              </CardMedia>
                              <CardContent>
                                <Typography
                                  gutterBottom
                                  variant="h5"
                                  component="div"
                                >
                                  Type:{item.type}
                                </Typography>
                                <Typography variant="h5">
                                  Title:
                                  {item.title}
                                </Typography>
                                <Button
                                variant="contained"
                                    onClick={() => {
                                      alert(item.title);
                                    }}
                                  >
                                    Click to show title
                                  </Button>
                              </CardContent>
                            </CardActionArea>
                          </Card>
                          
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          );
        })}
    </div>
  );
}
