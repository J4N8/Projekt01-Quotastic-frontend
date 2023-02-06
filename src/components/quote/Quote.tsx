import {FC, useState} from "react";
import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";
import {QuoteType} from "models/quote";
import Button from "react-bootstrap/Button";
import {UserType} from "../../models/auth";

interface Props {
	quoteValues: QuoteType;
}

const Quote: FC<Props> = ({quoteValues}) => {
	const [apiError, setApiError] = useState("");
	const [showError, setShowError] = useState(false);

	return (
		<>
			<div className="quote border border-primary">
				<div className="d-flex">
					<div className="votes pe-0">
						<Button className="btn-vote" size="sm">
							^
						</Button>
						<p>{quoteValues.score}</p>
						<Button className="btn-vote" size="sm">
							v
						</Button>
					</div>
					<p>{quoteValues.content}</p>
				</div>
				<div className="author d-flex">
					<img
						className="avatar"
						src={`${process.env.REACT_APP_API_URL}/files/${quoteValues.author.avatar}`}
						width={30}
					/>
					<p className="m-1">{quoteValues.author.first_name + " " + quoteValues.author.last_name}</p>
				</div>
			</div>

			{
				// <Link
				// 	className={
				// 		isMobile
				// 			? "btn btn-warning btn-sm me-2 mb-2"
				// 			: "btn btn-warning btn-sm me-2"
				// 	}
				// 	state={{				// 	to={`${routes.DASHBOARD_PREFIX}/products/edit`}
				// 		...item,
				// 	}}
				// >
				// 	Edit
				// </Link>
				// <Button
				// className={isMobile ? "btn-danger mb-2" : "btn-danger"}
				// size="sm"
				// onClick={() => handleDelete(item.id)}
				// >
				// Delete
				// </Button>
			}

			{showError && (
				<ToastContainer className="p-3" position="top-end">
					<Toast onClose={() => setShowError(false)} show={showError}>
						<Toast.Header>
							<strong className="me-suto text-danger">Error</strong>
						</Toast.Header>
						<Toast.Body className="text-danger bg-light">{apiError}</Toast.Body>
					</Toast>
				</ToastContainer>
			)}
		</>
	);
};
export default Quote;
