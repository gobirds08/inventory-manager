import Category from "../../models/Category";
import Button from "../button/Button";

interface FilterProps {
	search: string;
	category: string | null;
	categories: Category[];
	handleToggle: () => void;
	handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

function FilterView({
	search,
	category,
	categories,
	handleToggle,
	handleSearchChange,
	handleCategoryChange,
}: FilterProps) {
	return (
		<div className="container filter">
			<div className="container">
				<label>Product</label>
				<input
					type="search"
					value={search}
					onChange={handleSearchChange}
					placeholder="Search"
				/>
			</div>
			<div className="container">
				<label htmlFor="options">Category</label>
				<select
					id="options"
					value={category?.toString()}
					onChange={handleCategoryChange}
				>
					<option value={0}>All</option>
					{categories.map((category) => (
						<option key={category.category_id} value={category.category_id}>
							{category.category_name}
						</option>
					))}
				</select>
			</div>
			<Button action={handleToggle}>Submit</Button>
		</div>
	);
}

export default FilterView;
