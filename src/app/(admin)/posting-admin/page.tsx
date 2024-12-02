import React from "react";

const PostingAdmin = () => {
  return (
    <>
      <div>
        <div className="flex justify-between border-2 rounded-xl items-center mb-3 bg-white p-6 m-8">
          <div>
            <h1 className="text-2xl font-bold mb-2">Manajemen Posting</h1>
            <p>Desctiption</p>
          </div>
        </div>

        <div className='p-8'>
          <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
            <h2 className="text-xl font-bold mb-6">Posting</h2>
            <div className="h-[400px] w-full bg-gray-50 rounded-xl flex items-center justify-center">
              <p className="text-gray-500">Area untuk grafik posting</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostingAdmin;
