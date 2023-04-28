import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSubs } from "../../functions/sub";

const SubsList = () => {
  const [loading, setLoading] = useState(false);
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    loadSubs();
  }, []);

  const loadSubs = () => {
    setLoading(true);
    getSubs().then((sub) => {
      setLoading(false);
      setSubs(sub.data);
    });
  };

  const showSubs = () =>
    subs.map((sub) => (
      <Link
        to={`/sub/${sub.slug}`}
        style={{ textDecoration: "none" }}
        key={sub._id}
        className="col btn btn-outline-info waves-effect btn-block btn-raised m-2"
      >
        {sub.name}
      </Link>
    ));

  return (
    <div className="container">
      <div className="row">
        {loading ? <h4 className="text-center">Loading...</h4> : showSubs()}
      </div>
    </div>
  );
};

export default SubsList;
