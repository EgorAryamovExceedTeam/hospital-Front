import React, { useState, useEffect } from "react";
import { Select, MenuItem } from "@material-ui/core";
import _ from "lodash";
import axios from "axios";
import { arrayIncludes } from "@material-ui/pickers/_helpers/utils";

const SortNotes = ({ notes, setNotes }) => {
  const [selector, setSelector] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const [ascDesc, setAscDesc] = useState("asc");

  const bySelectorArr = [
    { key: "", value: false },
    { key: "Имя", value: "name" },
    { key: "Врач", value: "doctor" },
    { key: "Дата", value: "date" },
    { key: "Жалобы", value: "complaint" },
  ];

  const ascOrDescArr = [
    { key: "По Возрастанию", value: "asc" },
    { key: "По Убыванию", value: "desc" },
  ];

  useEffect(() => {
    setIsSelected(!!selector);
  }, [selector]);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:8000/", {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    const result = await response.data.data;
    setNotes(result);
  };

  const handleSort = (e) => {
    setSelector(e.target.value);
    if (e.target.value) {
      const arr = _.sortBy([...notes], (note) => note[e.target.value]);
      setNotes([...arr]);
    } else if (e.target.value) {
      fetchData();
      setAscDesc(false);
    }
  };

  const handleAscDesc = (e) => {
    setAscDesc(e.target.value);
    console.log(ascDesc);
    console.log(selector);
    const arr = _.sortBy([...notes], (note) => note[selector]);
    if (ascDesc === "asc") {
      setNotes([...arr]);
    } else {
      setNotes([...[...notes].reverse()]);
    }
  };

  return (
    <div className="sort-container">
      <label>Сортировать по:</label>
      <Select
        variant="outlined"
        value={selector}
        onChange={(e) => handleSort(e)}
      >
        {bySelectorArr.map((item, index) => {
          return (
            <MenuItem value={item.value} key={index}>
              {item.key}
            </MenuItem>
          );
        })}
      </Select>
      {isSelected && (
        <Select
          variant="outlined"
          value={ascDesc}
          onChange={(e) => handleAscDesc(e)}
        >
          {ascOrDescArr.map((item, index) => {
            return (
              <MenuItem value={item.value} key={index}>
                {item.key}
              </MenuItem>
            );
          })}
        </Select>
      )}
    </div>
  );
};

export default SortNotes;
