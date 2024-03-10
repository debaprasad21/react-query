import "./App.css";
import { useQuery } from "@tanstack/react-query";

function App() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["todo"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/todos").then((res) => {
        return res.json();
      }),
  });

  if (error) return <div>There was an error</div>;

  if (isLoading) return <div>Data is loading</div>;
  return (
    <div className="App">
      {data &&
        data.map((todo) => (
          <div key={todo.id}>
            <h1>id: {todo.id}</h1>
            <h1>Title: {todo.title}</h1>
          </div>
        ))}
    </div>
  );
}

export default App;
