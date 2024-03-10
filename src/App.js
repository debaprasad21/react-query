import "./App.css";
import { useQuery, useMutation } from "@tanstack/react-query";

function App() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["todo"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/posts").then((res) => {
        return res.json();
      }),
  });

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: (newPost) =>
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(newPost),
        headers: { "Content-type": "application/json" },
      }).then((res) => {
        return res.json();
      }),
  });

  if (error || isError) return <div>There was an error</div>;

  if (isLoading) return <div>Data is loading</div>;
  return (
    <div className="App">
      {isPending && <p>Data is Being Added...</p>}
      <button
        onClick={() =>
          mutate({
            userId: 5000,
            id: 4000,
            title: "this is the title",
            body: "this is the body",
          })
        }
      >
        Add Posts
      </button>
      {data &&
        data.map((todo) => (
          <div key={todo.id}>
            <h4>id: {todo.id}</h4>
            <h4>Title: {todo.title}</h4>
            <p>{todo.body}</p>
          </div>
        ))}
    </div>
  );
}

export default App;
