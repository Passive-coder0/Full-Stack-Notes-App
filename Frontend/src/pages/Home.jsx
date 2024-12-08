import { MdAdd } from "react-icons/md";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import AddEditNotes from "../components/AddEditNotes";
import { useState } from "react";
import Modal from "react-modal"

function Home() {
  const [openAddedEditModal, setopenAddedEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  return (
    <>
      <Navbar></Navbar>

      <div className="container mx-auto">
        <div className=" grid grid-cols-3 gap-4 mt-8">
          <NoteCard
            title="Meeting on 7th April"
            date="3rd apr 2024"
            content="Meeting on 7th april with friends and teamates bro."
            tags="#Meeting"
            isPinned={true}
            onEdit={() => {}}
            onDelete={() => {}}
            onPinNote={() => {}}
          ></NoteCard>
        </div>
      </div>
      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
        onClick={() => {
          setopenAddedEditModal({isShown:true, type:"add", data:null});
        }}
      >
        <MdAdd className="text-3xl text-white"></MdAdd>
      </button>

      <Modal
        isOpen={openAddedEditModal.isShown}
        onRequestCloser={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel =""
        className = "w-2/5 max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditNotes></AddEditNotes>
      </Modal>
    </>
  );
}

export default Home;
