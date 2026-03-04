import Event from '#models/event'
import type { HttpContext } from '@adonisjs/core/http'

export default class EventsController {
  /**
   * Listar todos eventos (com filtro opcional)
   * GET /events?city=São Paulo&state=SP
   */
  async index({ request }: HttpContext) {
    const city = request.input('city')
    const state = request.input('state')

    const query = Event.query().preload('user')

    if (city) {
      query.whereILike('city', `%${city}%`)
    }

    if (state) {
      query.whereILike('state', `%${state}%`)
    }

    return await query
  }

  /**
   * Listar eventos do usuário logado
   */
  async myEvents({ auth }: HttpContext) {
    const user = auth.user!

    return await Event.query().where('user_id', user.id).orderBy('created_at', 'desc')
  }

  /**
   * Mostrar evento específico
   */

  async show({ params, response }: HttpContext) {
    const event = await Event.find(params.id)

    if (!event) {
      return response.status(404).send({
        message: 'Evento não encontrado',
      })
    }

    return event
  }

  async show2({ params }: HttpContext) {
    const event = await Event.findOrFail(params.id)
    await event.load('user')
    return event
  }

  /**
   * Criar evento
   */
  async store({ request, auth }: HttpContext) {
    const user = auth.user!

    const data = request.only([
      'title',
      'description',
      'event_date',
      'event_time',
      'city',
      'state',
      'location',
      'image_url',
    ])

    const event = await Event.create({
      ...data,
      userId: user.id,
    })

    return event
  }

  /**
   * Atualizar evento
   */
  async update({ params, request, auth, response }: HttpContext) {
    const user = auth.user!
    const event = await Event.findOrFail(params.id)

    if (event.userId !== user.id) {
      return response.unauthorized({ message: 'Não autorizado' })
    }

    const data = request.only([
      'title',
      'description',
      'event_date',
      'event_time',
      'city',
      'state',
      'location',
      'image_url',
    ])

    event.merge(data)
    await event.save()

    return event
  }

  /**
   * Deletar evento
   */
  async destroy({ params, auth, response }: HttpContext) {
    const user = auth.user!
    const event = await Event.findOrFail(params.id)

    if (event.userId !== user.id) {
      return response.unauthorized({ message: 'Não autorizado' })
    }

    await event.delete()

    return { message: 'Evento deletado com sucesso' }
  }
}
