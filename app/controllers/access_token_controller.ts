import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import UserTransformer from '#transformers/user_transformer'

export default class AccessTokenController {
  async store({ request, response, serialize }: HttpContext) {
    try {
      const email = request.input('email')
      const password = request.input('password')

      // validação manual simples
      if (!email || !password) {
        return response.status(400).send({
          message: 'Email e senha são obrigatórios',
        })
      }

      const user = await User.verifyCredentials(email, password)

      const token = await User.accessTokens.create(user)

      console.log('token', token)
      console.log('token.value!.release(),', token.value!.release())

      return serialize({
        user: UserTransformer.transform(user),
        token: token.value!.release(),
      })
    } catch (error) {
      return response.status(401).send({
        message: 'Email ou senha inválidos',
      })
    }
  }

  async destroy({ auth }: HttpContext) {
    const user = auth.getUserOrFail()

    if (user.currentAccessToken) {
      await User.accessTokens.delete(user, user.currentAccessToken.identifier)
    }

    return {
      message: 'Logged out successfully',
    }
  }
}
