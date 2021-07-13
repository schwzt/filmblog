import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Contacts from "./pages/contacts/Contacts";
import ErrorPage from "./pages/error/ErrorPage";
import Single from "./pages/single/Single";
import Create from "./pages/create/Create";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
import Mobile from "./components/mobile/Mobile";

function App() {
  const { user } = useContext(Context);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Router>
      <Mobile isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle}/>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/contacts">
          <Contacts />
        </Route>
        <Route path="/register">{user ? <Home /> : <Register />}</Route>
        <Route path="/login">{user ? <Home /> : <Login />}</Route>
        <Route path="/post/:id">
          <Single />
        </Route>
        <Route path="/create">{user ? <Create /> : <Home />}</Route>
        <Route path="/settings">{user ? <Settings /> : <Home />}</Route>
        <Route path="*" component={ErrorPage} />
      </Switch>
    </Router>
  );
}

export default App;
