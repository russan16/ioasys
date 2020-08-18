import React, {useEffect, useState} from 'react';
import logoIoasys from '../../images/logo.png';
import api from '../../service/api';
import Spinner from '../../components/spinner';
import {useHistory} from 'react-router-dom';
import $ from 'jquery';

export default function Login() {

    const history = useHistory();

    const [userEmail, setUserEmail] = useState('');
    const [userPass, setUserPass] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    function showAlert() {
        $('.alert-form').fadeIn(300);
        setTimeout(() => {
            $('.alert-form').fadeOut(300);
        }, 2500);
    }

    // LOGIN
    function Login() {
        setIsLoading(true);
        api.post('/users/auth/sign_in', {
            "email": userEmail,
            "password": userPass
        })
            .then((res) => {
                setIsLoading(false);
                console.log('response',res.headers);
                localStorage.setItem('token',res.headers['access-token']);
                localStorage.setItem('client',res.headers['client']);
                localStorage.setItem('uid',res.headers['uid']);
                localStorage.setItem('username',res.data.investor.investor_name);
                history.push('/home');
            })
            .catch((err) => {
                setIsLoading(false);
                if (err.response.status === 401) {
                    showAlert();
                }
            });
    }

    useEffect(() => {
        if (userEmail.length > 0 && userPass.length > 0) {
            $('.btn-default').attr('disabled', false);
        } else {
            $('.btn-default').attr('disabled', true);
        }
    }, [userEmail,userPass]);

    return(
        <section className="min-vh-100 d-flex align-items-center justify-content-center py-3">
            <Spinner status={isLoading}/>
            <div className="login-box">
                <figure className="logo-login mx-auto">
                    <img src={logoIoasys} alt="IOASYS"/>
                </figure>
                <div>
                    <h1 className="text-center">BEM-VINDO AO<br/>EMPRESAS</h1>
                    <p className="text-center">Lorem ipsum dolor sit amet, consectetur<br/> adipisicing elit. Eos, ex?</p>
                </div>
                <form className="login-form d-flex align-items-center justify-content-center flex-column" autoComplete="off">
                    <input onChange={(e) => {setUserEmail(e.target.value)}}  id="user_email" type="email" placeholder="E-mail"/>
                    <input onChange={(e) => {setUserPass(e.target.value)}} id="user_pass" type="password" placeholder="Senha"/>
                    <span className="alert-form" style={{display: 'none'}}>Credenciais informadas são inválidas.</span>
                    <button onClick={() => {Login()}} className="btn-default" type="button">ENTRAR</button>

                </form>
            </div>
        </section>
    );
}