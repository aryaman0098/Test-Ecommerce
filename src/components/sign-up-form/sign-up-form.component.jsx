import { useState } from "react"
import { createAuthUserWithEmailAndPassword, createUserDocumenFromAuth } from "../../utils/firebase/firebase.utils"
import { FormInput } from "../form-input/form-input.component"
import './sign-up-form.style.scss'
import { Button } from "../button/button.component"

const defauiltFormField = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {

  const [formFields, setFormFields] = useState(defauiltFormField)
  const { displayName, email, password, confirmPassword } = formFields


  const resetFormFields = () => {
    setFormFields(defauiltFormField)
  }

  const handleSubmit = async (event) => {
    event.preventDefault(defauiltFormField)

    if(password !== confirmPassword) {
      alert("Passwords do not match!")
      return
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password)
      await createUserDocumenFromAuth(user, { displayName })
      resetFormFields()
    } catch(e) {
      if(e.code === 'auth/email-already-in-user') {
        alert("Cannot create user. Email already in use!")
      }
      console.log('User creation encounted an error', e)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormFields({...formFields, [name]: value})
  }

  return (
    <div className="sign-up-container">
      <h1>Don't have an account?</h1>
      <span>Signup with you email and password</span>
      <form onSubmit={handleSubmit}>
 
        <FormInput
          label="Display Name"
          required 
          type="text" 
          onChange={handleChange} 
          name="displayName" 
          value={displayName}
        />

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

        <FormInput
          label="Confirm Password"
          required 
          type="password" 
          onChange={handleChange} 
          name="confirmPassword" 
          value={confirmPassword}
        />

        <Button type="submit">Signup</Button>

      </form>
    </div>
  )
}

export default SignUpForm