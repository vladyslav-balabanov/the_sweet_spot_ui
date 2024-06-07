import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { ManagerCreateModal } from '../components/Models/Manager/ManagerCreateModal';
import { deleteManager, getManagers } from '../http/managerApi';
import { IManager } from '../interfaces/IManager';

export const Managers = () => {
    const [managers, setManagers] = useState<IManager[]>([]);
    const [createModal, setCreateModal] = useState<boolean>(false);
  
    const handleShowCreateModal = () => setCreateModal(true);
    const handleCloseCreateModal = () => setCreateModal(false);
  
    const fetchItems = async () => {
      await getManagers()
        .then((data) => {
            setManagers(data);
        })
        .catch(() => alert("Error"));
    };
  
    useEffect(() => {
      fetchItems();
    }, []);
  
    const remove = async (id: number) => {
      await deleteManager(id).then(() => {
        fetchItems();
      })
    }
  
    return (
      <div>
       <ManagerCreateModal
          fetch={fetchItems}
          onHide={handleCloseCreateModal}
          show={createModal}
        ></ManagerCreateModal>
        <h1>Managers</h1>
  
        <p>
          <Button variant="primary" onClick={handleShowCreateModal}>
            Create New
          </Button>
        </p>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {managers.map((manager) => (
              <tr key={manager.id}>
                <td>{manager.id}</td>
                <td>{manager.name}</td>
                <td>{manager.email}</td>
                <td>{manager.role}</td>
                <td className="d-flex gap-3">
                  <button className="btn btn-danger" onClick={() => remove(manager.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
