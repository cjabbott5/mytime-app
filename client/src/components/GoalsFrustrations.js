const GoalsFrustrations = ({ goals, frustrations }) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="bg-pink-50 rounded-lg p-4 shadow">
          <h3 className="font-semibold text-lg mb-2">🌱 Your Goals</h3>
          <ul className="list-disc ml-4 text-sm">
            {goals.map((goal, index) => <li key={index}>{goal}</li>)}
          </ul>
        </div>
        <div className="bg-pink-50 rounded-lg p-4 shadow">
          <h3 className="font-semibold text-lg mb-2">🌀 Your Frustrations</h3>
          <ul className="list-disc ml-4 text-sm">
            {frustrations.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
        </div>
      </div>
    );
  };
  