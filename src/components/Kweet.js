import { dbService } from "fbase";
import { useState } from "react";

const Kweet = ({ kweet, isOwner, firestore }) => {
  const [editing, setEditing] = useState(false);
  const [updateKweet, setUpdateKweet] = useState(kweet.content);
  const onDeleteClick = async () => {
    if (window.confirm("삭제하시겠습니까?")) {
      await dbService.deleteDoc(
        dbService.doc(firestore, "kweet", `${kweet.id}`)
      );
    }
  };

  const updateInputChnage = (event) => {
    const {
      target: { value },
    } = event;
    setUpdateKweet(value);
  };

  const updateClick = () => {
    setEditing((prev) => !prev);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.updateDoc(dbService.doc(firestore, "kweet", `${kweet.id}`), {
			content: updateKweet,
		});
		setEditing(prev=> !prev);
  };

  return (
    <>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="트윗을 적으세요"
              required
              value={updateKweet}
              onChange={updateInputChnage}
            />
            <input type="submit" value="수정하기" />
          </form>
          <button onClick={updateClick}>취소하기</button>
        </>
      ) : (
        <>
          <li>
            <h4>{updateKweet}</h4>
          </li>
          {isOwner ? (
            <div>
              <button onClick={onDeleteClick}>삭제하기</button>
              <button onClick={updateClick}>수정하기</button>
            </div>
          ) : null}
        </>
      )}
    </>
  );
};

export default Kweet;
