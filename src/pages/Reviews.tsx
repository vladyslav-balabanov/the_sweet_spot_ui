import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { getReviews } from '../http/reviewApi';
import { IReview } from '../interfaces/IReview';

export const Reviews = () => {
    const [reviews, setReviews] = useState<IReview[]>([]);
    const [createModal, setCreateModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const [editableData, setEditableData] = useState<IReview>();
  
    const handleShowCreateModal = () => setCreateModal(true);
    const handleCloseCreateModal = () => setCreateModal(false);
  
    const handleShowEditModal = (data: IReview) => {
      setEditableData(data);
      setEditModal(true);
    }
  
    const handleCloseEditModal = () => {
      setEditModal(false);
    }
  
    const fetchItems = async () => {
      await getReviews()
        .then((data) => {
            setReviews(data);
        })
        .catch(() => alert("Error"));
    };
  
    useEffect(() => {
      fetchItems();
    }, []);
    
    return (
      <div>
        <h1>Reviews</h1>
        
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Text</th>
              <th>Grade</th>
              <th>Product</th>
              <th>User email</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review.id}>
                <td>{review.id}</td>
                <td>{review.text}</td>
                <td>{review.grade}</td>
                <td>{review.product?.name}</td>
                <td>{review.user?.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
