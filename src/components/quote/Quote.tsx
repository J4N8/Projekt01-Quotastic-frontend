import {FC, useState} from "react";
import {QuoteType} from "models/quote";
import Button from "react-bootstrap/Button";
import {userStorage} from "../../utils/localStorage";
import * as API from "api/Api";
import UpdateQuoteForm from "./UpdateQuoteForm";
import DeleteQuoteConfirmation from "./DeleteQuoteConfirmation";

interface Props {
	quoteValues: QuoteType;
}

const Quote: FC<Props> = ({quoteValues}) => {
	const [shownEdit, setShownEdit] = useState(false);
	const [shownDelete, setShownDelete] = useState(false);

	return (
		<>
			<div className="quote d-flex border-orange rounded-3">
				<div className="votes p-2 m-2 text-center">
					<Button
						className="btn-vote bi bi-chevron-up btn-none"
						size="sm"
						onClick={() => {
							API.upvoteQuote(quoteValues.id).then(() => window.location.reload());
						}}
					></Button>
					<p className="m-0 p-0">{quoteValues.score}</p>
					<Button
						className="btn-vote bi bi-chevron-down btn-none"
						size="sm"
						onClick={() => {
							API.downvoteQuote(quoteValues.id).then(() => window.location.reload());
						}}
					></Button>
				</div>
				<div>
					<p className="text-break">{quoteValues.content}</p>
					<div className="author d-flex">
						<img
							className="avatar rounded-circle"
							src={`${process.env.REACT_APP_API_URL}/files/${quoteValues.author?.avatar}`}
							width={30}
							alt={quoteValues.author?.first_name + " " + quoteValues.author?.last_name}
						/>
						<p className="m-1">{quoteValues.author?.first_name + " " + quoteValues.author?.last_name}</p>
					</div>
				</div>
				{quoteValues.author.id === userStorage.getUser()?.id ? (
					<div className="quote_buttons p-2">
						<Button
							className="btn-edit bi bi-gear d-block btn-none"
							size="sm"
							onClick={() => {
								setShownEdit(true);
							}}
						/>
						<Button
							className="btn-delete bi bi-x-lg d-block btn-none"
							size="sm"
							onClick={() => {
								setShownDelete(true);
							}}
						/>
					</div>
				) : (
					<></>
				)}

				<UpdateQuoteForm shown={shownEdit} defaultValues={quoteValues} />
				<DeleteQuoteConfirmation shown={shownDelete} defaultValues={quoteValues} />
			</div>
		</>
	);
};
export default Quote;
