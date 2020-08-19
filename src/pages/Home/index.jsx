import React, {useEffect, useState} from 'react';
import logo from '../../images/logo-white.png';
import {Link, useHistory} from 'react-router-dom';
import $ from 'jquery/dist/jquery.min';
import api from '../../service/api';
import noPhoto from '../../images/nophoto.png';
import Spinner from '../../components/spinner';

export default function Home() {

    const history = useHistory();

    const username = localStorage.getItem('username');
    const [search, setSearch] = useState('');
    const [result, setResult] = useState([]);
    const [hasResult, setHasResult] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    function openSearch() {
        $('#search').toggleClass('search-opened');
        $('#search_wrapper').toggleClass('opened');
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    function handleSearch(key) {
        if (key === 'Enter') {
            setIsLoading(true);
            api.get(`/enterprises?enterprise_types=1&name=${search}`,{
                headers: {
                    "access-token": localStorage.getItem('token'),
                    "client": localStorage.getItem('client'),
                    "uid": localStorage.getItem('uid')
                }
            }).then((res) => {
                setResult(res.data);
                setIsLoading(false);
            })
                .catch((err) => {
                    setIsLoading(false);
                    if (err.response.status === 401) {
                        handleLogout();
                    }
                });
        }
    }

    useEffect(() => {
        result.enterprises ? setHasResult(true) : setHasResult(false)
    }, [result]);

    return (
        <div className="w-100">
            <Spinner status={isLoading}/>

            <div className="w-100 bg-top-bar">
                <div className="top-bar container">
                    <div id="search" className="container d-flex flex-row justify-content-center align-items-center">
                        <Link to="/home">
                            <figure className="logo-top-bar m-0">
                                <img src={logo} alt="IOASYS"/>
                            </figure>
                        </Link>
                        <div id="search_wrapper" className="search-wrapper d-flex flex-row">
                            <button onClick={() => {openSearch()}} type="button" id="toggle-search" className="search-icon">
                                Buscar
                            </button>
                            <input onKeyUp={(e) => {handleSearch(e.key)}} onChange={(e) => {setSearch(e.target.value)}} type="search" placeholder="Pesquisar"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="user-bar shadow">
                <div className="container py-2 d-flex flex-row align-items-center justify-content-between">
                    <div className="d-flex flex-row align-items-center">
                        <figure className="m-0 mr-2">
                            <img src={noPhoto} alt={username}/>
                        </figure>
                        <span>{username}</span>
                    </div>
                    <button onClick={() => {handleLogout()}} className="btn-logout"><i>icone sair</i> Sair</button>
                </div>
            </div>
            <div className="container">
                <div className="wrapper-result w-100 pt-5">
                    {hasResult ? (
                        result.enterprises.length > 0 ? (
                            result.enterprises.map((item) => (
                                <div key={item.id} className="result-item">
                                    <Link to={`/interna/${item.id}`} className="result-item-link d-flex flex-row">
                                        <div className="big-letter d-flex justify-content-center align-items-center">
                                            {item.enterprise_name[0]}
                                        </div>
                                        <div className="enterprise-data d-flex flex-column justify-content-center">
                                            <h2 className="text-truncate">{item.enterprise_name}</h2>
                                            <p className="text-truncate">{item.enterprise_type.enterprise_type_name}</p>
                                            <span>{item.country}</span>
                                        </div>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <div className="no-result">
                                <span className="d-block text-center mute">Nenhuma empresa foi encontrada para a busca realizada.</span>
                            </div>
                        )

                    ) : (
                        <div className="no-result">
                            <span className="d-block text-center">Clique na busca para iniciar</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}