import { BrowserRouter, Route, Routes } from "react-router-dom"
import ErrorPage from "./routes/Error-page"
import { SignIn } from "./routes/SignIn"
import { Dashboard } from "./routes/Dashboard"
import { SendMoney } from "./routes/SendMoney"
import { SignUp } from "./routes/SignUp"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" errorElement={<ErrorPage/>} element={<SignIn/>} />
        <Route path="/" errorElement={<ErrorPage/>} element={<SignUp/>}/>
        <Route path="/dashboard" errorElement={<ErrorPage/>} element={<Dashboard/>}/>
        <Route path="/send" errorElement={<ErrorPage/>} element={<SendMoney/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
