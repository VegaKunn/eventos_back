import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.ts'

export default class Event extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'user_id' })
  declare userId: number

  @column()
  declare title: string

  @column()
  declare description: string

  @column({ columnName: 'event_date' })
  declare eventDate: string

  @column({ columnName: 'event_time' })
  declare eventTime: string

  @column()
  declare city: string

  @column()
  declare state: string

  @column()
  declare location: string

  @column({ columnName: 'image_url' })
  declare imageUrl: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
