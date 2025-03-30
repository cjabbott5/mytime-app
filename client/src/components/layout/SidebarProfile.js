export default function SidebarProfile({ user }) {
    return (
      <div className="bg-pink-100 p-6 rounded-lg shadow-lg">
        <img className="w-32 h-32 rounded-full mx-auto shadow-md" src={user.photoURL} alt="Profile" />
        <h2 className="text-xl text-center font-semibold mt-4">{user.name}</h2>
        <p className="text-center text-sm italic text-gray-600">{user.pronouns}</p>
        <div className="mt-4 space-y-2">
          <p><strong>Age:</strong> {user.age}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
          <p><strong>Cultural:</strong> {user.cultural}</p>
          <p><strong>Spirituality:</strong> {user.spirituality}</p>
          <p><strong>Location:</strong> {user.location}</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          {user.tags.map(tag => (
            <span key={tag} className="bg-mauve-300 text-white rounded-full px-3 py-1 text-xs">
              {tag}
            </span>
          ))}
        </div>
      </div>
    );
  }
  