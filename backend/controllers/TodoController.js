import Todo from "../models/Todo.js";

export const AddTodo = async (req, res) => {
  try {
    // const [ title, description, status ] = req.body
    const { title, description, status } = req.body;

    // if(title === null)
    // return res.json({message: "Title is required"})
    if (!title?.trim()) {
      return res.json({ message: "Title is required!" });
    }

    const todo = await Todo.create({
      // title: title,
      // description: discription,
      // status: "pending"
      title: title.trim(),
      description: description?.trim() || "",
      status: status,
    });

    res.status(201).json(todo);
  } catch (error) {
    // console.error("AddTodo error:", error);
    res.status(400).json({ message: error.message });
  }
};

export const getTodoItems = async (req, res) => {
  try {
    // const {} status, search } = req.body
    const { status, search } = req.query;
    // let query = "";
    let query = {};

    if (status && status.trim() !== "") {
      query.status = status;
    }

    // if (search) {
    //   return query.title = { $regex: search, $options: "i" };
    // }
    // search filter
    if (search && search.trim() !== "") {
      query.title = {
        $regex: search.trim(),
        $options: "i",
      };
    }

    const todos = await Todo.find(query).sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    // console.error("getTodoItems error:", error);
    res.status(400).json({ message: error.message });
  }
};

export const getTodoById = async (req, res) => {
  try {
    // const todo = Todo.findById(req.body) 
    const todo = await Todo.findById(req.params.id)

    if (!todo) {
      return res.json({ message: "Todo not found" });
    }

    res.json(todo);
  } catch (error) {
    if (error) {
      // console.log("Todo Id error", error)
      return res.json({ message: "Invalid todo ID" });
    }
    res.status(400).json({ message: "Something went wrong" });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    // const todo = await Todo.findByIdAndUpdate(req.params.id
    // title: title, description: description, status: status)
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title: title?.trim(), description: description?.trim(), status },
      { new: true, runValidators: true },
    );
    
    if (!todo) {
      return res.json({ message: "Todo not found" });
    }

    res.json(todo);
  } catch (error) {
    if (error) {
      // console.log("Update Error", error)
      return res.json({ message: "Invalid todo ID" });
    }
    res.status(400).json({ message: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    // const todo = await Todo.findByIdAndUpdate(req.params.id)
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) {
      return res.json({ message: "Todo not found" });
    }
    res.json({ message: "Todo deleted successfully!" })
  } catch (error) {
    if (error) {
      // console.log("delete error", error)
      return res.json({ message: "Invalid todo ID" });
    }
    res.status(500).json({ message: "Delete failed" })
  }
};
