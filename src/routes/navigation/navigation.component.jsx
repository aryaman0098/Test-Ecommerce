import { Fragment, useContext } from "react"
import { Outlet, Link } from "react-router-dom"
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import { UserContext } from "../../context/user.context"
import { signOutUser } from "../../utils/firebase/firebase.utils"
import { CartIcon } from "../../components/cart-icon/cart-icon.component"
import { CartDropdown } from "../../components/cart-dropdown/cart-dropdown.component"
import { CartContext } from "../../context/cart.context"
import { 
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink
} from "./navigation.styles"

const Navigation = () => {

  const { currentUser } = useContext(UserContext)

  const { isCartOpen } = useContext(CartContext)

  return (
    <Fragment>
      <NavigationContainer>

        <LogoContainer to='/'>
          <CrwnLogo className='logo' />
        </LogoContainer>

        <NavLinks>
          <NavLink to='/shop'>  {/* Similar to anchor tag */}
            SHOP
          </NavLink>
          {
            currentUser ? (
              <NavLink as='span' onClick={signOutUser}>
                SIGN OUT
              </NavLink>
            ) : (
              <NavLink to='/auth'>  {/* Similar to anchor tag */}
                SIGN-IN
              </NavLink>
            )
          }
          <CartIcon />
        </NavLinks>
        
        { isCartOpen && <CartDropdown /> }
      </NavigationContainer>
      <Outlet />  {/*renders the child route along with parent route*/}
    </Fragment>
  )
}

export default Navigation
  