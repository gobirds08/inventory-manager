import Button from "./components/button/Button"
import NavBar from "./components/nav_bar/NavBar"


function App() {

  return (
    <>
      <NavBar />
      <div className="content">
        <Button content="Hello World!"/>
      </div>
    </>
  )
}

export default App
