import { MdAdd } from "react-icons/md";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import AddEditNotes from "../components/AddEditNotes";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios";
import Toast from "../components/Toast";

function Notes() {
  const [openAddedEditModal, setOpenAddedEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "",
  });

  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddedEditModal({
      isShown: true,
      type: "edit",
      data: noteDetails,
    });
  };

  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message,
      type,
    });
    setTimeout(() => {
      setShowToastMsg({ isShown: false, message: "", type: "" });
    }, 3000); // Auto-dismiss toast after 3 seconds
  };

  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: "",
    });
  };

  // Get User Info and sends to Login page if no user
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      } else {
        console.error("Error fetching user info:", error);
      }
    }
  };

  //Get all notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");

      if (response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("Unexpected error occured. Please try again");
    }
  };

  // Delete Note is outside the AddEditNotes
  const deleteNote = async (data) => {
    const noteId = data._id;

    try {
      const response = await axiosInstance.delete(`delete-note/${noteId}`);

      if (!response.data.error) {
        showToastMessage("Note Deleted Successfully", "delete");
        getAllNotes();
      }
    } catch (error) {
      if (error.response.data.message) {
        console.log("Unexpected error occured. Please try again.");
      }
    }
  };

  // Pinning a Note
  const updateIsPinned = async (data) => {
    const noteId = data._id;

    try {
      const response = await axiosInstance.put(
        `update-note-pinned/${noteId}`,
        {
          // This toggles pin On or Off
          isPinned: !data.isPinned,
        }
      );

      if (response.data.note) {
        if (!data.isPinned) {
          showToastMessage(`Note Pinned Successfully`);
          getAllNotes();
        } else {
          showToastMessage(`Note Unpinned Successfully`);
          getAllNotes();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Dealing with async and side effects
  useEffect(() => {
    getUserInfo();
    getAllNotes();
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo}></Navbar>

      <div className="container mx-auto md:px-10 lg:mx-0">
        {/* Show a message if there are no notes */}
        {allNotes.length === 0 ? (
          <div className="flex justify-center items-center text-center text-slate-400 text-3xl mt-64">
            Click on the blue button to add a note
          </div>
        ) : (
          <div className="flex flex-col sm:grid sm:grid-cols-3 gap-4 mt-8">
            {allNotes.map((item, index) => (
              <NoteCard
                key={item._id}
                title={item.title}
                date={item.createdOn}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() => handleEdit(item)}
                onDelete={() => deleteNote(item)}
                onPinNote={() => updateIsPinned(item)}
              />
            ))}
          </div>
        )}
      </div>

      {/*To show and hide the Edit modal */}
      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl dark:bg-blue-950 bg-primary hover:bg-blue-600 dark:hover:bg-blue-900 absolute right-10 bottom-10"
        onClick={() => {
          setOpenAddedEditModal({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd className="text-3xl text-white"></MdAdd>
      </button>

      <Modal
        isOpen={openAddedEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="w-80 md:w-2/5 max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-auto"
      >
        <AddEditNotes
          type={openAddedEditModal.type}
          noteData={openAddedEditModal.data}
          onClose={() => {
            setOpenAddedEditModal({ isShown: false, type: "add", data: null });
          }}
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage}
        ></AddEditNotes>
      </Modal>

      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      ></Toast>
    </>
  );
}

export default Notes;
