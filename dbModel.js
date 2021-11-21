import mongoose from 'mongoose';


// Mongoose schema for tik tok videos
const tiktokSchema = mongoose.Schema({
    url: String,
    channel: String,
    song: String,
    likes: String,
    messages: String,
    description: String,
    shares: String
});


// Export the Tik Tok videos collection
export default mongoose.model("tiktokVideos", tiktokSchema);