import {FC, useState} from "react";
import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";
import useMediaQuery from "hooks/useMediaQuery";
import {useMutation, useQuery} from "react-query";
import * as API from "api/Api";
import {StatusCode} from "constants/errorConstants";
import {QuoteType} from "models/quote";
import Quote from "../../components/quote/Quote";
import Layout from "../../components/ui/Layout";

const DashboardQuotes: FC = () => {
	const [apiError, setApiError] = useState("");
	const [showError, setShowError] = useState(false);
	const {isMobile} = useMediaQuery(768);
	const [pageNumber] = useState(1);

	const {data, isLoading} = useQuery(["fetchQuotes", pageNumber], () => API.fetchQuotes(pageNumber), {
		keepPreviousData: true,
		refetchOnWindowFocus: false,
	});
	return (
		<Layout>
			<div className="mb-4">
				<h1 className="mb-4">Quotes</h1>
			</div>
			{isLoading ? (
				<div>Loading...</div>
			) : (
				<>
					{data?.data.data.length === 0 ? (
						<p>No quotes found.</p>
					) : (
						<>
							<div className="container">
								<div className="row row-cols-4">
									{data?.data.data.map((item: QuoteType, index: number) => (
										<div className="p-2 border-1 rounded-2 border-orange m-1">
											<Quote quoteValues={item} key={index} />
										</div>
									))}
								</div>
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