import Jumbotron from "../components/cards/Jumbotron";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import CategoryList from "../components/category/CategoryList";
import SubsList from "../components/subs/SubsList";

const Home = () => {
  return (
    <>
      <div className="jumbotron text-info h1 text-center font-weight-bold">
        <Jumbotron
          text={["Latest Products", "Latest Arrivals", "Best Sellers"]}
        />
      </div>
      <h4 className="text-center p-3 mt-5 mb-5 display-3 jumbotron">
        New Arrivals
      </h4>
      <NewArrivals />
      <br />
      <h4 className="text-center p-3 mt-5 mb-5 display-3 jumbotron">
        Best Sellers
      </h4>
      <BestSellers />
      <h4 className="text-center p-3 mt-5 mb-5 display-3 jumbotron">
        Categories
      </h4>

      <CategoryList />
      <br />
      <br />

      <h4 className="text-center p-3 mt-5 mb-5 display-3 jumbotron">
        Sub Categories
      </h4>

      <SubsList />
      <br />
      <br />
    </>
  );
};

export default Home;
