import Config from '@ioc:Adonis/Core/Config'
import { Webhook, MessageBuilder } from 'discord-webhook-node'

interface WebhookConfig {
  url: string
  author?: string
  title?: string
  description?: string
  thumbnail?: string
  contents?: Array<Array<string>>
}

export default class DiscordService {
  private eventName: string = ''
  private config: WebhookConfig = { url: '' }
  constructor(eventName: string) {
    this.eventName = eventName
    this.getConfig()
  }

  private getConfig(): void {
    switch (this.eventName) {
      case 'webhook:r10:login':
        const cfg = Config.get('webhooks.discord.loginEvent')
        Object.assign(this.config, cfg)
        break
    }
  }

  public setField(key: string, value: string | string[]): typeof this {
    if (key) {
      if (key === 'contents') {
        if (!this.config.contents) this.config.contents = []
        if (Array.isArray(value)) {
          this.config.contents = this.config.contents.concat(value)
        }
      } else this.config[key] = value
    }
    return this
  }

  private getContent(): MessageBuilder {
    let mb = new MessageBuilder()
    if (this.config.author) mb = mb.setAuthor(this.config.author)
    if (this.config.title) mb = mb.setTitle(this.config.title)
    if (this.config.description) mb = mb.setDescription(this.config.description)
    if (this.config.thumbnail) mb = mb.setThumbnail(this.config.thumbnail)
    if (this.config.contents) {
      for (const content of this.config?.contents) {
        mb = mb.addField(content[0], content[1])
      }
    }
    return mb
  }
  public send(): void | boolean {
    try {
      if (!this.config.url) return false
      const wh = new Webhook(this.config.url)
      const content = this.getContent()
      if (content) wh.send(content)
    } catch (err) {
      throw err
    }
  }
}
