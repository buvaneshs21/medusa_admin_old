import { Route, Routes } from "react-router-dom"
import SpecialDetails from "./details"

const Specials = () => {
  return (
    <Routes>
      <Route path="/" element={<SpecialDetails />} />
    </Routes>
  )
}

export default Specials
