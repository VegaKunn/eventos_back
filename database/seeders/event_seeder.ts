import{ BaseSeeder} from '@adonisjs/lucid/seeders'
import Event from '#models/event'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  public async run () {
    const events = [
      {
        userId: 1,
        title: 'Feira de Adoção de Pets',
        description: 'Evento para adoção de cães e gatos resgatados.',
        eventDate: '2026-04-10',
        eventTime: '10:00',
        city: 'São Paulo',
        state: 'SP',
        location: 'Parque Ibirapuera',
        imageUrl: 'https://placedog.net/600/400?id=1',
      },
      {
        userId: 1,
        title: 'Encontro de Gatos',
        description: 'Um evento para amantes de gatos 🐱',
        eventDate: '2026-04-12',
        eventTime: '14:00',
        city: 'São Paulo',
        state: 'SP',
        location: 'Centro Cultural',
        imageUrl: 'https://placekitten.com/600/400',
      },
      {
        userId: 1,
        title: 'Workshop de Fotografia Pet',
        description: 'Aprenda a tirar fotos incríveis de animais.',
        eventDate: '2026-04-15',
        eventTime: '09:00',
        city: 'Santo André',
        state: 'SP',
        location: 'Studio Criativo',
        imageUrl: 'https://picsum.photos/600/400?random=1',
      },
      {
        userId: 1,
        title: 'Corrida com Cães',
        description: 'Traga seu cachorro para correr com você!',
        eventDate: '2026-04-20',
        eventTime: '07:30',
        city: 'São Bernardo do Campo',
        state: 'SP',
        location: 'Parque da Juventude',
        imageUrl: 'https://placedog.net/600/400?id=2',
      },
      {
        userId: 1,
        title: 'Festival Pet',
        description: 'Comida, brincadeiras e produtos para pets.',
        eventDate: '2026-04-25',
        eventTime: '11:00',
        city: 'São Caetano do Sul',
        state: 'SP',
        location: 'Espaço Verde Chico Mendes',
        imageUrl: 'https://picsum.photos/600/400?random=2',
      },
    ]

    await Event.createMany(
      events.map((event) => ({
        ...event,
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      }))
    )
  }
}