// import type { HttpContext } from '@adonisjs/core/http'

import Like from '#models/like'
import Event from '#models/event'
import type { HttpContext } from '@adonisjs/core/http'

export default class LikesController {
  async toggle({ params, auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const eventId = params.id

    const event = await Event.find(eventId)
    if (!event) return response.status(404).send({ message: 'Evento não encontrado' })

    const existing = await Like.query()
      .where('user_id', user.id)
      .andWhere('event_id', eventId)
      .first()

    if (existing) {
      await existing.delete()
      return { liked: false }
    }

    await Like.create({ userId: user.id, eventId: eventId })
    return { liked: true }
  }

  async count({ params }: HttpContext) {
    const eventId = params.id
    const total = await Like.query().where('event_id', eventId).count('* as total').first()
    return { total: total?.$extras.total || 0 }
  }
}
