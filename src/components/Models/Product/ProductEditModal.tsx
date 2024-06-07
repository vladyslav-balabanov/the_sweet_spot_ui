import React, { useState, useEffect, useMemo } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { productCatefories } from '../../../consts';
import { editProduct } from '../../../http/productApi';
import { IProduct } from '../../../interfaces/IProduct';
import { ISelect } from '../../../interfaces/ISelect';
import { IProductEditViewModel } from '../../../interfaces/ViewModels/EditViewModels/IProductEditViewModel';


interface IProps {
    show: boolean,
    onHide: () => void,
    fetch: () => void,
    item?: IProduct,
}

export const ProductEditModal = ({ show, onHide, item, fetch }: IProps) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<IProductEditViewModel>({
        defaultValues: {
          name: '',
          description: '',
          cost: 0,
          image: undefined,
          category: 0,
        },
      });
    
      useEffect(() => {
        if (item) {
          const { image, ...rest } = item;
          reset({
            ...rest,
            image: typeof image === 'string' ? undefined : image,
          });
        }
      }, [item, reset]);
          
      const onSubmit = async (data: IProductEditViewModel) => {
        let formData = new FormData();
        formData.append("id", data.id.toString());
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("category", data.category.toString());
        formData.append("cost", data.cost.toString());
        formData.append("image", data.image)

        await editProduct(data.id, formData)
          .then(() => {
            onHide();
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
        <Modal show={show} onHide={onHide}>
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
                                        <option key={`category_${value}`} value={value}>
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
                    <Button variant="secondary" onClick={onHide}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit">
                        Save
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}
