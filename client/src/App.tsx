import { BrowserRouter, Routes, Route } from "react-router-dom";
import TeacherRoutes from "./routes/TeacherRoutes";
import InstitutionRoutes from "./routes/InstitutionRoutes";
import StudentRoutes from "./routes/StudentRoutes";
import AuthPage from "./pages/Students/AuthPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Root path → role ke hisaab se redirect */}
        <Route
          path="/"
          element={
              <AuthPage /> 
          }
        />

        {/* Student all routes */}
        <Route path="/student/*" element={<StudentRoutes />} />

        {/* Teacher all routes */}
        <Route path="/teacher/*" element={<TeacherRoutes />} />

        {/* Institution all routes */}
        <Route path="/institution/*" element={<InstitutionRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
