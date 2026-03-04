/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    newAccount: {
      store: typeof routes['auth.new_account.store']
    }
    accessToken: {
      store: typeof routes['auth.access_token.store']
      destroy: typeof routes['auth.access_token.destroy']
    }
  }
  profile: {
    profile: {
      show: typeof routes['profile.profile.show']
    }
  }
  events: {
    events: {
      store: typeof routes['events.events.store']
      myEvents: typeof routes['events.events.my_events']
      index: typeof routes['events.events.index']
      show: typeof routes['events.events.show']
      update: typeof routes['events.events.update']
      destroy: typeof routes['events.events.destroy']
    }
    likes: {
      toggle: typeof routes['events.likes.toggle']
      count: typeof routes['events.likes.count']
    }
  }
}
