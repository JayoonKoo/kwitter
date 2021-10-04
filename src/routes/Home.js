import React, { useEffect, useRef, useState } from "react";
import { dbService, storageService, storage } from "fbase";
import { v4 as uuidv4 } from "uuid";
import Kweet from "components/Kweet";
import { collectionGroup } from "@firebase/firestore";

const Home = ({ firestore, userObj }) => {
  const [content, setContent] = useState("");
  const [kweets, setKweets] = useState([]);
  const [attachment, setAttachment] = useState("");
  const { ref, uploadString, getDownloadURL } = storageService;
	const imageInputRef = useRef(null);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setContent(value);
  };

  useEffect(() => {
    dbService.onSnapshot(
      dbService.collection(firestore, "kweet"),
      (snapshot) => {
        const kweetObj = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setKweets(kweetObj);
      }
    );
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentURL = "";
    if (attachment !== "") {
      const attachmentRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
      await uploadString(attachmentRef, attachment, "data_url");
      attachmentURL = await getDownloadURL(attachmentRef);
    }
    const kweet = {
      attachmentURL,
      content,
      createdAt: dbService.serverTimestamp(),
      createrId: userObj.uid,
    };
    await dbService.addDoc(dbService.collection(firestore, "kweet"), kweet);
		imageInputRef.current.value = "";
    setContent("");
    setAttachment(null);
  };

  const onImageInputChange = (event) => {
    const {
      target: { files },
    } = event;
    const file = files[0];
    let reader = new FileReader();

    reader.addEventListener("load", (event) => {
      const {
        target: { result },
      } = event;
      setAttachment(result);
    });

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const onClearAttachment = () => {
		setAttachment(null);
		imageInputRef.current.value = '';
	}

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          value={content}
          type="text"
          onChange={onChange}
          placeholder="트윗을 적어 주세요."
          maxLength={120}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={onImageInputChange}
					ref={imageInputRef}
        />
        <input type="submit" value="tweet" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" alt="profile" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
      </form>
      <ul>
        {kweets.map((kweet) => (
          <Kweet
            attachmentURL={kweet.attachmentURL}
            key={kweet.id}
            kweet={kweet}
            isOwner={kweet.createrId === userObj.uid}
            firestore={firestore}
          />
        ))}
      </ul>
    </>
  );
};
export default Home;
