import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SERVER_URL from '../../server.js';
import './Reservation.css';

const App = () => {
    const [reservations, setReservations] = useState([]);
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Fetch reservations when the component loads
    useEffect(() => {
        const fetchReservations = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${SERVER_URL}/reservations`);
                console.log('Backend response:', res.data); // Log the response
                if (Array.isArray(res.data)) {
                    setReservations(res.data);
                } else {
                    setError('Unexpected response format from the server.');
                    setReservations([]); // Reset to an empty array
                }
            } catch (err) {
                setError(
                    'Error fetching reservations. Please try again later.'
                );
            } finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, []);

    // Form validation
    const validateForm = () => {
        if (
            !form.name ||
            !form.email ||
            !form.phone ||
            !form.date ||
            !form.time ||
            !form.guests
        ) {
            setError('All fields are required.');
            return false;
        }
        if (!/^\S+@\S+\.\S+$/.test(form.email)) {
            setError('Invalid email format.');
            return false;
        }
        if (!/^\d{10}$/.test(form.phone)) {
            setError('Phone number must be 10 digits.');
            return false;
        }
        const selectedDateTime = new Date(`${form.date}T${form.time}`);
        if (selectedDateTime < new Date()) {
            setError('Reservation must be for a future date and time.');
            return false;
        }
        setError('');
        return true;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            setLoading(true);
            const response = await axios.post(
                `${SERVER_URL}/reservations`,
                form
            );
            setReservations([...reservations, response.data]);
            setForm({
                name: '',
                email: '',
                phone: '',
                date: '',
                time: '',
                guests: ''
            });
        } catch (err) {
            setError('Error making reservation. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="background-container">
            {/* Back to Home Button */}
            <button
                className="back-to-home-button"
                onClick={() => (window.location.href = '/')}
            >
                ← Back to Home
            </button>
            <section className="reservation-section">
                {/* Reservation Form */}
                <header className="reservation-header">
                    <h1>Restaurant Reservations</h1>
                    <p>
                        Book your table and enjoy an unforgettable dining
                        experience!
                    </p>
                </header>
                <div className="reservation-form-container">
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Name"
                            value={form.name}
                            onChange={(e) =>
                                setForm({ ...form, name: e.target.value })
                            }
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={(e) =>
                                setForm({ ...form, email: e.target.value })
                            }
                        />
                        <input
                            type="text"
                            placeholder="Phone"
                            value={form.phone}
                            onChange={(e) =>
                                setForm({ ...form, phone: e.target.value })
                            }
                        />
                        <input
                            type="date"
                            value={form.date}
                            onChange={(e) =>
                                setForm({ ...form, date: e.target.value })
                            }
                        />
                        <input
                            type="time"
                            value={form.time}
                            onChange={(e) =>
                                setForm({ ...form, time: e.target.value })
                            }
                        />
                        <input
                            type="number"
                            placeholder="Guests"
                            value={form.guests}
                            onChange={(e) =>
                                setForm({ ...form, guests: e.target.value })
                            }
                        />
                        <button type="submit" disabled={loading}>
                            Reserve
                        </button>
                    </form>

                    {/*<h2>Reservations</h2>
                    {loading && <p>Loading reservations...</p>}
                    <ul>
                        {reservations.map((res) => (
                            <li key={res.id}>
                                {res.name} - {res.date} {res.time} ({res.status}
                                )
                            </li>
                        ))}
                    </ul>*/}
                </div>
            </section>
        </div>
    );
};

export default App;
