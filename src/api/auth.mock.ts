export async function loginMock(email: string, password: string) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'admin@hotel.com' && password === '123456') {
        resolve({
          email,
          token: 'mock-token-123456'
        })
      } else {
        reject(new Error('Credenciales inválidas'))
      }
    }, 500)
  })
}
