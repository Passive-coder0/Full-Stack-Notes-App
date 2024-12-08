import { useState } from "react";
import TagInput from "./Input/TagInput";
import { MdClose } from "react-icons/md";

function AddEditNotes({onClose, noteData, type}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);

  const [error, setError] = useState(null)

  // Add Note
  const addNewNote = async () => {
    
  }

   // Edit Note
   const editNote = async () => {
    
   }

  const handleAddNote = () => {
    if (!title) {
      setError("Please enter the title");
      return;
    }
    if (!content) {
      setError("Please enter the content");
      return;
    }
    
    setError("")

    if (type === 'edit') {
      EditNote()
    }
    else {
      addNewNote()
    }
  }

  return (
    <div className="relative">

      <button className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50" onClick={onClose}>
        <MdClose className="text-xl text-slate-400"></MdClose>
      </button>

      <div className=" flex flex-col gap-2">
        <label className="input-label">TITLE</label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="Go To Gym At 5"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">CONTENT</label>
        <textarea
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
          placeholder="Content"
          rows={10}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        ></textarea>
      </div>
      <div className="mt-3">
        <label className="input-label">TAGS</label>
        <TagInput tags={tags} setTags={setTags}></TagInput>
      </div>

          {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

      <button className="btn-primary font-medium mt-5 p-3 " onClick={handleAddNote}>
        ADD
      </button>
    </div>
  );
}

export default AddEditNotes;
