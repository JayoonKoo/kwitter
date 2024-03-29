import { dbService, storageService, storage } from "fbase";
import { useState } from "react";

const Kweet = ({ attachmentURL, kweet, isOwner, firestore}) => {
  const [editing, setEditing] = useState(false);
  const [updateKweet, setUpdateKweet] = useState(kweet.content);
	const {ref, deleteObject} = storageService;



  const onDeleteClick = async () => {
    if (window.confirm("삭제하시겠습니까?")) {
      await dbService.deleteDoc( dbService.doc(firestore, "kweet", `${kweet.id}`));
			await deleteObject(ref(storage, attachmentURL));
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
						{attachmentURL && <img src={attachmentURL} width="100" alt="kweet이미지"/>}
						{isOwner ? (
							<div>
								<button onClick={onDeleteClick}>삭제하기</button>
								<button onClick={updateClick}>수정하기</button>
							</div>
						) : null}
          </li>
        </>
      )}
    </>
  );
};

export default Kweet;
