import React, { useEffect, useMemo, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { productCatefories } from '../../../consts';
import { createManagers } from '../../../http/managerApi';
import { createProduct } from '../../../http/productApi';
import { ISelect } from '../../../interfaces/ISelect';
import { ICreateManagerViewModel } from '../../../interfaces/ViewModels/CreateViewModels/ICreateManagerViewModel';
import { IProductCreateViewModel } from '../../../interfaces/ViewModels/CreateViewModels/IProductCreateViewModel';

interface IProps {
    show: boolean,
    onHide: () => void,
    fetch: () => void,
}

export const ManagerCreateModal = ({show, onHide, fetch}: IProps) => {
    const {
        control,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<ICreateManagerViewModel>();

    const handleClose = () => {
        reset({});
        onHide();
    };

    const onSubmit = async (data: ICreateManagerViewModel) => {
        await createManagers(data)
            .then(() => {
                handleClose();
                fetch();
            })
            .catch(() => alert("Error"));
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Manager</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label className="control-label">Name</label>
                        <Controller
                            control={control}
                            name={"name"}
                            rules={{
                                required: "Enter name",
                            }}
                            render={({ field }) => (
                                <input className="form-control" {...field} />
                            )}
                        ></Controller>
                        <p style={{ color: "red" }}>{errors.name?.message}</p>
                    </div>
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
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit">
                        Save
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
};