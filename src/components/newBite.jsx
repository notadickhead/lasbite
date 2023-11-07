import {React, useState} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { db, storage } from '../firebase';
import { addDoc, doc, setDoc, collection } from 'firebase/firestore';
import { ref,  getDownloadURL, uploadBytes } from 'firebase/storage';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
   



  export default function AddBite() {

    const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [image, setImage] = useState(null);

  
  // add Bite
if (!currentUser) {
    navigate("/login");
}


    
async function addBite(e) {

    e.preventDefault();
    const type = e.target[0].value;
    const category = e.target[1].value;
    const name = e.target[2].value;
    const description = e.target[3].value;
    const location = e.target[4].value;
    const bestBefore = e.target[5].value;
    
  
    
    
    
   
    
    
    

        // Add a new document in collection "cities"
        const docRef = await addDoc(collection(db, "bites"), {
            status: "available",
            type: type,
            category: category,
            name: name,
            description: description,
            location: location,
            bestBefore: bestBefore,
            owner: currentUser,
            createdAt: new Date()

        });
        console.log("Document written with ID: ", docRef.id);
        console.log("Veges owned by: ", docRef.user);
        // Create the file metadata

  
        const filename = e.target[6].files[0].name;    
        const storageRef = ref(storage, `images/${filename}`);
        uploadBytes(storageRef, image).then((snapshot) => {
          console.log('Uploaded a blob or file!');
        });
        const downloadURL = await getDownloadURL(storageRef);
  console.log('File available at', downloadURL);

  await setDoc(doc(db, "bites", docRef.id), {imageUrl: downloadURL}, { merge: true });

  }
  
   const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
    
  };




    return (
        <div className="left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-[100]">
        <div className="bg-white h-[39rem] overflow-auto p-6 w-[30rem] rounded-lg shadow-md" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={addBite}>
                <div className="mb-4">
                    <label htmlFor="category" className="block text-sm font-semibold text-gray-600">
                        Are you sharing or requesting a bite?
                    </label>
                    <select
                        id="category"
                        name="category"
                        className="w-full border rounded-lg p-2"
                    >
                        <option value="request">Share</option>
                        <option value="request">Request</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="type" className="block text-sm font-semibold text-gray-600">
                        What is your bite's category
                    </label>
                    <select
                        id="type"
                        name="type"
                        className="w-full border rounded-lg p-2"
                    >
                        <option value="vegetables">Vegetables</option>
                        <option value="nuts">Nuts&Seeds</option>
                        <option value="proteins">Proteins</option>
                        <option value="ready">Ready Meals</option>
                        <option value="spices">Spices</option>
                        <option value="dairy">Dairy Products</option>
                        <option value="frozen">Frozen Products</option>
                        <option value="vegan">Vegeterian and Vegan</option>
                        <option value="fruits">Fruits</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-600">
                        Enter Your Bite's Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full border rounded-lg p-2"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-semibold text-gray-600">
                        Describe Your Bite
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        className="w-full h-32 border rounded-lg p-2"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="location" className="block text-sm font-semibold text-gray-600">
                        What is your location?
                    </label>
                    <select
                        id="location"
                        name="location"
                        className="w-full border rounded-lg p-2"
                    >
                        <option value="location1">Kigali, Rwanda</option>
                        <option value="location2">KG 47 House 26</option>
                        <option value="location2">Remera, Kigali, Rwanda</option>
                    </select>
                </div>
                <div className="mb-4">
                <label htmlFor="bestBefore">
        Best Before date
                </label>
                             <input type="datetime-local" id="bestBefore" name="bestBefore" className="w-full border rounded-lg p-2" />


                </div>
               
            <div className="mb-4">
                    <label htmlFor="images" className="block text-sm font-semibold text-gray-600">
                        Upload a photo of your bite
                    </label>
                    <input onChange={handleChange}
                        type="file"
                        id="images"
                        name="images"
                        className="w-full border rounded-lg p-2"
                    />

                </div>
                <label htmlFor="images" className="block text-center text-sm mb-6 font-semibold text-gray-600">
                        or
                </label>
                <div className='flex flex-col justify-center items-center'>
                  <button type="button" className="bg-green-800 w-full text-white mb-2 px-4 py-2 rounded-lg">
                      Open Camera
                  </button>
                  <button type="submit" className="mt-4 bg-blue-500 w-full text-white mb-6 px-4 py-2 rounded-lg">
                      Submit
                  </button>
                </div>
            </form>

        </div>
    </div>

);
};
