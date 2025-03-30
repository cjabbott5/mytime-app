import React, { useState } from "react";

const Step5_Details = ({ data, onNext, onBack, updateData }) => {
  const [text, setText] = useState(data.content || "");
  const [image, setImage] = useState(data.media || null);
  const [preview, setPreview] = useState(data.media ? URL.createObjectURL(data.media) : null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleContinue = () => {
    updateData({ content: text, media: image });
    onNext();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-pink-700 text-center">
        Tell us about the memory
      </h2>
      <p className="text-center text-gray-600 max-w-md mx-auto">
        You can write as little or as much as you’d like. This is your space.
      </p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Describe what happened, how it felt, anything you remember…"
        rows={6}
        className="w-full border border-gray-300 rounded-xl shadow-sm p-4 focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
      />

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Upload a photo (optional)
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
          file:rounded-xl file:border-0 file:text-sm file:font-semibold
          file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
        />

        {preview && (
          <div className="mt-2">
            <img
              src={preview}
              alt="Uploaded memory preview"
              className="rounded-xl border border-gray-200 shadow-sm max-h-64 object-cover"
            />
          </div>
        )}
      </div>

      <div className="text-center text-sm text-gray-500 mt-2">
        You can always come back to edit or add more later.
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={onBack}
          className="text-gray-600 border border-gray-300 px-4 py-2 rounded-xl hover:bg-gray-100 transition"
        >
          Back
        </button>
        <button
          onClick={handleContinue}
          className="bg-pink-500 text-white px-6 py-2 rounded-xl shadow-md hover:bg-pink-600 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step5_Details;
