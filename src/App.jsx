import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import Home from "./pages/Home";
import Formulario from "./pages/Formulario";
import Agendamento from "./pages/Agendamento";
import Chat from "./pages/Chat";
import ConfirmacaoConvidado from "./pages/ConfirmacaoConvidado"; // novo

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/formulario" element={<Formulario />} />
            <Route path="/agendamento" element={<Agendamento />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/confirmar/:convidadoId" element={<ConfirmacaoConvidado />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
