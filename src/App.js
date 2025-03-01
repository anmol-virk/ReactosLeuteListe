import "./styles.css";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import useFetch from "./useFetch";

export default function App() {
  const { data, loading, error, fetchData } = useFetch(
    "https://randomuser.me/api/?results=3"
  );
  const [showMore, setShowMore] = useState(false);
  const showMoreHandler = () => {
    setShowMore((more) => !more);
  };
  console.log(data);
  return (
    <div className="App">
      <h1>People Directory</h1>
      <button onClick={fetchData} className="btn btn-primary">
        Get People
      </button>

      <div className="container py-4">
        {loading && <p>Loading...</p>}
        {error && <p>An error occurred while fetching data.</p>}
        {data && data.results && data.results.length > 0 && (
          <div className="row">
            {data.results.map((person) => (
              <div className="col-md-4">
                <div className="card">
                  <img
                    src={person.picture.large}
                    className="card-img-top"
                    alt=""
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {" "}
                      {person.name.first} {person.name.last}
                    </h5>
                    <p className="card-text">Age: {person.dob.age}</p>
                    <p className="card-text">Gender: {person.gender}</p>
                    <p className="card-text">
                      Username: {person.login.username}
                    </p>
                    <p className="card-text"> Email: {person.email}</p>

                    {showMore && (
                      <div className="additional-info">
                        <p className="card-text">Phone: {person.phone}</p>

                        <p className="card-text">
                          Full-Address: {person.location.street.number},
                          {person.location.street.name},
                          {person.location.country}, {person.location.postcode}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {data && data.results && data.results.length > 0 && (
              <div className="container">
                <button
                  onClick={showMoreHandler}
                  className="btn btn-primary mt-3"
                >
                  {showMore ? "Show Less Info" : "Show More Info"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
