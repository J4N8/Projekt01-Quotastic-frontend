import {FC, useState} from "react";
import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";
import useMediaQuery from "hooks/useMediaQuery";
import {useMutation, useQuery} from "react-query";
import * as API from "api/Api";
import {StatusCode} from "constants/errorConstants";
import {QuoteType} from "models/quote";
import Quote from "../../../components/quote/Quote";
import Layout from "../../../components/ui/Layout";

const DashboardQuotes: FC = () => {
	const [apiError, setApiError] = useState("");
	const [showError, setShowError] = useState(false);
	const {isMobile} = useMediaQuery(768);
	const [pageNumber, setPageNumber] = useState(1);

	const {data, isLoading, refetch} = useQuery(["fetchQuotes", pageNumber], () => API.fetchQuotes(pageNumber), {
		keepPreviousData: true,
		refetchOnWindowFocus: false,
	});

	const {mutate} = useMutation((id: string) => API.deleteQuote(id), {
		onSuccess: (response) => {
			if (response.data?.statusCode === StatusCode.BAD_REQUEST) {
				setApiError(response.data.message);
				setShowError(true);
			} else if (response.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR) {
				setApiError(response.data.message);
				setShowError(true);
			} else {
				refetch();
			}
		},
		onError: () => {
			setApiError("Something went wrong while deleting a quote.");
			setShowError(true);
		},
	});

	const handleDelete = (id: string) => {
		mutate(id);
	};

	return (
		<Layout>
			<div className="mb-4">
				<h1 className="mb-4">Quotes</h1>
				{/*<Link className="btn btn-dark" to={`${routes.QUOTES}/add`}>*/}
				{/*	Add*/}
				{/*</Link>*/}
			</div>
			{isLoading ? (
				<div>Loading...</div>
			) : (
				<>
					{data?.data.data.length === 0 ? (
						<p>No quotes found.</p>
					) : (
						<>
							<div className="d-flex">
								{data?.data.data.map((item: QuoteType, index: number) => (
									<div className="quote">
										<Quote quoteValues={item} key={index} />
									</div>
								))}
							</div>
						</>
					)}
				</>
			)}
			{showError && (
				<ToastContainer className="p-3" position="top-end">
					<Toast onClose={() => setShowError(false)} show={showError}>
						<Toast.Header>
							<strong className="me-auto text-danger">Error</strong>
						</Toast.Header>
						<Toast.Body className="text-danger bg-light">{apiError}</Toast.Body>
					</Toast>
				</ToastContainer>
			)}
		</Layout>
	);
};

export default DashboardQuotes;
