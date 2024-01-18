import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [employeeData, setEmployeeData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    department: "Tech",
    salary: "",
    Date: "",
  });

  const [employees, setEmployees] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(5);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Check if the form is in edit mode
    if (employeeData.id) {
      // Update employee details in JSON server
      try {
        const response = await fetch(
          `http://localhost:8000/employees/${employeeData.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(employeeData),
          }
        );

        if (response.ok) {
          // Fetch and update the list of employees after submission
          fetchEmployees();

          // Close the edit modal
          setShowEditModal(false);

          // Optionally, you can handle other actions, such as showing a success message
          console.log("Employee updated successfully!");
        } else {
          // Handle errors
          console.error("Error updating employee");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      // Add new employee details to JSON server
      try {
        const response = await fetch("http://localhost:8000/employees", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...employeeData,
            id: generateUniqueId(), // Assuming you have a function to generate unique IDs
          }),
        });

        if (response.ok) {
          // Fetch and update the list of employees after submission
          fetchEmployees();

          // Clear the form after successful submission
          setEmployeeData({
            id: "",
            firstName: "",
            lastName: "",
            email: "",
            department: "Tech",
            salary: "",
            Date: "",
          });

          // Optionally, you can handle other actions, such as showing a success message
          console.log("Employee added successfully!");
        } else {
          // Handle errors
          console.error("Error adding employee");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleEditClick = (employee) => {
    // Open the edit modal and set the initial values
    setEmployeeData(employee);
    setShowEditModal(true);
  };

  const handleDeleteClick = async (employeeId) => {
    // Delete employee from JSON server
    try {
      const response = await fetch(
        `http://localhost:8000/employees/${employeeId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Fetch and update the list of employees after deletion
        fetchEmployees();

        // Optionally, you can handle other actions, such as showing a success message
        console.log("Employee deleted successfully!");
      } else {
        // Handle errors
        console.error("Error deleting employee");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchEmployees = async () => {
    // Fetch the list of employees from the server
    try {
      const response = await fetch("http://localhost:8000/employees");
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    // Fetch employees when the component mounts
    fetchEmployees();
  }, []);

  const generateUniqueId = () => {
    // Implement your logic to generate a unique ID (e.g., using a library like uuid)
    // For simplicity, using a timestamp for illustration purposes
    return Date.now().toString();
  };

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  // Logic for rendering page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(employees.length / employeesPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = pageNumbers.map((number) => (
    <button key={number} onClick={() => handlePageChange(number)}>
      {number}
    </button>
  ));

  return (
    <div>
      <h1>Employee Management Software</h1>
      <div>
        <button onClick={() => setShowEditModal(true)}>Add Employee</button>
        <button>Log Out</button>
      </div>

      {/* Add/Edit Employee Form Modal */}
      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowEditModal(false)}>
              &times;
            </span>
            <form onSubmit={handleFormSubmit}>
              <label>
                First Name:
                <input
                  type="text"
                  name="firstName"
                  value={employeeData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Last Name:
                <input
                  type="text"
                  name="lastName"
                  value={employeeData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={employeeData.email}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Department:
                <select
                  name="department"
                  value={employeeData.department}
                  onChange={handleInputChange}
                >
                  <option value="Tech">Tech</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Operations">Operations</option>
                </select>
              </label>
              <label>
                Salary:
                <input
                  type="number"
                  name="salary"
                  value={employeeData.salary}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}

      {/* Employee Table */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>{employee.department}</td>
              <td>{employee.salary}</td>
              <td>{employee.Date}</td>
              <td>
                <button onClick={() => handleEditClick(employee)}>Edit</button>
                <button onClick={() => handleDeleteClick(employee.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        {renderPageNumbers}
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === pageNumbers.length}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
