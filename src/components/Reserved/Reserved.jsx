import React, { useState } from "react";
import ReservationForm from "./ReservationForm";

const Reserved = () => {
  const [reservation, setReservation] = useState(null);

  const handleReserve = (data) => {
    // Simulate sending data to the server
    console.log("Reservation Data:", data);
    setReservation(data);
  };

  return (
    <div>
      <h1>Restaurant Reservation System</h1>
      {!reservation ? (
        <ReservationForm onReserve={handleReserve} />
      ) : (
        <div>
          <h2>Reservation Confirmed!</h2>
          <p>Name: {reservation.name}</p>
          <p>Email: {reservation.email}</p>
          <p>Phone: {reservation.phone}</p>
          <p>Date: {reservation.date}</p>
          <p>Time: {reservation.time}</p>
          <p>Guests: {reservation.guests}</p>
        </div>
      )}
    </div>
  );
};

export default Reserved;
