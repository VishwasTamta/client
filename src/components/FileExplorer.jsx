import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setInitialPath,
  setPath,
  selectPath,
  setCompletePath,
} from "../redux/slice/fileSlice";
import { useNavigate } from "react-router-dom";

const FileExplorer = () => {
  const [folders, setFolders] = useState([]);
  const path = useSelector(selectPath);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const getFolders = async () => {
      const response = await fetch(`http://localhost:8080/folder/getFolder`, {
        method: "POST",
        body: JSON.stringify({ pathName: path.join(">"), page: page }),
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await response.json();
      if (data?.status === 400) {
        navigate("/file_view", {
          state: {
            fileName: path[path.length - 1],
            folders: folders.filter((e) => e !== path[path.length - 1]),
          },
        });
        // window.open(`http://localhost:8080/folders${path.join("/")}`);
      }
      if (data?.isEnd) return;
      if (data?.folders?.length > 0) {
        if (page > 0) {
          setFolders((prev) => [...prev, ...data?.folders]);
        } else {
          setFolders(data?.folders);
        }
      } else {
        dispatch(setInitialPath());
      }
    };
    getFolders();
  }, [path, page]);

  const handleFolderClicked = async (folderName) => {
    setPage(0);
    if (folderName === "/") {
      dispatch(setInitialPath());
    } else {
      dispatch(setPath({ path: folderName }));
    }
  };

  const handleScroll = (e) => {
    const scrollHeight = e.target.scrollHeight;
    const scrollTop = e.target.scrollTop;
    const scrolled = Math.floor(scrollHeight - scrollTop);
    if (scrolled === e.target.offsetHeight) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="border p-2 rounded">
      <div>
        {path?.map((name, index) => {
          return (
            <span
              onClick={() => {
                setPage(0);
                dispatch(
                  setCompletePath({ path: path.filter((_, i) => i <= index) })
                );
              }}
              key={index + name}
              className="mr-2 cursor-pointer"
            >
              {name}{" "}
              {index === path.length - 1 ? null : (
                <span className="m-2">{">"}</span>
              )}
            </span>
          );
        })}
      </div>
      <div>
        <p>Folder Name</p>
      </div>
      <div
        className="mt-5 w-[500px] overflow-y-scroll h-[350px]"
        onScroll={(e) => handleScroll(e)}
      >
        {folders?.map((folder, index) => {
          return (
            <div key={index + folder}>
              <div
                onClick={() => handleFolderClicked(folder)}
                className="flex items-center cursor-pointer mb-5"
              >
                <img
                  src={folder.includes(".") ? "/File.svg" : "/Folder.svg"}
                  alt="Folder Icon"
                  className="mr-2"
                />
                <p>{folder}</p>
              </div>
              <hr />
            </div>
          );
        })}
        <p>---End---</p>
      </div>
    </div>
  );
};

export default FileExplorer;
