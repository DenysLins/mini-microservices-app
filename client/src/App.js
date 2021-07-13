import "./App.css";
import PostCreate from "./components/postCreate/PostCreate";
import PostList from "./components/postList/PostList";

function App() {
  return (
    <div className="container">
      <h1>Create Post</h1>
      <PostCreate />
      <hr />
      <PostList />
    </div>
  );
}

export default App;
