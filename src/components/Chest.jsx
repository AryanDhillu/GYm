import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import "./customStyles.css";

const Chest = () => {
  const { user } = useAuth0();  // Get the user object from Auth0
  const [formData, setFormData] = useState({
    muscle: 'chest',
    variation: '',
    note: '',
    pr1: '',
    pr2: '',
    pr3: '',
    pr4: '',
    pr1Checked: false,
    pr2Checked: false,
    pr3Checked: false,
    pr4Checked: false,
    sub: user?.sub || '',  // Add the user's sub to the formData
  });

  const [data, setData] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentDate = new Date().toISOString();
    const dataToSend = {
      ...formData,
      date: currentDate,
      sub: user?.sub || '',  // Ensure sub is included when submitting data
    };

    try {
      if (editingItemId) {
        // Update existing item
        const response = await fetch(`https://jsonserver-production-e6f1.up.railway.app/books/${editingItemId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend),
        });

        if (response.ok) {
          const jsonResponse = await response.json();
          console.log('Data successfully updated:', jsonResponse);
          setEditingItemId(null); // Clear editing mode
        } else {
          console.error('Failed to update data:', response.statusText);
        }
      } else {
        // Create new item
        const response = await fetch('https://jsonserver-production-e6f1.up.railway.app/books', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend),
        });

        if (response.ok) {
          const jsonResponse = await response.json();
          console.log('Data successfully sent:', jsonResponse);
        } else {
          console.error('Failed to send data:', response.statusText);
        }
      }
      fetchData(); // Fetch data again after submitting
      handleCloseModal(); // Close the modal after submission
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch('https://jsonserver-production-e6f1.up.railway.app/books');
      const data = await response.json();
      const chestData = data.filter(item => item.muscle === 'chest' && item.sub === user?.sub); // Filter data by sub
      setData(chestData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (user) {  // Ensure user is available before fetching data
      fetchData();
    }
  }, [user]);

  const handleTap = async (item, prKey) => {
    const updatedData = {
      ...item,
      [`${prKey}Checked`]: !item[`${prKey}Checked`],
    };

    try {
      const response = await fetch(`https://jsonserver-production-e6f1.up.railway.app/books/${item.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ [`${prKey}Checked`]: updatedData[`${prKey}Checked`] }),
      });

      if (response.ok) {
        setData((prevData) =>
          prevData.map((dataItem) =>
            dataItem.id === item.id ? updatedData : dataItem
          )
        );
      } else {
        console.error('Failed to update data:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      muscle: 'chest',
      variation: item.variation,
      note: item.note,
      pr1: item.pr1,
      pr2: item.pr2,
      pr3: item.pr3,
      pr4: item.pr4,
      pr1Checked: item.pr1Checked,
      pr2Checked: item.pr2Checked,
      pr3Checked: item.pr3Checked,
      pr4Checked: item.pr4Checked,
      sub: user?.sub || '', // Ensure sub is included when editing data
    });
    setEditingItemId(item.id);
    handleShowModal(); // Show the modal
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://jsonserver-production-e6f1.up.railway.app/books/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Data successfully deleted');
        fetchData(); // Fetch data again after deleting
      } else {
        console.error('Failed to delete data:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingItemId(null); // Clear editing mode when closing the modal
    setFormData({
      muscle: 'chest',
      variation: '',
      note: '',
      pr1: '',
      pr2: '',
      pr3: '',
      pr4: '',
      pr1Checked: false,
      pr2Checked: false,
      pr3Checked: false,
      pr4Checked: false,
      sub: user?.sub || '', // Reset form data with sub
    });
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">CHEST</h1>

      {/* Button to open the modal */}
      <Button variant="primary" onClick={handleShowModal} className="mb-4">
        Note New Variation
      </Button>

      <div className="mt-5">
        {data.length === 0 ? (
          <p className="text-center">No Data</p>
        ) : (
          data.map((item) => (
            <div key={item.id} className="card mb-3">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <small className="text-muted">{new Date(item.date).toLocaleString()}</small>
                    <h5 className="card-title">{item.variation}</h5>
                  </div>
                  <div>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="d-flex justify-content-around mt-3">
                  <span
                    className="p-3"
                    style={{
                      backgroundColor: item.pr1Checked ? 'green' : 'red',
                      color: 'white',
                      borderRadius: '5px',
                      width: '60px',
                      textAlign: 'center',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleTap(item, 'pr1')}
                  >
                    {item.pr1}
                  </span>
                  <span
                    className="p-3"
                    style={{
                      backgroundColor: item.pr2Checked ? 'green' : 'red',
                      color: 'white',
                      borderRadius: '5px',
                      width: '60px',
                      textAlign: 'center',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleTap(item, 'pr2')}
                  >
                    {item.pr2}
                  </span>
                  <span
                    className="p-3"
                    style={{
                      backgroundColor: item.pr3Checked ? 'green' : 'red',
                      color: 'white',
                      borderRadius: '5px',
                      width: '60px',
                      textAlign: 'center',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleTap(item, 'pr3')}
                  >
                    {item.pr3}
                  </span>
                  <span
                    className="p-3"
                    style={{
                      backgroundColor: item.pr4Checked ? 'green' : 'red',
                      color: 'white',
                      borderRadius: '5px',
                      width: '60px',
                      textAlign: 'center',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleTap(item, 'pr4')}
                  >
                    {item.pr4}
                  </span>
                </div>
                <div className="text-center mt-3">
                  <p className="mb-0" style={{ fontSize: '1rem', color: 'gray' }}>
                    {item.note}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal for Form */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
    <Modal.Header closeButton>
      <Modal.Title>{editingItemId ? 'Edit Item' : 'Add New Item'}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <form onSubmit={handleSubmit} className="item-form">
        <div className="form-group">
          <label htmlFor="variation">Variation:</label>
          <input
            type="text"
            className="form-control"
            id="variation"
            name="variation"
            value={formData.variation}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="note">Note:</label>
          <input
            type="text"
            className="form-control"
            id="note"
            name="note"
            value={formData.note}
            onChange={handleChange}
          />
        </div>
        <div className="form-group pr-group">
          {['pr1', 'pr2', 'pr3', 'pr4'].map((field, idx) => (
            <div key={idx} className="pr-input-wrapper">
              <label htmlFor={field}>{field.toUpperCase()}:</label>
              <input
                type="number"
                className="form-control pr-input"
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>
        <Button type="submit" className="btn btn-primary">
          {editingItemId ? 'Update' : 'Submit'}
        </Button>
      </form>
    </Modal.Body>
  </Modal>
    </div>
  );
};

export default Chest;
