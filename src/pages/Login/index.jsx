import React from 'react';
import logoIoasys from '../../images/logo.png';

export default function Login() {
    return(
        <section className="min-vh-100 d-flex align-items-center py-3">
            <div className="login-box col-10 col-md-6 col-lg-2 offset-1 offset-md-3 offset-lg-5">
                <figure className="logo-login mx-auto">
                    <img src={logoIoasys} alt="IOASYS"/>
                </figure>
                <div>
                    <h1 className="text-center">BEM-VINDO AO<br/>EMPRESAS</h1>
                    <p className="text-center">Lorem ipsum dolor sit amet, consectetur<br/> adipisicing elit. Eos, ex?</p>
                </div>
                <form className="login-form d-flex flex-column" autoComplete="off">
                    <input className="error" id="user_email" type="email" placeholder="E-mail"/>
                    <input className="error" id="user_pass" type="password" placeholder="Senha"/>
                    <button className="btn-default mx-auto" type="button">ENTRAR</button>
                </form>
            </div>
        </section>
    );
}