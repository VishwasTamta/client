import { Box, Button, Card, Slide } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, Link } from "react-router-dom";

const FileView = () => {
  const {
    state: { fileName, folders },
  } = useLocation();
  const [files, setFiles] = useState([]);
  const [page, setPage] = useState(0);
  const [slide, setSlide] = useState({ direction: "left", in: true });

  const containerRef = useRef(null);

  useEffect(() => {
    const getFiles = async () => {
      const response = await fetch(
        `http://localhost:8080/folder/getFiles/${fileName}`
      );
      const data = await response.json();
      setFiles(data?.files);
      console.log(data?.files);
    };
    getFiles();
  }, [fileName]);

  const handleNextClicked = async () => {
    setSlide((prev) => ({
      in: false,
      direction: prev.direction === "left" ? "right" : "left",
    }));
    const response = await fetch(
      `http://localhost:8080/folder/getFiles/${folders[page]}`
    );
    const data = await response.json();
    setTimeout(() => {
      setFiles(data?.files);
      setPage((prev) => prev + 1);
      setSlide((prev) => ({
        in: true,
        direction: prev.direction === "left" ? "right" : "left",
      }));
    }, [500]);
  };

  return (
    <div
      className="flex items-center justify-center h-[100vh]"
      ref={containerRef}
    >
      <Card variant="outlined" className="p-2">
        <div className="text-right mb-2">
          <Link to={"/dir_view"}>X</Link>
        </div>
        <div className="flex">
          <Slide
            direction={slide.direction}
            in={slide.in}
            container={containerRef.current}
          >
            <div className="flex">
              <Card variant="outlined mr-2">
                <img
                  className="w-[300px] h-[300px]"
                  src={`http://localhost:8080/folders/${files[0]}`}
                  alt="img1"
                />
              </Card>
              <Card variant="outlined">
                <img
                  className="w-[300px] h-[300px]"
                  src={`http://localhost:8080/folders/${files[1]}`}
                  alt="img2"
                />
              </Card>
            </div>
          </Slide>
        </div>
        <Box marginTop={1} display={"flex"} justifyContent={"flex-end"}>
          <Button
            variant="contained"
            className="text-right hover:cursor-pointer"
            onClick={handleNextClicked}
          >
            Next
          </Button>
        </Box>
      </Card>
    </div>
  );
};

export default FileView;
