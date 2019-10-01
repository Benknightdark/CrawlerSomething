"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var crawlerHelper_1 = require("./Helpers/crawlerHelper");
var NewsModel_1 = require("./entity/NewsModel");
// import * as mongoose from "mongoose";
// import { dbConnect } from './Helpers/DB/Connect'
var Amqp = require("amqp-ts");
var amqp_ts_1 = require("amqp-ts");
var getContent = function (url) { return __awaiter(void 0, void 0, void 0, function () {
    var clientConfig, _a, browser, page, $;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                clientConfig = new crawlerHelper_1.ClientConfig();
                clientConfig.ignoreStatic = true;
                clientConfig.url = url;
                return [4 /*yield*/, crawlerHelper_1.crawlClient(clientConfig)];
            case 1:
                _a = _b.sent(), browser = _a.browser, page = _a.page, $ = _a.$;
                //browser.close();
                page.close();
                return [2 /*return*/, $];
        }
    });
}); };
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var connection, queue;
    return __generator(this, function (_a) {
        try {
            connection = new Amqp.Connection("amqp://rabbitmq:rabbitmq@localhost:5672/");
            queue = connection.declareQueue("crawl-url", { durable: false });
            queue.activateConsumer(function (message) { return __awaiter(void 0, void 0, void 0, function () {
                var url, $, model, sendQueue, sendMessage;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.log("Message received: " + message.getContent());
                            url = message.getContent();
                            return [4 /*yield*/, getContent(url)];
                        case 1:
                            $ = _a.sent();
                            model = new NewsModel_1.NewsModel();
                            model = {
                                url: url,
                                title: $('.page-header').text(),
                                description: $('.content-summary').text(),
                                createTime: new Date($('.created').first().text()),
                                content: $('.field-items').text()
                            };
                            sendQueue = connection.declareQueue("send-crawl-data", { durable: false });
                            sendMessage = new amqp_ts_1.Message();
                            sendMessage.content = Buffer.from(JSON.stringify(model));
                            sendQueue.send(sendMessage);
                            return [4 /*yield*/, console.log("\u722C\u5B8C\u6B64\u7DB2\u9801\u5167\u5BB9 " + url + ", \u4E26\u5DF2\u9001\u51FA\u8A0A\u606F  =>   " + model.title + "(" + new Date() + ")  ")];
                        case 2:
                            _a.sent();
                            sendQueue.delete();
                            return [2 /*return*/];
                    }
                });
            }); });
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
        }
        catch (error) {
            console.log(error);
        }
        return [2 /*return*/];
    });
}); })();
