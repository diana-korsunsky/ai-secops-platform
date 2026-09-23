interface LoginRequest {
  email: string
  password: string
}

export async function login(data: LoginRequest):Promise<void>
 {

    const response = await fetch('http://localhost:3000/auth/login', {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },

    credentials: 'include',

    body: JSON.stringify(data),
  })

   if (!response.ok) {
    throw new Error('Login failed')
   }
  
 }