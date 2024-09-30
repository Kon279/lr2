import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'
import data from './data'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tours-project'
function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const fetchTours = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const tours = await response.json();
      setTours(tours);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const removeTour = (id) => {
    const restTour = tours.filter((el) => el.id !== id);
    setTours(restTour);
  };
  useEffect(() => {
    fetchTours();
    setTours(data);
  }, []);

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }
  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>no tours left</h2>
          <button className="btn" onClick={fetchTours}>
            Refresh
          </button>
        </div>
      </main>
    );
  }

  return (
    <main>
      <Tours removeTour={removeTour} tours={tours} />
    </main>
  );
}

export default App;
