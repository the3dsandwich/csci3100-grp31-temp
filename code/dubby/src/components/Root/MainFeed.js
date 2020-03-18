import React, { useState, useEffect, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { firestore } from "firebase";
import { UserContext } from "../../contexts/UserContext";
import EventCard from "../Event/EventCard";
import Navbar from "../Navbar/Navbar";
import { Layout } from "react-mdl";

const MainFeed = () => {
  const { userData, userLoading } = useContext(UserContext);

  const [eventList, setEventList] = useState();

  useEffect(() => {
    const eventRef = firestore()
      .collection("event")
      .orderBy("startingTime")
      .limitToLast(20);
    const unsubscribeEventList = eventRef.onSnapshot(snap => {
      let tmp = [];
      snap.forEach(doc => tmp.push(doc.id));
      setEventList(tmp);
    });
    return () => {
      unsubscribeEventList();
    };
  }, []);

  if (userLoading || !eventList) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  } else if (!userData) {
    return <Redirect to="/launch" />;
  } else {
    return (
      <div>
        <Navbar />
        <div className="main-container">
          <Layout>
            <header>
              <h1>My Feed</h1>
            </header>
            {eventList && eventList.length > 0 && (
              <ul>
                {eventList.map(eid => (
                  <EventCard key={eid} eid={eid} />
                ))}
              </ul>
            )}
            <Link to="/e">link to event page</Link>
          </Layout>
        </div>
      </div>
    );
  }
};

export default MainFeed;