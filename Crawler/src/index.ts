import { ClientConfig, crawlClient } from './Helpers/crawlerHelper';
import { NewsModel, INewsModel, IThomeNewsSchema } from './entity/NewsModel';
// import * as mongoose from "mongoose";
// import { dbConnect } from './Helpers/DB/Connect'
import * as Amqp from "amqp-ts";
import { Message } from 'amqp-ts';

const getContent = async (url: string) => {
    let clientConfig: ClientConfig = new ClientConfig();
    clientConfig.ignoreStatic = true;
    clientConfig.url = url;
    const { browser, page, $ } = await crawlClient(clientConfig);
    //browser.close();
    page.close();
    return $
}
(async () => {
    try {
        const connectString=process.env.AQMPCONNECTSTRING===undefined?'amqp://rabbitmq:rabbitmq@localhost:5672/':process.env.AQMPCONNECTSTRING
        console.log(connectString)
        const connection = new Amqp.Connection(connectString);
        const queue = connection.declareQueue("crawl-url",{durable:false});
         queue.activateConsumer(async (message) => {
        console.log("Message received: " + message.getContent());
        let url: string = message.getContent();
        const $ = await getContent(url);
        let model = new NewsModel();
        model = {
            url: url,
            title: $('.page-header').text(),
            description: $('.content-summary').text(),
            createTime: new Date($('.created').first().text()),
            content: $('.field-items').text(),
            systemInsertTime:new Date()
        };     

          const sendQueue = connection.declareQueue("send-crawl-data",{durable:false});
          const sendMessage=new Message();
          sendMessage.content=Buffer.from(JSON.stringify(model));
          sendQueue.send(sendMessage)
         
          await console.log(`爬完此網頁內容 ${url}, 並已送出訊息  =>   ${model.title}(${new Date()})  `)
           sendQueue.delete();
           //queue.delete();

         });


        
        // // it is possible that the following message is not received because
        // // it can be sent before the queue, binding or consumer exist
        // var msg = new Amqp.Message("Test");
        // exchange.send(msg);
        
        // connection.completeConfiguration().then(() => {
        //     // the following message will be received because
        //     // everything you defined earlier for this connection now exists
        //     var msg2 = new Amqp.Message("Test2");
        //     exchange.send(msg2);
        // });




        // const db=await dbConnect();   
        //  const IThomeNews = db.model<INewsModel>("ITHome", IThomeNewsSchema);
        // let url: string = `https://ithome.com.tw/news/133290`;
        // const $ = await getContent(url);
        // let model = new NewsModel();
        // model = {
        //     url: url,
        //     title: $('.page-header').text(),
        //     description: $('.content-summary').text(),
        //     createTime: new Date($('.created').first().text()),
        //     content: $('.field-items').text()
        // };
        // //console.log(model)
        // // let model = new IThomeNews({
        // //     url: url,
        // //     title: $('.page-header').text(),
        // //     description: $('.content-summary').text(),
        // //     createTime: new Date($('.created').first().text()),
        // //     content: $('.field-items').text()
        // // });

        // //  await model.save();
        // //  await console.log(`Saved   =>   ${model.title}  -  ${new Date()}`)

    } catch (error) {
        console.log(error)
    }

})()
