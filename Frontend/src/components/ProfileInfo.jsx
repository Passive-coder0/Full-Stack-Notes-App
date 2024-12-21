import { getInitials } from "../utils/helper";

function ProfileInfo({ userInfo, onLogout }) {
  // Loading handling
  
  if (!userInfo || !userInfo.fullName) {
    return <div className="dark:text-white">Loading...</div>;
  }
  console.log("User is", userInfo);

  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 bg-slate-100 dark:bg-slate-800 dark:text-white">
        {getInitials(userInfo.fullName)}
      </div>
      <div className="flex flex-col">
        <p className="text-sm font-medium dark:text-white">{userInfo.fullName}</p>
        <button className="text-sm dark:text-slate-300 hover:dark:text-white text-slate-700 underline hover:text-black" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfileInfo;
