import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface LoginFormData {
  email: string
  password: string
}

interface LoginErrors {
  email: string
  password: string
}

function LoginPage() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
    })
    const [errors, setErrors] = useState<LoginErrors>({
        email: '',
        password: '',
    })


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (value){
         setErrors((prev) => ({
      ...prev,
      [name]: "",
    }))
    }


  }

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newErrors: LoginErrors = {
      email: '',
      password: '',
    }
    if (!formData.email) {
      newErrors.email = 'Email is required'
    }
    if (!formData.password) {
      newErrors.password = 'Password is required'
    }

    setErrors(newErrors)

    if (newErrors.email || newErrors.password) {
        return
    }
    navigate('/dashboard')
  
  }

  return (
    <div className="flex flex-col min-h-screen ">

        <h2 className=" text-4xl font-bold text-center pt-7">
            AI Security Operations Platform
            </h2>

        <div className="flex flex-1 items-center justify-center">
          <div className="flex flex-col max-w-lg rounded-xl p-8 shadow-lg">
      
         <h2 className="text-4xl font-bold text-center pb-4"> Login</h2>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col items-center gap-2">

          <div className="flex gap-2">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            {errors.email && (<p>{errors.email}</p>)}
             </div>
          

          <div className="flex gap-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
         
            {errors.password && (<p>{errors.password}</p>)}
            </div>
         

         <button type="submit"className="w-full rounded-lg px-4 py-2" >Login </button>

        </form>
      </div>
      
      </div>
    </div>
  )
}

export default LoginPage
