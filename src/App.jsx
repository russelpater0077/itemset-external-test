export default function App() {
  return (
    <main className="page">
      <div className="card">
        <h1>Hello, website is working!</h1>
        <p>If you can see this page, your React app is rendering correctly.</p>

        <button onClick={() => alert("React button works!")}>Test Button</button>
      </div>
    </main>
  );
}
