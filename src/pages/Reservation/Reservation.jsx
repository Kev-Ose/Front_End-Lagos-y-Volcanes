import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../../server";


//const API_URL = "http://localhost:5050";

const App = () => {
  const [reservations, setReservations] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "", time: "", guests: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch reservations when the component loads
  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_URL}/reservations`);
        setReservations(res.data);
      } catch (err) {
        setError("Error fetching reservations. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  // Form validation
  const validateForm = () => {
    if (!form.name || !form.email || !form.phone || !form.date || !form.time || !form.guests) {
      setError("All fields are required.");
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError("Invalid email format.");
      return false;
    }
    if (!/^\d{10}$/.test(form.phone)) {
      setError("Phone number must be 10 digits.");
      return false;
    }
    const selectedDateTime = new Date(`${form.date}T${form.time}`);
    if (selectedDateTime < new Date()) {
      setError("Reservation must be for a future date and time.");
      return false;
    }
    setError("");
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/reservations`, form);
      setReservations([...reservations, response.data]);
      setForm({ name: "", email: "", phone: "", date: "", time: "", guests: "" });
    } catch (err) {
      setError("Error making reservation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Restaurant Reservations</h1>

      <h2>Make a Reservation</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="text" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
        <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
        <input type="number" placeholder="Guests" value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })} />
        <button type="submit" disabled={loading}>Reserve</button>
      </form>

      <h2>Reservations</h2>
      {loading && <p>Loading reservations...</p>}
      <ul>
        {reservations.map((res) => (
          <li key={res.id}>
            {res.name} - {res.date} {res.time} ({res.status})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

//FOURTH VERSION
/*import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../../server.js";

//const API_URL = "http://localhost:5050";

const App = () => {
  const [reservations, setReservations] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "", time: "", guests: "" });

  useEffect(() => {
    //axios.get(SERVER_URL + `api/reservations`).then((res) => setReservations(res.data));
    axios.get(`${API_URL}/reservations`).then((res) => setReservations(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //await axios.post(SERVER_URL + 'api/reservations', formData);
    try {
    //await axios.post(`${API_URL}/reservations`, form);
    const response = await axios.post("http://localhost:5050/reservations", form,
    setForm({ name: "", email: "", phone: "", date: "", time: "", guests: "" }));

  console.log("Reservation is Successful:", response.data);
    }
  catch (error) {
    console.error("Error making reservation", error);
  } 

  return (
    <div>
      <h1>Restaurant Reservations</h1>

      <h2>Make a Reservation</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input type="email" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="text" placeholder="Phone" onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <input type="date" onChange={(e) => setForm({ ...form, date: e.target.value })} />
        <input type="time" onChange={(e) => setForm({ ...form, time: e.target.value })} />
        <input type="number" placeholder="Guests" onChange={(e) => setForm({ ...form, guests: e.target.value })} />
        <button type="submit">Reserve</button>
      </form>

      <h2>Reservations</h2>
      <ul>
        {reservations.map((res) => (
          <li key={res.id}>
            {res.name} - {res.date} {res.time} ({res.status})
          </li>
        ))}
      </ul>
    </div>
  );
};
};

export default App;*/


/*

THIRD VERSION

import React, { useState } from "react";

const ReservationForm = ({ onReserve }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 1,
  });

  const [errors, setErrors] = useState({}); // To store validation errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format validation
    const phonePattern = /^[\d\s\-\+]+$/; // Allows numbers, spaces, `+` and `-`
    const today = new Date().toISOString().split("T")[0]; // Today's date (YYYY-MM-DD)

    // Email validation
    if (!emailPattern.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }

    // Phone validation
    if (!phonePattern.test(formData.phone)) {
      newErrors.phone = "Phone number can only contain numbers, spaces, +, or -.";
    }

    // Date validation
    if (formData.date < today) {
      newErrors.date = "Reservation date must be in the future.";
    }

    // Time validation (Example: Restaurant operates from 11 AM to 10 PM)
    const [hours, minutes] = formData.time.split(":").map(Number);
    if (hours < 11 || hours >= 22) {
      newErrors.time = "Reservations are allowed between 11:00 AM and 10:00 PM.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onReserve(formData); // Only proceed if the form is valid
    }
  };

  return (
    <form onSubmit={handleSubmit}/*onSubmit={handleSubmit}>
      <h2>Make a Reservation</h2>

      <div>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>

      <div>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      </div>

      <div>
        <label>Phone:</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
        {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}
      </div>

      <div>
        <label>Date:</label>
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        {errors.date && <p style={{ color: "red" }}>{errors.date}</p>}
      </div>

      <div>
        <label>Time:</label>
        <input type="time" name="time" value={formData.time} onChange={handleChange} required />
        {errors.time && <p style={{ color: "red" }}>{errors.time}</p>}
      </div>

      <div>
        <label>Guests:</label>
        <input type="number" name="guests" value={formData.guests} onChange={handleChange} min="1" max="10" required />
      </div>

      <button type="submit">Reserve</button>
    </form>
  );
};

export default ReservationForm;
*/

/*

SECOND VERSION

import React, { useState } from "react";

const Reservation = ({ onReserve }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onReserve(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Make a Reservation</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Phone:</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Time:</label>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Guests:</label>
        <input
          type="number"
          name="guests"
          value={formData.guests}
          onChange={handleChange}
          min="1"
          max="10"
          required
        />
      </div>
      <button type="submit">Reserve</button>
    </form>
  );
};

export default Reservation;
*/


/*
FIRST VERSION

import React, { useState } from "react";
import './Reservation.css';

const ReservationForm = ({ onReserve }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onReserve(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Make a Reservation</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Phone:</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Time:</label>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Guests:</label>
        <input
          type="number"
          name="guests"
          value={formData.guests}
          onChange={handleChange}
          min="1"
          max="10"
          required
        />
      </div>
      <button type="submit">Reserve</button>
    </form>
  );
};

ReservationForm.propTypes = {};

export default ReservationForm;*/