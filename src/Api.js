const handleReserve = async (data) => {
    try {
      const response = await fetch("http://localhost:5050/reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) {
        setReservation(result);
      } else {
        console.error(result.error);
      }
    } catch (error) {
      console.error("Error making reservation:", error);
    }
  };