import React, { useEffect, useMemo, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { productCatefories } from '../../../consts';
import { createProduct } from '../../../http/productApi';
import { ISelect } from '../../../interfaces/ISelect';
import { IProductCreateViewModel } from '../../../interfaces/ViewModels/CreateViewModels/IProductCreateViewModel';

interface IProps {
    show: boolean,
    onHide: () => void,
    fetch: () => void,
}

export const ProductCreateModal = ({show, onHide, fetch}: IProps) => {
    const {
        control,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<IProductCreateViewModel>();

    const handleClose = () => {
        reset({});
        onHide();
    };

    const onSubmit = async (data: IProductCreateViewModel) => {
        let formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("category", data.category.toString());
        formData.append("cost", data.cost.toString());
        formData.append("image", data.image)

        await createProduct(formData)
            .then(() => {
                handleClose();
                fetch();
            })
            .catch(() => alert("Error"));
    };

    const selectCategories = useMemo<ISelect[]>(() => {
        return [
            { value: "0", label: "Select category..." },
            ...productCatefories.map((category, index) => {
                return {
                    value: index.toString(),
                    label: category,
                };
            }),
        ];
    }, []);

    return (
        <Modal show={show} onHide={handleClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Product</Modal.Title>
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
                        <label className="control-label">Description</label>
                        <Controller
                            control={control}
                            name={"description"}
                            rules={{
                                required: "Enter description",
                            }}
                            render={({ field }) => (
                                <input className="form-control" {...field} />
                            )}
                        ></Controller>
                        <p style={{ color: "red" }}>{errors.description?.message}</p>
                    </div>
                    <div className="form-group">
                        <label className="control-label">Cost</label>
                        <Controller
                            control={control}
                            name={"cost"}
                            rules={{
                                required: "Enter cost",
                                min: {
                                    value: 1,
                                    message: "Minimum credits is 1"
                                }
                            }}
                            render={({ field }) => (
                                <input type="number" className="form-control" {...field} />
                            )}
                        ></Controller>
                        <p style={{ color: "red" }}>{errors.cost?.message}</p>
                    </div>
                    <div className="form-group">
        <label className="control-label">Image</label>
        <Controller
            control={control}
            name="image"
            rules={{
                required: "Enter image",
            }}
            render={({ field: { onChange, onBlur, ref, name } }) => (
                <input
                    type="file"
                    className="form-control"
                    onChange={e => {
                        const file = e.target.files ? e.target.files[0] : null;
                        onChange(file);
                    }}
                    onBlur={onBlur}
                    name={name}
                    ref={ref}
                />
            )}
        />
        <p style={{ color: "red" }}>{errors.image?.message}</p>
    </div>
    <div className="form-group">
                        <label className="control-label">Category</label>
                        <Controller
                            control={control}
                            name={"category"}
                            rules={{
                                required: "Select category",
                                validate: (data) => (data != 0 ? undefined : "Select category"),
                            }}
                            render={({ field }) => (
                                <select className="form-control" {...field}>
                                    {selectCategories.map(({ value, label }) => (
                                        <option key={value} value={value}>
                                            {label}
                                        </option>
                                    ))}
                                </select>
                            )}
                        ></Controller>
                        <p style={{ color: "red" }}>{errors.category?.message}</p>
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