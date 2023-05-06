import { useCallback, useEffect, useState } from "react";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import Auth from "./components/Auth";
import { useCookies } from "react-cookie";

const App = () => {
  const [cookies] = useCookies(null);
  const [tasks, setTasks] = useState(null);

  const user = cookies.Email;
  const authToken = cookies.Token;

  const getData = useCallback(async () => {
    try {
      const res = await fetch(`http://localhost:8000/todos/${user}`);
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  // sort tasks by date
  const sortedTasks = tasks?.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  useEffect(() => {
    if (authToken) {
      getData();
    }
  }, [authToken, getData]);

  return (
    <div className="app">
      {authToken ? (
        <>
          <ListHeader listName={"My Hyper todo list ✅"} getData={getData} />
          {sortedTasks?.map((task) => (
            <div key={task.id}>
              <ListItem task={task} getData={getData} />
            </div>
          ))}
        </>
      ) : (
        <Auth />
      )}
    </div>
  );
};

export default App;
