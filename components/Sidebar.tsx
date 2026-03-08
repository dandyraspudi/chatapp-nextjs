export default function Sidebar() {
  return (
    <div className="w-72 bg-gray-900 text-white">
      <h2 className="text-xl font-bold mb-4 flex items-center justify-center" style={{ height: "50px" }}>ChatsApp</h2>

      <div className="space-y-2">
        <div className="p-3 bg-gray-800 rounded-lg cursor-pointer flex items-center" style={{height: "30px", padding: "0 10px"}}>
          John Doe
        </div>

        <div className="p-3 hover:bg-gray-800 rounded-lg cursor-pointer flex items-center" style={{height: "30px", padding: "0 10px"}}>
          Sarah
        </div>
      </div>
    </div>
  );
}
