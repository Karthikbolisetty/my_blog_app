// import React, { useEffect, useState } from "react";

// function App() {
//   const [formData, setFormData] = useState({ name: "", email: "" });
//   const [message, setMessage] = useState("");
//   const [users, setUsers] = useState([]);
//   const [editingId, setEditingId] = useState(null);

//   // ✅ Fetch users
//   const fetchUsers = async () => {
//     try {
//       const response = await fetch("http://localhost:3001/api/users");
//       const data = await response.json();
//       setUsers(data);
//     } catch (err) {
//       console.log("❌ Error fetching users:", err);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // ✅ Handle input change
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // ✅ Handle form submit (Add / Update)
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const url = editingId
//       ? `http://localhost:3001/api/users/${editingId}`
//       : "http://localhost:3001/api/submit-form";

//     const method = editingId ? "PUT" : "POST";

//     try {
//       const response = await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const result = await response.json();
//       setMessage(result.message);

//       // Reset form and reload users
//       setFormData({ name: "", email: "" });
//       setEditingId(null);
//       fetchUsers();
//     } catch (error) {
//       console.error("❌ Error submitting form:", error);
//       setMessage("Something went wrong!");
//     }
//   };

//   // ✅ Handle edit button click
//   const handleUpdate = (user) => {
//     setEditingId(user._id);
//     setFormData({ name: user.name, email: user.email });
//   };

//   // ✅ Handle delete
//   const handleDelete = async (userId) => {
//     try {
//       const response = await fetch(`http://localhost:3001/api/users/${userId}`, {
//         method: "DELETE",
//       });

//       const result = await response.json();
//       setMessage(result.message);
//       fetchUsers();
//     } catch (err) {
//       console.log("❌ Error deleting user:", err);
//     }
//   };

//   return (
//     <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
//       <h1>Submit Your Details</h1>

//       <form onSubmit={handleSubmit}>
//         <label>
//           Name:{" "}
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <br />
//         <label>
//           Email:{" "}
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <br />
//         <button type="submit">
//           {editingId ? "Update User" : "Submit"}
//         </button>
//       </form>

//       <p>{message}</p>

//       <h2>User List</h2>
//       <ul>
//         {users.map((user) => (
//           <li key={user._id}>
//             {user.name} ({user.email}){" "}
//             <button onClick={() => handleUpdate(user)}>Edit</button>{" "}
//             <button onClick={() => handleDelete(user._id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;

// import React, { useEffect, useState } from "react";

// function TrainBooking() {
//   const [formData, setFormData] = useState({
//     name: "",
//     destination: "",
//     pickupPoint: "",
//     time: "",
//   });
//   const [bookings, setBookings] = useState([]);
//   const [message, setMessage] = useState("");
//   const [editingId, setEditingId] = useState(null);

//   // ✅ Fetch bookings
//   const fetchBookings = async () => {
//     try {
//       const res = await fetch("http://localhost:3001/api/trains");
//       const data = await res.json();
//       setBookings(data);
//     } catch (err) {
//       console.error("❌ Error fetching bookings:", err);
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   // ✅ Handle input change
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // ✅ Handle form submit (Create / Update)
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const url = editingId
//       ? `http://localhost:3001/api/trains/${editingId}`
//       : "http://localhost:3001/api/train-booking";

//     const method = editingId ? "PUT" : "POST";

//     try {
//       const res = await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const result = await res.json();
//       setMessage(result.message);

//       // Reset form
//       setFormData({
//         name: "",
//         destination: "",
//         pickupPoint: "",
//         time: "",
//       });
//       setEditingId(null);
//       fetchBookings();
//     } catch (error) {
//       console.error("❌ Error submitting form:", error);
//       setMessage("Something went wrong!");
//     }
//   };

//   // ✅ Edit booking
//   const handleEdit = (booking) => {
//     setEditingId(booking._id);
//     setFormData({
//       name: booking.name,
//       destination: booking.destination,
//       pickupPoint: booking.pickupPoint,
//       time: booking.time,
//     });
//   };

//   // ✅ Delete booking
//   const handleDelete = async (id) => {
//     try {
//       const res = await fetch(`http://localhost:3001/api/trains/${id}`, {
//         method: "DELETE",
//       });
//       const result = await res.json();
//       setMessage(result.message);
//       fetchBookings();
//     } catch (error) {
//       console.error("❌ Error deleting booking:", error);
//     }
//   };

//   return (
//     <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
//       <h1>🚆 Train Booking Form</h1>

//       <form onSubmit={handleSubmit}>
//         <label>
//           Name:{" "}
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <br />
//         <label>
//           Destination:{" "}
//           <input
//             type="text"
//             name="destination"
//             value={formData.destination}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <br />
//         <label>
//           Pickup Point:{" "}
//           <input
//             type="text"
//             name="pickupPoint"
//             value={formData.pickupPoint}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <br />
//         <label>
//           Time:{" "}
//           <input
//             type="text"
//             name="time"
//             value={formData.time}
//             onChange={handleChange}
//             placeholder="e.g., 6:30 PM or Morning"
//             required
//           />
//         </label>
//         <br />
//         <button type="submit">
//           {editingId ? "Update Booking" : "Book Train"}
//         </button>
//       </form>

//       <p>{message}</p>

//       <h2>All Train Bookings</h2>
//       <ul>
//         {bookings.map((b) => (
//           <li key={b._id}>
//             <strong>{b.name}</strong> → {b.destination}  
//             (Pickup: {b.pickupPoint}, Time: {b.time}){" "}
//             <button onClick={() => handleEdit(b)}>Edit</button>{" "}
//             <button onClick={() => handleDelete(b._id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default TrainBooking;

import { BrowserRouter,Route,Routes,Link } from "react-router-dom";
import './App.css';
import Auth from "./Auth.jsx";
import Blogmodule from "./Blogmodule.jsx";

export default function App(){
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Blogmodule/>} />
      <Route path="/Auth" element={<Auth/>} />
      </Routes></BrowserRouter>
  )
}