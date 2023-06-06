import { useEffect, useState } from "react";
import { supabaseClient } from "./supabase-client.js";

import "./App.css";

import Signin from "./components/Signin/Signin.jsx";
import TodoList from "./components/TodoList/TodoList.jsx";
import UpdateProfile from "./components/UpdateProfile/UpdateProfile.jsx";

export default function App() {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabaseClient.auth.getSession().then((data) => {
      setSession(data.data.session);
    });
  }, []);

  useEffect(() => {
    const getProfile = async () => {
      // {
      //   data {
      //     user: {
      //       id: "pollo",
      //       token: '2asds'
      //     }
      //   }
      // }
      //const userData = await supabaseClient.auth.getUser();
      // userData.data.user.id
      // const { data } = await supabaseClient.auth.getUser();
      // data.user.id

      const {
        data: { user },
      } = await supabaseClient.auth.getUser();
      if (!user) return;

      const { data } = await supabaseClient
        .from("profiles")
        .upsert({ id: user.id })
        .select();

      setUser(data[0]);
    };

    getProfile();
  }, [session]);

  const signOut = async () => {
    await supabaseClient.auth.signOut();
    setSession(null);
  };

  return (
    <div>
      <h1>Ciao {user?.username || "sconosciuto"}!</h1>
      <p>{user?.bio}</p>
      <p>{user?.website}</p>
      <button onClick={signOut}>SIGNOUT</button>
      {!session && <Signin />}
      {session && user?.username && <TodoList />}
      {session && !user?.username && <UpdateProfile />}
    </div>
  );
}
