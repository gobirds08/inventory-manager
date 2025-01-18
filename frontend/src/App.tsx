// import Button from "./components/button/Button"
import NavBar from "./components/nav_bar/NavBar"
import Products from "./pages/Products"


function App() {

  return (
    <>
      <NavBar />
      <div className="content">
        {/* <Button content="Hello World!"/> */}
        {/* <Products /> */}
        <Products/>
      </div>
    </>
  )
}

export default App
