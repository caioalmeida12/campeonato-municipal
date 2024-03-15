import React from "react";
import styles from "./Search.module.css";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@/components/Icons/SearchIcon";
import FilterIcon from "../Icons/FilterIcon";
import OrderIcon from "../Icons/OrderIcon";
import Search from "./Search";
import PlusIcon from "../Icons/PlusIcon";

const SearchGroup = () =>{
    return (
        <div className={styles.searchGroup}>
            <Search label={"Buscar por nome"} icon={SearchIcon} />
            <Search label={"Filtrar por"} icon={FilterIcon} />
            <Search label={"Ordenar por"} icon={OrderIcon} /> 
        </div>
    );
}

export default SearchGroup;