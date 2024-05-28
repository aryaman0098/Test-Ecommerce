import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import { Routes, Route } from 'react-router-dom'
import Authentication from "./routes/authentication/authentication.component";
import { Shop } from "./routes/shop/shop.co\u001Dmponent";
import { Checkout } from "./routes/checkout/checkout.component";

const App = () => {
  return (
   <Routes>
    <Route path='/' element={<Navigation />}>
      <Route index element={<Home/>}/>  {/*index renders this component along with parent component path*/}
      <Route path='shop/*' element={<Shop />}/>  /** '*' is wildcard */
      <Route path='auth' element={<Authentication/>}/>
      <Route path='checkout' element={<Checkout />} />
    </Route>
   </Routes> 
  )
}

export default App;
