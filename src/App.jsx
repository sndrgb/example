import { useEffect, useState } from "react";
import { supabaseClient } from "./supabase-client.js";
import Signin from "./components/Signin/Signin.jsx";
import "./App.css";
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

  if (session) {
    if (user && user.username) {
      return (
        <div>
          <h1>Ciao {user.username}!</h1>
          <TodoList />
        </div>
      );
    } else {
      return <UpdateProfile />;
    }
  } else {
    return <Signin></Signin>;
  }
}
