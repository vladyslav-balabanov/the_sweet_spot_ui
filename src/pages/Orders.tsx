import React, { useEffect, useState } from 'react'
import { OrderEditModal } from '../components/Models/Order/IOrderEditModal';
import { ordersStatuses } from '../consts';
import { getOrders } from '../http/orderApi';
import { IOrder } from '../interfaces/IOrder';

export const Orders = () => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [createModal, setCreateModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const [editableData, setEditableData] = useState<IOrder>();

    const handleShowCreateModal = () => setCreateModal(true);
    const handleCloseCreateModal = () => setCreateModal(false);

    const handleShowEditModal = (data: IOrder) => {
        setEditableData(data);
        setEditModal(true);
    }

    const handleCloseEditModal = () => {
        setEditModal(false);
    }

    const fetchItems = async () => {
        await getOrders()
            .then((data) => {
                setOrders(data);
            })
            .catch(() => alert("Error"));
    };

    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <div>
            <OrderEditModal
                item={editableData}
                fetch={fetchItems}
                show={editModal}
                onHide={handleCloseEditModal}
            ></OrderEditModal>
            <h1>Orders</h1>

            <table className="table">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Creation date</th>
                    <th>Updation date</th>
                    <th>Area / Street / House number</th>
                    <th>Status</th>
                    <th>Total cost</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order) => (
                    <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.createdDate}</td>
                        <td>{order.updatedDate}</td>
                        <td>{order.area} / {order.street} / {order.houseNumber}</td>
                        <td>{ordersStatuses[order.status]}</td>
                        <td>{order?.cart?.cartProducts ? order.cart.cartProducts.reduce((acc, item) => acc + (item.product.cost * item.quantity), 0) : 0}</td>
                        <td className="d-flex gap-3">
                            <button className="btn btn-warning" onClick={() => handleShowEditModal(order)}>Edit status</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}