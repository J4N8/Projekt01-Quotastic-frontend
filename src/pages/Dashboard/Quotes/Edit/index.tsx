import CreateQuoteForm from "components/quote/CreateQuoteForm";
import DashboardLayout from "components/ui/DashboardLayout";
import {FC} from "react";
import {useLocation} from "react-router-dom";

const DashboardProductsEdit: FC = () => {
	const location = useLocation();

	return (
		<DashboardLayout>
			<h1 className="mb-4 text-center">Edit product</h1>
			<CreateQuoteForm defaultValues={location.state} shown={false} />
		</DashboardLayout>
	);
};

export default DashboardProductsEdit;
