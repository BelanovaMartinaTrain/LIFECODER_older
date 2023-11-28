import { InferSchemaType, Schema, model } from 'mongoose';

const lifecoSchema = new Schema({
    title: { type: String, required: true},
    desc: {type: String },
    category: {type: Array<string>},
    links: {type: Array<string>},
    images: {type: Array<string>},
    tags: {type: Array<string>}
}, {timestamps: true});

type Lifeco = InferSchemaType<typeof lifecoSchema>;

export default model<Lifeco>("Lifeco", lifecoSchema)