import React, { useEffect, useState } from "react";
import {dbService} from 'fbase';

const Home = ({firestore}) => {
	const [content, setContent] = useState("");
	const [kweets, setKweets] = useState([]);

  const onChange = (event) => {
		const {target: {value}} = event;
		setContent(value);
	};

	const getKweets = async () => {
		const dbKweets = await dbService.getDocs(dbService.collection(firestore, "kweet"));
		dbKweets.forEach((doc) => {
			const newDoc = {
				...doc.data(),
				id: doc.id,
			}
			setKweets((prev) => [newDoc, ...prev])
		});
	}

	useEffect(() => {
		getKweets();
	}, []);

	const onSubmit = async (event) => {
		event.preventDefault();
		await dbService.addDoc(dbService.collection(firestore, "kweet"), {
			content,
			createdAt: dbService.serverTimestamp(),
		})
		setContent("");
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
        />
        <input type="submit" value="tweet" />
      </form>

			<ul>
				{kweets.map((kweet) => (
					<li key={kweet.id}>
						<h4>{kweet.content}</h4>
					</li>
				))}
			</ul>
    </>
  );
};
export default Home;
