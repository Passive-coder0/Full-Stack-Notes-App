import { useState } from "react";
import TagInput from "./Input/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../utils/axios";

function AddEditNotes({onClose, noteData, type, getAllNotes, showToastMessage}) {
  //Empty for adding, value for editing
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);

  const [error, setError] = useState(null)

  // Add Note
  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("add-note", {
        title,
        content,
        tags,
      });

      if (response.data.note) {
        showToastMessage("Note Added Successfully")
        getAllNotes()
        onClose()
      }
    } catch (error) {
      if (error.response.data.message) {
        setError(error.response.data.message);
      }
    }
  }

   // Edit Note
   const editNote = async () => {
    const noteId = noteData._id;

    try {
      const response = await axiosInstance.put(`edit-note/${noteId}`, {
        title,
        content,
        tags,
      });

      if (response.data.note) {
        showToastMessage("Note Updated Successfully")
        getAllNotes()
        onClose()
      }
    } catch (error) {
      if (error.response.data.message) {
        setError(error.response.data.message);
      }
    }
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
      editNote()
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
          className="text-lg text-slate-950 border p-1.5 rounded-md"
          placeholder="Add a title for your note"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">CONTENT</label>
        <textarea
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded-md"
          placeholder="Write about your note here....."
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
        {type === 'edit' ? 'UPDATE' : 'ADD'}
      </button>
    </div>
  );
}

export default AddEditNotes;
