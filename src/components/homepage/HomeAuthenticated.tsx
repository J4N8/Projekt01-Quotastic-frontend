import React from "react";
import {Button} from "react-bootstrap";
import {userStorage} from "../../utils/localStorage";
import {UserType} from "../../models/user";

const HomeAuthenticated = () => {
	const user: UserType = userStorage.getUser();
	return (
		<div className="p-2 mb-4">
			<div className="text-center">
				<img src={`${process.env.REACT_APP_API_URL}/files/${user.avatar}`} width="100" />
				<h2>
					{user.first_name} {user.last_name}
				</h2>
			</div>
			<div className="User-stats d-flex text-center">
				<div>
					<p>Quotes</p>
					<p>{user.quote_count}</p>
				</div>
				<div>
					<p>Quotastic karma</p>
					<p>{user.karma}</p>
				</div>
			</div>
			<div className="container row">
				<div className="quotes col">
					<h2>Most liked</h2>
					{/*TODO: MOST LIKED QUOTES*/}
				</div>
				<div className="quotes col">
					<h2>Most recent</h2>
					{/*TODO: MOST RECENT QUOTES*/}
				</div>
				<div className="quotes col">
					<h2>Liked</h2>
					{/*TODO: LIKED QUOTES*/}
				</div>
			</div>

			<Button>Load more</Button>
		</div>
	);
};

export default HomeAuthenticated;
