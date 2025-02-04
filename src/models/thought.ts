import { Document, Schema, Types, model } from 'mongoose';
export interface IReaction{
reactionId: Schema.Types.ObjectId;
reactionBody: string;
username: string;
createdAt: Date;
}

interface Thought extends Document{
thoughtText: string;
createdAt: Date;
username: string;
reactions: IReaction[];
reactionCount: number;
}
// Create the reaction schema
const reactionSchema = new Schema<IReaction>({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // Adjust the getter to accept any and cast to Date
        get: (timestamp: any) => {
            if (timestamp instanceof Date) {
                return timestamp.toISOString();
            }
            return timestamp; // or handle the case as needed
        },
    },
}, {
    toJSON: { 
        getters: true,
    }, 
    toObject: {
        getters: true,
    },
});

// Export the schema
export default reactionSchema;
//thought schema
const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp: Date) => timestamp.toISOString(), // Format the timestamp
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);
//Create a virtual property
ThoughtSchema.virtual('reactionCount').get(function(this:Thought){
return this.reactions.length;
});
export const Thought = model<Thought>('Thought', ThoughtSchema);