import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface LoginFormData {
  email: string
  password: string
}

function LoginPage() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
    })


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    navigate('/dashboard')
  
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div  className="w-full max-w-md rounded-xl p-8 shadow-lg">
        <h1>AI Security Operations Platform</h1>
        <h2>Login</h2>


        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit"  className="submit-btn">
          </button>

        </form>

        <div className="login-footer">
          <a href="#forgot">Forgot password?</a>
          <span>|</span>
          <a href="#signup">Sign up</a>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
