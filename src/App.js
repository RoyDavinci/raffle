import { useState, useEffect } from "react";
import "./App.css";
import logo from "./images/f41b7507351e551759d8b744477c2792.jpg";
import videos from "./images/original-041903bb23a5c79d094d4bccc1411425.mp4";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

function App() {
	const [number, setNumber] = useState("");
	const [first, setFirst] = useState(true);
	const [second, setSecond] = useState(false);
	const [third, setThird] = useState(false);
	const [winner, SetWinner] = useState("");
	const [winners, setWinners] = useState([]);
	const [numberOFWinners, setNumberOfWinners] = useState("");
	const { width, height } = useWindowSize();

	const handleDone = (e) => {
		e.preventDefault();
		const data = localStorage.getItem("data");
		if (data === null || !data) {
			alert("please add a number");
			return;
		}
		const item = JSON.parse(data);
		if (item.length < Number(numberOFWinners)) {
			alert("number of winners cannot be greater than numbers added");
			return;
		}
		setFirst(false);
		setSecond(true);
		// console.log(item, data);
		setTimeout(() => {
			if (numberOFWinners) {
				console.log("first");
				for (let i = 0; i < Number(numberOFWinners); i++) {
					const randomElement = item[Math.floor(Math.random() * item.length)];

					setWinners((prev) => [...prev, randomElement]);
				}
			} else {
				const randomElement = item[Math.floor(Math.random() * item.length)];
				SetWinner(randomElement);
			}

			localStorage.clear();
			setSecond(false);
			setThird(true);
		}, 10000);
	};

	const handleChange = (e) => {
		e.preventDefault();
		setFirst(true);
		setThird(false);
		localStorage.clear();
	};

	const handleAdd = (e) => {
		e.preventDefault();
		const data = localStorage.getItem("data");
		if (!number) {
			alert("please add a number");
			return;
		}
		if (data === null || !data) {
			const newData = [];
			newData.push(number);
			localStorage.setItem("data", JSON.stringify(newData));
			setNumber("");
		} else {
			const item = JSON.parse(data);
			item.push(number);
			localStorage.setItem("data", JSON.stringify(item));
			setNumber("");
		}
	};

	return (
		<>
			{first && (
				<div className='flex flex-col justify-center items-center h-screen px-8'>
					<div>
						<img src={logo} alt='' className='lg:w-[40rem] lg:h-[30rem]' />
						<form action=''>
							<div className='flex justify-between items-center my-4'>
								<input
									type='text'
									placeholder='Input Numbers for a Draw'
									className=' px-6 py-2 w-full text-lg border-2 border-black rounded-md mx-2'
									value={number}
									onChange={(e) => setNumber(e.target.value)}
								/>
								<input
									type='text'
									placeholder='Number of winners'
									className=' px-6 py-2 w-full text-lg border-2 border-black rounded-md mx-2'
									value={numberOFWinners}
									onChange={(e) => setNumberOfWinners(e.target.value)}
								/>
							</div>
							<div className='flex justify-between items-center my-4'>
								<button
									onClick={handleAdd}
									className='w-full border mx-2 bg-green-500 text-white py-2 px-4 rounded-md'
								>
									Add
								</button>
								<button
									onClick={handleDone}
									className='w-full border mx-2 bg-[#18A2B8] text-white py-2 px-4 rounded-md'
								>
									Done
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
			{second && (
				<div
					className={`h-screen  lg:flex lg:justify-center lg:items-center lg:flex-col`}
				>
					<video
						className='videos'
						src={videos}
						autoPlay
						loop
						playsInline
						controls={false}
					></video>
				</div>
			)}
			{third && (
				<div>
					<Confetti width={width} height={height} />
					<div className='flex justify-center items-center flex-col h-screen'>
						<h1 className='congrats'>CONGRATULATIONS</h1>
						{winners.length > 0 ? (
							winners.map((item) => {
								return (
									<h1 className='font-extrabold text-2xl underline'>{item}</h1>
								);
							})
						) : (
							<h1 className='font-extrabold text-5xl underline'>{winner}</h1>
						)}
						<h1 className='font-extrabold text-2xl '>
							{" "}
							You Have Won A Free Gift Courtesy of Linda Obieze
						</h1>
						<button
							onClick={handleChange}
							className='px-4 py-2 rounded-md text-white bg-green-400'
						>
							Continue
						</button>
					</div>
				</div>
			)}
		</>
	);
}

export default App;
