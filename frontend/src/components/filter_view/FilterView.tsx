import Button from "../button/Button";

interface FilterProps {
	search: string;
	category_id: number | null;
	handleToggle: () => void;
	handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function FilterView({
	search,
	handleToggle,
	handleSearchChange: handleInputChange,
}: FilterProps) {
	return (
		<div className="container filter">
			<div className="container">
				<label>Product</label>
				<input
					type="search"
					value={search}
					onChange={handleInputChange}
					placeholder="Search"
				/>
			</div>
			<div className="container">
				<label htmlFor="options">Category</label>
				<select id="options">
					<option value="" disabled selected>
						Select an option
					</option>
					<option value="option1">Option 1</option>
					<option value="option2">Option 2</option>
				</select>
			</div>
			<Button action={handleToggle}>Submit</Button>
		</div>
	);
}

export default FilterView;
