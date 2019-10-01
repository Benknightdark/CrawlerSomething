import * as mongoose from "mongoose";

export class NewsModel  {
    url: string;
    title: string;
    description: string;
    content: string;
    createTime: Date;
    systemInsertTime:Date
}

export interface INewsModel extends mongoose.Document{
    url: string;
    title: string;
    description: string;
    content: string;
    createTime: Date;
}

export const IThomeNewsSchema = new mongoose.Schema({
    url: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    createTime: { type: Date, required: true },
    content: { type: String, required: true }
});