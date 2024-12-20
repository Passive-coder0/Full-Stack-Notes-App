import { MdOutlinePushPin, MdPushPin } from "react-icons/md";
import { MdCreate, MdDelete } from "react-icons/md";
import moment from "moment";

function NoteCard({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) {
  return (
    <div className="border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out">
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-sm font-medium">{title}</h6>
          <span className="text-xs text-slate-500">
            {moment(date).format("Do MMM YYYY")}
          </span>
        </div>
        <MdOutlinePushPin
          className={`icon-btn ${
            isPinned ? "text-cyan-700" : "text-slate-300"
          }`}
          onClick={onPinNote}
        />
      </div>
      {/* Will show max 60 characters of content */}
      <p className="text-xs text-slate-600 mt-2">{content?.slice(0, 60)}</p>

      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-slate-500">
          {tags.map((item, index) => {
            const colors = [
              "bg-red-100 text-red-700",
              "bg-blue-100 text-blue-700",
              "bg-green-100 text-green-700",
              "bg-yellow-100 text-yellow-700",
              "bg-purple-100 text-purple-700",
              "bg-pink-100 text-pink-700",
            ];
            const randomColor =
              colors[Math.floor(Math.random() * colors.length)];
            return (
              <span
                key={index}
                className={`px-2 py-1 rounded-full mr-1 ${randomColor}`}
              >
                #{item}
              </span>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <MdCreate
            className="icon-btn hover:text-green-600 cursor-pointer"
            onClick={onEdit}
          />
          <MdDelete
            className="icon-btn hover:text-red-500 cursor-pointer"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
