import React, { useEffect, useMemo } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { ordersStatuses } from '../../../consts';
import { editOrder } from '../../../http/orderApi';
import { IOrder } from '../../../interfaces/IOrder';
import { ISelect } from '../../../interfaces/ISelect';
import { IOrderEditViewModel } from '../../../interfaces/ViewModels/EditViewModels/IOrderEditViewModel';


interface IProps {
    show: boolean,
    onHide: () => void,
    fetch: () => void,
    item?: IOrder,
}

export const OrderEditModal = ({ show, onHide, item, fetch }: IProps) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<IOrderEditViewModel>();

    useEffect(() => {
        if (item) {
            reset({
                ...item
            });
        }
    }, [item, reset]);

    const onSubmit = async (data: IOrderEditViewModel) => {
        if (item) {
            data.orderId = item.id;
            await editOrder(data)
                .then(() => {
                    onHide();
                    fetch();
                })
                .catch(() => alert("Error"));
        }
    };

    const selectStatuses = useMemo<ISelect[]>(() => {
        return [
            { value: "0", label: "Select status..." },
            ...ordersStatuses.map((status, index) => {
                return {
                    value: index.toString(),
                    label: status,
                };
            }),
        ];
    }, []);

    return (
        <Modal show={show} onHide={onHide}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit order status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label className="control-label">Status</label>
                        <Controller
                            control={control}
                            name={"status"}
                            rules={{
                                required: "Select status",
                                validate: (data) => (data != 0 ? undefined : "Select status"),
                            }}
                            render={({ field }) => (
                                <select className="form-control" {...field}>
                                    {selectStatuses.map(({ value, label }) => (
                                        <option key={value} value={value}>
                                            {label}
                                        </option>
                                    ))}
                                </select>
                            )}
                        ></Controller>
                        <p style={{ color: "red" }}>{errors.status?.message}</p>
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