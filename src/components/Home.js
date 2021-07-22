import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div className={"home bg-black h-screen w-screen flex flex-col justify-center align-center"}>
      <h1 className={"text-white mx-auto mt-24 text-6xl"}>Grubspace</h1>
      <h3 className={"text-white my-8 mx-auto text-2xl"}>Choose from thousands of recipes</h3>
      <Link className={"text-yellow-500 my-8 mx-auto text-2xl"} to={"recipes"}><h2>Get started today</h2></Link>
      <p className={"text-gray-500 my-8 mx-auto text-2xl"}>Powered by Spoonacular</p>
    </div>
  );
}
