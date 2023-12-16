import Env from '@ioc:Adonis/Core/Env'

export default {
  discord: {
    loginEvent: {
      url: Env.get('WEBHOOK_DC_FOR_LOGIN'),
      title: 'New User Logged-In!!!',
      contents: [
        ['Information', 'Server Name: ' + Env.get('SERVER_NAME')],
        // ['IP', '<not-set>'],
        // ['device', '<not-set>'],
        // ['user-agent', '<not-set>'],
      ],
    },
  },
}
