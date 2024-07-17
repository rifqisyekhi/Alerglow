import React, { useState } from "react";
import axios from "axios";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
    setSelectedFile(null);
    setPreviewUrl("");
    setPrediction(null);
    setError("");
    setLoading(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePredict = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const result = response.data.result;
      setPrediction(result);
    } catch (error) {
      console.error("Error predicting skin condition:", error);
      setError("Error predicting skin condition. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen home flex items-center px-5 lg:px-[72px]">
      <div className="max-w-[450px] md:max-w-[500px] lg:max-w-[600px] flex flex-col gap-7">
        <h1 className="text-[30px] md:text-[40px] lg:text-[50px] font-bold">
          AlerGlow: Free Skin Allergy Check
        </h1>
        <p className="text-text text-[14px] lg:text-[18px]">
          Alerglow is an innovative app that uses Convolutional Neural Network
          (CNN) algorithm to accurately detect skin allergies. With Alerglow,
          users can easily overcome the difficulty in identifying skin allergy
          symptoms that are often confusing. The app provides an effective and
          quick solution to know the type of skin allergy experienced, helping
          users in taking better care of their skin.
        </p>
        <div>
          <button
            className="py-2 px-8 bg-blue rounded-full text-white"
            onClick={handleModalToggle}
          >
            Try Now
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-3xl mx-4 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Upload Photo
            </h2>
            {!previewUrl && (
              <label className="block mb-4">
                <span className="sr-only">Choose File</span>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 border-gray-300 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        aria-hidden="true"
                        className="w-8 h-8 mb-3 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16V6a1 1 0 011-1h4m6 2v10a1 1 0 01-1 1h-6m0-4h8m-8 0v4m-8 4h8m-4 4H7m4-4v4"
                        ></path>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              </label>
            )}
            {previewUrl && (
              <div className="mb-4 flex justify-center">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-3/2 h-auto rounded-lg"
                />
              </div>
            )}
            <div className="flex gap-4 pt-6 justify-center">
              {!loading && !prediction && (
                <>
                  <button
                    className="py-2 px-8 bg-blue text-white rounded-full hover:bg-blue transition-colors duration-300"
                    onClick={handlePredict}
                  >
                    Predict
                  </button>
                  <button
                    className="py-2 px-8 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-300"
                    onClick={handleModalToggle}
                  >
                    Close
                  </button>
                </>
              )}
            </div>
            {loading && <div className="loader"></div>}
            {error && (
              <div className="mt-4 text-center text-red-500">
                <p>{error}</p>
              </div>
            )}
            {prediction && (
              <div
                className="mt-4 p-4 bg-gray-200 rounded-lg"
                dangerouslySetInnerHTML={{ __html: prediction }}
              />
            )}
            {prediction && (
              <div className="flex justify-center mt-4">
                <button
                  className="py-2 px-8 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-300"
                  onClick={handleModalToggle}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
