import { ClientConfig, crawlClient } from './Helpers/crawlerHelper';
import { NewsModel, INewsModel, IThomeNewsSchema } from './entity/NewsModel';
// import * as mongoose from "mongoose";
// import { dbConnect } from './Helpers/DB/Connect'
import * as Amqp from "amqp-ts";

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
        var connection = new Amqp.Connection("amqp://rabbitmq:rabbitmq@localhost:5672/");
        var queue = connection.declareQueue("crawl-url",{durable:false});
       const q=await  queue.activateConsumer(async (message) => {
        console.log("Message received: " + message.getContent());
        let url: string = message.getContent();
        const $ = await getContent(url);
        let model = new NewsModel();
        model = {
            url: url,
            title: $('.page-header').text(),
            description: $('.content-summary').text(),
            createTime: new Date($('.created').first().text()),
            content: $('.field-items').text()
        };     
          await console.log(`爬完此網頁內容 ${url}  =>   ${model.title}(${new Date()})  `)
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
