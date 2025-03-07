import {isEmail,isNotEmpty,hasMinLength,isEqualToOtherValue} from '../util/validation.js'
import { useActionState } from 'react'

function signupAction(prevFormdata,formData){
  const email = formData.get('email')
  const password = formData.get('password')
  const confirmPassword = formData.get('confirm-password')
  const firstName = formData.get('first-name')
  const lastName = formData.get('first-name')
  const role = formData.get('role')
  const terms = formData.get('terms')
  const acquisitionChannel = formData.getAll('acquisition')

  const errors=[];
  if(!isEmail(email)){
    errors.push("Email is not valid")
  }
  if(!isNotEmpty(password) || hasMinLength(password,6)){
    errors.push("Password must have minimum 6 charecters")
  }
  if(!isEqualToOtherValue(password,confirmPassword)){
    errors.push("Confirm password and password don't match")
  }
  if(!isNotEmpty(firstName) || !isNotEmpty(lastName)){
    errors.push("Please provide both your first name and last name")
  }
  if(!isNotEmpty(role)){
    errors.push("Please provide your role")
  }
  if(!terms){
    errors.push("Terms and conditions must be signed in")
  }
  if(acquisitionChannel.length===0){
    errors.push("Please select at least one acquistition channel")
  }
  if(errors.length>0){
    return {
      errors:errors,
      enteredData:{
        email,
        password,
        confirmPassword,
        firstName,
        lastName,
        role,
        terms,
        acquisitionChannel
      }
    }
  }
  return {errors:null}
}

export default function Signup() {

  const[formState, formAction] = useActionState(signupAction,{errors:null})

  console.log(formState.errors)

  return (
    <form action={formAction}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className="control">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" defaultValue={formState.enteredData?.email}/>
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" defaultValue={formState.enteredData?.password}/>
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
            defaultValue={formState.enteredData?.confirmPassword}
          />
        </div>
      </div>

      <hr />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" defaultValue={formState.enteredData?.firstName} />
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" defaultValue={formState.enteredData?.lastName}/>
        </div>
      </div>

      <div className="control">
        <label htmlFor="phone">What best describes your role?</label>
        <select id="role" name="role" defaultValue={formState.enteredData?.role}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="employee">Employee</option>
          <option value="founder">Founder</option>
          <option value="other">Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <div className="control">
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
            defaultChecked={formState.enteredData?.acquisitionChannel.includes('google')}
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
            defaultChecked={formState.enteredData?.acquisitionChannel.includes('friend')}
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input type="checkbox" id="other" name="acquisition" value="other" 
            defaultChecked={formState.enteredData?.acquisitionChannel.includes('other')}
          />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input type="checkbox" id="terms-and-conditions" name="terms" defaultValue={formState.enteredData?.terms}
/>I
          agree to the terms and conditions
        </label>
      </div>

      {formState.errors && 
      (<ul className="error">
        {formState.errors.map((error)=>(
          <li key={error}>
            {error}
          </li>
        ))}
      </ul>)}

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button className="button">Sign up</button>
      </p>
    </form>
  );
}
