import React, { useState } from "react";
import { Select, MenuItem, Button, IconButton } from "@material-ui/core";
import IconDelete from "@material-ui/icons/Delete";
import _ from "lodash";
import axios from "axios";
import "date-fns";
import moment from "moment";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const SortNotes = ({ notes, setNotes }) => {
  const [selector, setSelector] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const [ascendingDescending, setAscendingDescending] = useState("asc");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();

  const bySelectorArr = [
    { key: "None", value: false },
    { key: "Имя", value: "name" },
    { key: "Врач", value: "doctor" },
    { key: "Дата", value: "date" },
    { key: "Жалобы", value: "complaint" },
  ];

  const ascOrDescArr = [
    { key: "По Возрастанию", value: "asc" },
    { key: "По Убыванию", value: "desc" },
  ];

  // requiest for take all notes from DB
  const fetchData = async () => {
    const response = await axios.get("http://localhost:8000/", {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    const result = await response.data.data;
    setNotes(result);
  };

  // sort note's list by fields: name or doctor or date or complaint
  const handleSort = (e) => {
    setSelector(e.target.value);
    setIsSelected(!!e.target.value);
    if (e.target.value) {
      const arr = _.sortBy([...notes], (note) => note[e.target.value]);
      setNotes([...arr]);
    } else if (e.target.value) {
      fetchData();
      setAscendingDescending(false);
    }
  };
  // sort note's list by Ascending or Descending
  const handleAscDesc = (e) => {
    setAscendingDescending(e.target.value);
    const arr = _.sortBy([...notes], (note) => note[selector]);
    if (e.target.value === "asc") {
      setNotes([...arr]);
    } else {
      setNotes([...[...notes].reverse()]);
    }
  };

  const filterList = () => {
    let notesArr = [...notes];
    let needsNotesArr = [];
    // There is testing have we got values in filters fields
    // if all fields have values filter note's list by them
    if (dateFrom && dateTo) {
      notesArr.forEach((item) => {
        const itemDate = new Date(item.date.split(".").reverse().join("-"));
        if (itemDate >= dateFrom && itemDate <= dateTo)
          needsNotesArr.push(item);
      });

      setNotes([...needsNotesArr]);
    }
    // if only first field has value filter note's list by it
    else if (dateFrom) {
      notesArr.forEach((item) => {
        const itemDate = new Date(item.date.split(".").reverse().join("-"));
        if (itemDate >= dateFrom) needsNotesArr.push(item);
      });
      setNotes([...needsNotesArr]);
    }
    // if only second field has value filter note's list by it
    else if (dateTo) {
      notesArr.forEach((item) => {
        const itemDate = new Date(item.date.split(".").reverse().join("-"));
        if (itemDate <= dateTo) needsNotesArr.push(item);
      });
      setNotes([...needsNotesArr]);
    }
    //  if all fields hasn't got values send request for take all task from DB
    else {
      fetchData();
    }
  };

  const closeFilters = () => {
    setDateFrom();
    setDateTo();
    fetchData();
    setIsFilterOpen(false);
  };

  return (
    <div className="sort-container">
      <div className="sort-by">
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
            value={ascendingDescending}
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
      <label>Добавить фильтрацию по дате: </label>
      <Button
        onClick={() => setIsFilterOpen(true)}
        variant="outlined"
        className="open-filters"
      >
        Open
      </Button>
      {isFilterOpen && (
        <div className="filter-by-date">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <label className="date-from-label">С:</label>
            <KeyboardDatePicker
              inputVariant="outlined"
              className="date-field"
              value={dateFrom}
              onChange={(date) => setDateFrom(date)}
              format="dd.MM.yyyy"
              mask={"__.__.____"}
            />
            <label>По:</label>
            <KeyboardDatePicker
              inputVariant="outlined"
              className="date-field"
              value={dateTo}
              onChange={(date) => setDateTo(date)}
              format="dd.MM.yyyy"
              mask={"__.__.____"}
            />
          </MuiPickersUtilsProvider>
          <Button className="filter" onClick={() => filterList()}>
            Фильтровать
          </Button>
          <IconButton
            aria-label="delete"
            className="delete-filter"
            onClick={() => closeFilters()}
          >
            <IconDelete />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default SortNotes;
