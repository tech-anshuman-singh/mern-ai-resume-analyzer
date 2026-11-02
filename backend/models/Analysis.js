import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  jobDescription: { type: String, required: true },
  result: { type: mongoose.Schema.Types.Mixed, required: true }
}, { timestamps: true });

export default mongoose.model("Analysis", analysisSchema);
