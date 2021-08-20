import "./App.css";
import Login from "./Login";
import { APIContext } from "./APIContext";
import { UserContext } from "./UserContext";
import useLocalStorage from "./useLocalStorage";
import { useEffect } from "react";
import { BrowserRouter, Route,Switch } from "react-router-dom";
import Logout from "./Logout";
import Header from "./Header";
import GameList from "./GameList";
import Game from './Game'

function App() {
  const [username, setUsername] = useLocalStorage("username", null);
	let API = 'http://localhost:52107';

  async function onStartup() {
	setUsername(null);


	  var isLoggedIn = false;
	  var fetchedUsername;
	await fetch(API+'/Login', {
		method:'GET',
		credentials:'include',
		mode:'cors'
	})
	.then(response => response.json())
	.then(data => {
		console.log(data)
		isLoggedIn = data.isLoggedIn;
		fetchedUsername = data.username;
	})

	if (isLoggedIn) {
		console.log("if ran now")
		setUsername(fetchedUsername);
	}
  }

  useEffect(() => {
    onStartup();
  }, []);

  return (
    <div className="App">
      <APIContext.Provider value={API}>

        <UserContext.Provider value={username}>
          <BrowserRouter>
          <Header updateUser={setUsername}/>

            <Switch>
            


              <Route path="/" exact render={() => <><h1>Home page</h1> <GameList/></>}/>
              <Route exact
                path="/Login"
                render={() => {
                  return <Login updateUser={setUsername} />;
                }}
              />
              <Route exact
                path="/Games"
                component={GameList}
              />
              <Route exact
                path="/Game/:title"
                component={Game}
              />
              <Route exact
                path="/Game/:title/:categoryExtension"
                component={Game}
              />
              <Route 
                path="/"
                render={() => {return <h2>404</h2>}}
                />
            </Switch>
          </BrowserRouter>
        </UserContext.Provider>
      </APIContext.Provider>


      <button
        onClick={() => {
          fetch("http://localhost:52107/Login", { credentials: "include" })
            .then((response) => response.json())
            .then((data) => console.log(data));
        }}
      >
        asdf
      </button>
    </div>
  );
}

export default App;
