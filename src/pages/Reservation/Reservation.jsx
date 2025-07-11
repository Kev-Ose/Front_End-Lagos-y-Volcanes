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
        guests: '',
        comment: '' // Added comment field
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [confirmationMessage, setConfirmationMessage] = useState('');

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
                setError('Error fetching reservations. Please try again later.');
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
            const response = await axios.post(`${SERVER_URL}/reservations`, form);
            setReservations([...reservations, response.data]);
            setForm({
                name: '',
                email: '',
                phone: '',
                date: '',
                time: '',
                guests: '',
                comment: '' // Reset comment field
            });

            // Set confirmation message
            setConfirmationMessage(
                "Your reservation has been received. We'll give you a final confirmation shortly."
            );

            // Send email to the restaurant owner
            await axios.post(`${SERVER_URL}/send-email`, {
                to: 'info@lagosyvolcanoes.com', // Replace with the restaurant owner's email
                subject: 'New Reservation',
                text: `New reservation details:\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nDate: ${form.date}\nTime: ${form.time}\nGuests: ${form.guests}\nComment: ${form.comment}`
            });
        } catch (err) {
            setError('Error making reservation. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Clear confirmation message after 5 seconds
    useEffect(() => {
        if (confirmationMessage) {
            const timer = setTimeout(() => {
                setConfirmationMessage('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [confirmationMessage]);

    return (
        <div className="background-container">
            <section className="reservation-section">
                        {/* Back to Home Button */}
                        <button
                className="back-to-home-button"
                onClick={() => (window.location.href = '/')}
            >
            Home
            </button>
                {/* Reservation Form */}
                <header className="reservation-header">
                    <h1>Restaurant Reservations</h1>
                    <p>
                        Book your table and enjoy an unforgettable dining
                        experience!
                    </p>
                </header>
                <div className="reservation-form-container">
                    {error && <p className="error-message">{error}</p>}
                    {confirmationMessage && (
                        <div className="confirmation-message">
                            {confirmationMessage}
                        </div>
                    )}
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
                            placeholder="Date"
                            value={form.date}
                            onChange={(e) =>
                                setForm({ ...form, date: e.target.value })
                            }
                        />
                        <input
                            type="time"
                            placeholder="Time"
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
                        <textarea
                            placeholder="Leave a comment (optional)"
                            value={form.comment}
                            onChange={(e) =>
                                setForm({ ...form, comment: e.target.value })
                            }
                        />
                        <button type="submit" disabled={loading}>
                            Reserve
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default App;
