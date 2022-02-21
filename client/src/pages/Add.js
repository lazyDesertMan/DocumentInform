import React from "react";
import AddDoc from "../components/AddDoc"
import AddTask from "../components/AddTask"
import { useNavigate, useParams } from "react-router-dom";

const Add = () => {
    const {id} = useParams();
    console.log(id);
    return(
        <div>
            {id == 1? 
            <AddDoc/>
            : id == 2?
            <div>Юзер</div>
            :
            <AddTask/>}
            
        </div>
    );
};
export default Add;