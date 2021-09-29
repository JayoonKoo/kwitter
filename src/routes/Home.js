import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import Kweet from "components/Kweet";

const Home = ({ firestore, userObj }) => {
  const [content, setContent] = useState("");
  const [kweets, setKweets] = useState([]);

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
    await dbService.addDoc(dbService.collection(firestore, "kweet"), {
      content,
      createdAt: dbService.serverTimestamp(),
      createrId: userObj.uid,
    });
    setContent("");
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          value={content}
          type="text"
          onChange={onChange}
          placeholder="트윗을 적어 주세요."
          maxLength={120}
        />
        <input type="submit" value="tweet" />
      </form>

      <ul>
        {kweets.map((kweet) => (
          <Kweet
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
