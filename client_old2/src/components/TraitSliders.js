const TraitSliders = ({ traits }) => {
    return (
      <div className="space-y-4 bg-pink-50 p-4 rounded-lg shadow">
        {Object.entries(traits).map(([trait, value]) => (
          <div key={trait}>
            <div className="flex justify-between text-sm font-medium">
              <span>{trait}</span>
              <span>{value}%</span>
            </div>
            <div className="w-full bg-pink-200 rounded-full h-2.5 mt-1">
              <div className="bg-mauve-400 h-2.5 rounded-full transition-all duration-500" style={{ width: `${value}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  