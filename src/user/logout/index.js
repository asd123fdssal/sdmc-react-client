import React, {useEffect, useState} from "react";
import axios from "axios";
import {API_URL} from "../../config/constants";
import {Navigate} from "react-router-dom";

export function Logout(){
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        axios
            .get(`${API_URL}/logout`)
            .then((res) => {
                setIsSuccess(true);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    if(isSuccess){
        return <Navigate to='/' />
    }
}