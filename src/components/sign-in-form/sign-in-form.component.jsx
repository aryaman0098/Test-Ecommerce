import { useState  } from "react"
import { 
  signInWithGooglePopup, 
  createUserDocumenFromAuth ,
  signInAuthWithEmailAndPassword
} from "../../utils/firebase/firebase.utils"
import { FormInput } from "../form-input/form-input.component"
import './sign-in-form.style.scss'
import { Button, BUTTON_TYPES_CLASSES } from "../button/button.component"

const defauiltFormField = {
  email: '',
  password: '',
}

const SignInForm = () => {

  const [formFields, setFormFields] = useState(defauiltFormField)
  const { email, password } = formFields


  const resetFormFields = () => {
    setFormFields(defauiltFormField)
  }

  const signInWithGoogle = async () => {
    await signInWithGooglePopup()
  }

  const handleSubmit = async (event) => {
    event.preventDefault(defauiltFormField)

    try {
      const { user } = await signInAuthWithEmailAndPassword(email, password)
      resetFormFields()
    } catch(e) {
      console.log(e)
      if(e.code ==='auth/invalid-credential') {
        alert('Invalid credentials!')
      }
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormFields({...formFields, [name]: value})
  }

  return (
    <div className="sign-up-container">
      <h1>Already have an account?</h1>
      <span>Sign in with email and password</span>
      <form onSubmit={handleSubmit}>
 
        <FormInput
          label="Email"
          required 
          type="email" 
          onChange={handleChange} 
          name="email" 
          value={email}
        />

        <FormInput
          label="Password"
          required 
          type="password" 
          onChange={handleChange} 
          name="password" 
          value={password}
        />

        <div className="buttons-container">
          <Button type='submit'>Sign In</Button>
          <Button 
            type='button' 
            buttonType={BUTTON_TYPES_CLASSES.google} 
            onClick={signInWithGoogle}
          >
            Google Sign In
          </Button>
        </div>

      </form>
    </div>
  )
}

export default SignInForm