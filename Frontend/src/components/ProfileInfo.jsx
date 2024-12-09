import { getInitials } from "../utils/helper";

function ProfileInfo({ onLogout }) {

  return (
    <div className="flex items-center gap-3">
      <div className=" w-12 h-12 flex items-center justify-center rounded-full text-slate-950 bg-slate-100">{getInitials("Mohamed Hamed")}</div>
      <div>
        <p className="text-sm font-medium">Mohamed Hamed</p>
        <button className="text-sm text-slate-700 underline hover:text-black" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfileInfo;
