import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import UserTransformer from '#transformers/user_transformer'

export default class NewAccountController {
  async store({ request, response, serialize }: HttpContext) {
    try {
      // aceita name OU fullName
      const fullName = request.input('fullName') || request.input('name')

      const email = request.input('email')
      const password = request.input('password')

      // validação simples
      if (!fullName || !email || !password) {
        return response.status(400).send({
          message: 'Nome, email e senha são obrigatórios',
        })
      }
      console.log(fullName, email, password)
      // cria usuário
      const user = await User.create({
        fullName,
        email,
        password,
      })

      // cria token automático
      const token = await User.accessTokens.create(user)

      return serialize({
        user: UserTransformer.transform(user),
        token: token.value!.release(),
      })
    } catch (error) {
      return response.status(400).send({
        message: 'Erro ao criar conta (email pode já existir)',
      })
    }
  }
}
