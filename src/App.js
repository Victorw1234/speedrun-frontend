import "./App.css";
import Login from "./Login";
import { APIContext } from "./APIContext";
import { UserContext } from "./UserContext";
//import useLocalStorage from "./useLocalStorage";
import { useEffect,useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./Header";
import GameList from "./GameList";
import Game from "./Game";
import Signup from "./Signup";
import Page404 from "./Page404"
import UserPage from "./UserPage";
import ResponsiveAppBar from './muiHeader'

function App() {
  const [username, setUsername] = useState("username", null);
  let API = "http://localhost:52107";


  useEffect(() => {
    console.log(username);
  }, [username]);

  useEffect(() => {
    async function onStartup() {
      let isLoggedIn = false;
      let fetchedUsername;
      await fetch(API + "/Login", {
        method: "GET",
        credentials: "include",
        mode: "cors",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          isLoggedIn = data.isLoggedIn;
          fetchedUsername = data.username;
        });
  
      if (isLoggedIn) {
        setUsername(fetchedUsername);
      } else {
        setUsername(null);
      }
    }


    onStartup();
  }, [API,setUsername]);

  return (
    <div className="App">
      <APIContext.Provider value={API}>
        <UserContext.Provider value={username}>
          <BrowserRouter>
            {/*<Header updateUser={setUsername} />*/}
            <ResponsiveAppBar/>
            <div className="content-container">
              <Switch>
                <Route
                  exact
                  path="/Login"
                  render={() => {
                    return <Login updateUser={setUsername} />;
                  }}
                />
                <Route exact path="/Signup" component={Signup} />

                <Route exact path="/Games" component={GameList} />
                <Route exact path="/Game/:title" component={Game} />
                <Route
                  exact
                  path="/Game/:title/:categoryExtension"
                  component={Game}
                />
                <Route 
                  exact 
                  path="/User/:username"
                  component={UserPage}
                />
                <Route exact path="/404" component={Page404} />
                {/*<Route 
                  component={Page404}
                  />*/}
              </Switch>
            </div>
          </BrowserRouter>
        </UserContext.Provider>
      </APIContext.Provider>
    </div>
  );
}

export default App;
