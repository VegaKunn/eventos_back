import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'

router.get('/', () => {
  return { hello: 'world' }
})

router
  .group(() => {
    /*
    |--------------------------------------------------------------------------
    | AUTH
    |--------------------------------------------------------------------------
    */
    router
      .group(() => {
        router.post('signup', [controllers.NewAccount, 'store'])
        router.post('login', [controllers.AccessToken, 'store'])
        router.post('logout', [controllers.AccessToken, 'destroy']).use(middleware.auth())
      })
      .prefix('auth')
      .as('auth')

    /*
    |--------------------------------------------------------------------------
    | ACCOUNT
    |--------------------------------------------------------------------------
    */
    router
      .group(() => {
        router.get('/profile', [controllers.Profile, 'show'])
      })
      .prefix('account')
      .as('profile')
      .use(middleware.auth())

    /*
    |--------------------------------------------------------------------------
    | EVENTS
    |--------------------------------------------------------------------------
    */
    router
      .group(() => {
        // 🔒 Criar evento
        router.post('/', [controllers.Events, 'store'])

        // 🔒 Listar eventos do usuário logado
        router.get('/my-events', [controllers.Events, 'myEvents'])

        // 🌍 Listar todos eventos (com filtro cidade/estado)
        router.get('/', [controllers.Events, 'index'])

        // 🔍 Ver evento específico
        router.get('/:id', [controllers.Events, 'show'])

        // 🔒 Atualizar evento
        router.put('/:id', [controllers.Events, 'update'])

        // 🔒 Deletar evento
        router.delete('/:id', [controllers.Events, 'destroy'])
      })
      .prefix('events')
      .as('events')
      .use(middleware.auth())
  })
  .prefix('/api/v1')
