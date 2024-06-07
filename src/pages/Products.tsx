import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { ProductCreateModal } from '../components/Models/Product/ProductCreateModal';
import { ProductEditModal } from '../components/Models/Product/ProductEditModal';
import { productCatefories } from '../consts';
import { deleteProduct, getProducts } from '../http/productApi';
import { IProduct } from '../interfaces/IProduct';

export const Products = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [createModal, setCreateModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const [editableData, setEditableData] = useState<IProduct>();
  
    const handleShowCreateModal = () => setCreateModal(true);
    const handleCloseCreateModal = () => setCreateModal(false);
  
    const handleShowEditModal = (data: IProduct) => {
      setEditableData(data);
      setEditModal(true);
    }
  
    const handleCloseEditModal = () => {
      setEditModal(false);
    }
  
    const fetchItems = async () => {
      await getProducts()
        .then((data) => {
            setProducts(data);
        })
        .catch(() => alert("Error"));
    };
  
    useEffect(() => {
      fetchItems();
    }, []);
  
    const remove = async (id: number) => {
      await deleteProduct(id).then(() => {
        fetchItems();
      })
    }
  
    return (
      <div>
       <ProductCreateModal
          fetch={fetchItems}
          onHide={handleCloseCreateModal}
          show={createModal}
        ></ProductCreateModal>
  
        <ProductEditModal
          item={editableData}
          fetch={fetchItems}
          show={editModal}
          onHide={handleCloseEditModal}
        ></ProductEditModal>
        <h1>Products</h1>
  
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
              <th>Description</th>
              <th>Cost</th>
              <th>Category</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.cost}</td>
                <td>{productCatefories[product.category]}</td>
                <td className="d-flex gap-3">
                  <button className="btn btn-warning" onClick={() => handleShowEditModal(product)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => remove(product.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
