import React, {useEffect, useState} from 'react';
import api from '../../service/api';
import Spinner from "../../components/spinner";
import {Link} from "react-router-dom";

export default function Interna(props) {

    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState([]);
    const id = props.match.params.id;

    /*function firstLetter(txt) {
        if (txt !== undefined) {
            return txt[0];
        }
    }*/

    useEffect(() => {
        setIsLoading(true);
        api.get(`/enterprises/${id}`, {
            headers: {
                "access-token": localStorage.getItem('token'),
                "client": localStorage.getItem('client'),
                "uid": localStorage.getItem('uid')
            }
        })
            .then((res) => {
                setResult(res.data.enterprise)
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err.response.status);
                setIsLoading(false);
            });
    }, [id]);

    return (
        <div>
            <Spinner status={isLoading}/>

            <div className="w-100 bg-top-bar">
                <div className="top-bar container">
                    <div className="container d-flex flex-row align-items-center">
                        <Link className="btn-back" to="/home">Voltar</Link> {result.enterprise_name}
                    </div>
                </div>
            </div>

            <div className="container description">
                <div className="big-letter">
                    {result.enterprise_name !== undefined && result.enterprise_name[0]}
                </div>
                <p>{result.description}</p>
            </div>
        </div>
    )
}