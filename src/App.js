import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://eawtqfxdnrjfrngznhao.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhd3RxZnhkbnJqZnJuZ3puaGFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MzY1ODYsImV4cCI6MjA2NTUxMjU4Nn0.ejEi0dxGQ2MOOxfU0RMLR7SjloqMrQquO1iOfqEVT2Q"
);

export default function App() {
  const [clients, setClients] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState('Excellent');

  useEffect(() => {
    fetchClients();
  }, []);

  async function fetchClients() {
    const { data, error } = await supabase.from("clients").select("*");
    if (error) console.error("Error fetching clients:", error);
    else setClients(data);
  }

  async function addClient() {
    if (!name || !email) return alert("Name and email required.");
    const { error } = await supabase.from("clients").insert([{ name, email, rating }]);
    if (error) console.error("Insert error:", error);
    else {
      setName('');
      setEmail('');
      setRating('Excellent');
      fetchClients();
    }
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Client Manager</h1>

      <h2>Add New Client</h2>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <select value={rating} onChange={e => setRating(e.target.value)}>
        <option>Excellent</option>
        <option>Good</option>
        <option>Fair</option>
      </select>
      <button onClick={addClient}>Add Client</button>

      <h2>Client List</h2>
      <ul>
        {clients.map((client) => (
          <li key={client.id}>{client.name} — {client.email} — {client.rating}</li>
        ))}
      </ul>
    </div>
  );
}
