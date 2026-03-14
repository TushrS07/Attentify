import React, { useState } from 'react'

function Images1() {
  const [loading, setLoading] = useState(false);
  const handelUpload = async (event) => {
    const file = event.target.files[0];
    console.log(file);

    if(!file) return;
    setLoading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "Attendify");
    data.append("cloud_name", "dbptvjlh8");


    const res = await fetch("https://api.cloudinary.com/v1_1/dbptvjlh8/image/upload", {
        method:"POST",
        body: data,
    })

    const uploadImageURL = await res.json();
    console.log(uploadImageURL.url);
    setLoading(false);
    
}

  return (
    <div className="fileupload mt-44">
        <div className="upload-container">
            <div className="upload-icon">
                {
                    loading ? "Uploading..." : "Hello Hi"
                }
            </div>
            <input type="file"  onChange={handelUpload}/>
        </div>
    </div>
  )
}

export default Images1;