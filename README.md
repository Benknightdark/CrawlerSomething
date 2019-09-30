# ITHome CrawlerSomething
- WebSite
- Crawler (node)
  - Receive CrawlerMessage
  - Send SaveDataMessage
- web api (python)
  - Send CrawlerMessage
- MessageBus (python)
  - Recieve SaveDataMessage
- MessageBroker (RabbitMQ)
- MongoDB
  ````
  {
      "url",
      "content",
      "createTime"
  }
  ````
- MongoDB Management

