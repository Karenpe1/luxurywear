import Body from "../components/Body";
import Checkout from "./Checkout";

const Home = ({isSearch}) => {
  return (
    <>
      <Body isSearch={isSearch}/>
      <Checkout/>
    </>
  );
};

export default Home;
