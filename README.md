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
       "title",
       "description"
      "content",
      "createTime"
  }
  ````
- MongoDB Management

