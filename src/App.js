import "./App.css";
import "tailwindcss/dist/tailwind.css";
import React from "react";
import { AppNav, AppHome, AppSignUp, AppRecipes, AppLogIn, AppNutrition, AppCocktail } from "./components/index";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import ProductsPage from "./components/ProductsPage"
import Owner from "./components/Owner";
import LogIn from "../src/components/LogIn"
import visitor from "./components/visitor";


function App() {
  return (
    <Router>
      <AppNav />
      <Switch>
        <Route exact path={"/"} component={AppHome} />
        <Route path={"/signup"} component={AppSignUp} />
        <Route path={"/login"} component={LogIn} />
        <Route path={"/products"} component={ProductsPage} />
        <PrivateRoute path={"/owner"} component={Owner} />
        <Route path={'/visitor'} component={visitor}/>
        {/* <Route path={'/cocktails'} component={AppCocktail}/> */}
      </Switch>
    </Router>
  );
}

export default App;
