import React, {useState, useEffect} from "react";
import { IconButton, Button, AddBox, TextField} from "@material-ui/core"
import FilterBar from "./FilterBar"

const DateFilter = ({notes, setNotes}) => {
    const [openFilter, setOpenFilter] = useState(false);
    
    return(<div className="filter container">
        <label>Добавить сортировку по дате:</label>
        <IconButton arial-label="add">
            <AddBox 
            className="add"
            onClick={() => setOpenFilter(true)}/>
            {openFilter && <FilterBar notes={notes} setNotes={setNotes} /> }
        </IconButton>
    </div>)
}