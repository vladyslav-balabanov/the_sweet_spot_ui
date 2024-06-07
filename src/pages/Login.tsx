import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Context } from '..';
import { MAIN_ROUTE } from '../consts';
import cl from '../styles/Login.module.css';
import { login } from '../http/authApi';
import { ILoginViewModel } from '../interfaces/ViewModels/ILoginViewModel';
import mapJwtClaims from '../utils/mapJwtClaims';

export const Login = () => {
    const {
        control,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<ILoginViewModel>();
    const contextValue = useContext(Context);
    const navigate = useNavigate();
    const user = contextValue!.user;

    const onSubmit = async (data: ILoginViewModel) => {
        await login(data).then((data) => {
            user.setIsAuth(true);
            user.setUser(mapJwtClaims(data));
            navigate(MAIN_ROUTE);
          }).catch(() => console.log("error"));
    };

    return (
        <div className={cl.login}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label className="control-label">Email</label>
                        <Controller
                            control={control}
                            name={"email"}
                            rules={{
                                required: "Enter email",
                            }}
                            render={({ field }) => (
                                <input className="form-control" {...field} />
                            )}
                        ></Controller>
                        <p style={{ color: "red" }}>{errors.email?.message}</p>
                    </div>
                    <div className="form-group">
                        <label className="control-label">Password</label>
                        <Controller
                            control={control}
                            name={"password"}
                            rules={{
                                required: "Enter password",
                            }}
                            render={({ field }) => (
                                <input className="form-control" {...field} />
                            )}
                        ></Controller>
                        <p style={{ color: "red" }}>{errors.password?.message}</p>
                    </div>
                   
                </Modal.Body>
                <Modal.Footer>                   
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Modal.Footer>
            </form>
        </div> 
    );
};