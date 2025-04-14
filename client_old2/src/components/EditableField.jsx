// src/components/EditableField.jsx
import { useState } from "react";

const EditableField = ({ label, value, field, onSave }) => {
  const [editing, setEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value || "");

  const handleSave = () => {
    setEditing(false);
    if (tempValue !== value) {
      onSave({ [field]: tempValue });
    }
  };

  return (
    <div className="mb-2 text-sm text-gray-800">
      <strong>{label}:</strong>{" "}
      {editing ? (
        <input
          className="border px-2 py-1 text-sm rounded w-full mt-1"
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          onBlur={handleSave}
          autoFocus
        />
      ) : (
        <>
          <span>{value || "Not set"}</span>{" "}
          <button
            className="ml-2 text-rose-500 text-xs"
            onClick={() => setEditing(true)}
          >
            🖉
          </button>
        </>
      )}
    </div>
  );
};

export default EditableField;
