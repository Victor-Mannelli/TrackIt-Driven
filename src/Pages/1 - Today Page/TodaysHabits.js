import { BsFillCheckSquareFill } from "react-icons/bs";
import styled from "styled-components";
import { useContext } from "react";
import axios from "axios";
import UserContext from "../../CreateContext";

export default function TodaysHabits({ props, getTodayHabits }) {
	const { loginInfo } = useContext(UserContext);
	
	function Checking() {
		if (!props.done) {
			axios
				.post(
					`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${props.id}/check`,
					{},
					{
						headers: {
							Authorization: `Bearer ${loginInfo.token}`,
						},
					}
				)
				.then(() => getTodayHabits());
		} else {
			axios
				.post(
					`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${props.id}/uncheck`,
					{},
					{
						headers: {
							Authorization: `Bearer ${loginInfo.token}`,
						},
					}
				)
				.then(() => getTodayHabits());
		}
	}
	return (
		<TodayHabit>
			<Description>
				<h1> {props.name} </h1>
				<p>
					{" "}
					Sequência atual: <span> {props.currentSequence} </span>{" "}
				</p>
				<p>
					{" "}
					Seu recorde: <span> {props.highestSequence} </span>{" "}
				</p>
			</Description>
			<CheckIcon onClick={() => Checking()} isDone={props.done} />
		</TodayHabit>
	);
}
const TodayHabit = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	height: 94px;
	padding: 18px;
	margin: 10px 0;
	background-color: white;
`;
const CheckIcon = styled(BsFillCheckSquareFill)`
	width: 70px;
	height: 70px;
	color: ${(props) => (props.isDone ? "#8FC549" : "#E7E7E7")};
	cursor: pointer;
`;
const Description = styled.div`
	display: flex;
	flex-direction: column;
	h1 {
		font-size: 20px;
		line-height: 25px;
		padding-bottom: 8px;
		color: #666666;
	}
	p {
		font-size: 13px;
		line-height: 16px;
		color: #666666;
	}
	span {
		color: #8fc549;
	}
`;
