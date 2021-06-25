import React, { useState, useEffect } from "react";
import { Select, MenuItem } from "@material-ui/core";

const SortNotes = ({ notes, setNotes }) => {
  const [selector, setSelector] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const [toUptoDown, setToUpToDown] = useState("");
  console.log(notes);
  const allNotes = [...notes];

  useEffect(() => {
    setIsSelected(selector);
  }, [selector]);

  const sortBy = () => {
    if (selector) {
      const allTasks = [...notes];
      switch (selector) {
        case "Имя": {
          allTasks.sort((thisTask, nextTask) => {
            if (thisTask.name > nextTask.name) return 1;
            if (thisTask.name === nextTask.name) return 0;
            if (thisTask.name < nextTask.name) return -1;
            setNotes([...allTasks]);
          });

          break;
        }
        case "Врач": {
          allTasks.sort((thisTask, nextTask) => {
            if (thisTask.doctor > nextTask.doctor) return 1;
            if (thisTask.doctor === nextTask.doctor) return 0;
            if (thisTask.doctor < nextTask.doctor) return -1;
            setNotes([...allTasks]);
          });
          break;
        }
        case "Дата": {
          allTasks.sort((thisTask, nextTask) => {
            let thisDate = +thisTask.thisDate;
            let nextDate = +nextTask.date;

            if (thisDate > nextDate) return 1;
            if (thisDate === nextDate) return 0;
            if (thisDate < nextDate) return -1;
            setNotes([...allTasks]);
          });
          break;
        }
        case "Жалобы": {
          allTasks.sort((thisTask, nextTask) => {
            if (thisTask.complaint > nextTask.complaint) return 1;
            if (thisTask.complaint === nextTask.complaint) return 0;
            if (thisTask.complaint < nextTask.complaint) return -1;
            setNotes([...allTasks]);
          });
          break;
        }
        default: {
          return 0;
        }
      }
    } else {
      setNotes([...allNotes]);
    }
  };

  useEffect(() => {
    if (isSelected) {
      sortBy();
    }
  }, [isSelected]);

  return (
    <div className="sort-container">
      <label>Сортировать по:</label>
      <Select
        variant="outlined"
        value={selector}
        onChange={(e) => setSelector(e.target.value)}
      >
        <MenuItem value="" />
        <MenuItem value="Имя">Имя</MenuItem>
        <MenuItem value="Врач">Врач</MenuItem>
        <MenuItem value="Дата">Дата</MenuItem>
        <MenuItem value="Жалобы">Жалобы</MenuItem>
      </Select>
      {isSelected && (
        <Select
          variant="outlined"
          value={toUptoDown}
          onChange={(e) => setToUpToDown(e.target.value)}
        >
          <MenuItem value="" />
          <MenuItem value="По Возрастанию">По возрастанию</MenuItem>
          <MenuItem value="По Убыванию">По убыванию</MenuItem>
        </Select>
      )}
    </div>
  );
};

export default SortNotes;
