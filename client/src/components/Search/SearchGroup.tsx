import React from "react";
import styles from "./Search.module.css";
import SearchIcon from "@/components/Icons/SearchIcon";
import FilterIcon from "../Icons/FilterIcon";
import OrderIcon from "../Icons/OrderIcon";
import Search from "./Search";
import PlusIcon from "../Icons/PlusIcon";
import Button from "@mui/material/Button";

const SearchGroup = ({ buttonText }) =>{
    return (
        <div className={styles.searchGroup}>
            <Search label={"Buscar por nome"} icon={SearchIcon} />
            <Search label={"Ordenar por"} icon={OrderIcon} /> 
            <Button variant="contained" color="primary" startIcon={<PlusIcon />}>
                {buttonText}
            </Button>
        </div>
    );
}

export default SearchGroup;