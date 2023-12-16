import View from '@ioc:Adonis/Core/View'

import Application from '@ioc:Adonis/Core/Application'

View.mount('documentation', Application.makePath('app/Modules/Documentation/Views'))
