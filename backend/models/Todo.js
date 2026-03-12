import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: { 
      // String 
      type: String,
      required: true,
    },
    description: {
      type: String,
      // required: false 
    },
    status: {
      type: String,
      // role: ["pending", "completed"]
      enum: ["pending", "completed"], 
      default: "pending",
    },
  },
  { timestamps: true }
);

// export default Todo = model(todoSchema)
const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
