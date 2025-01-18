
interface FilterProps{
    search: string;
}

function FilterView({search}: FilterProps){
    return (
        <div className="container filter">
            <div className="container">
                <label>Product</label>
                <input type="search" placeholder={search}/>
            </div>
            <div className="container">
                <label htmlFor="options">Category</label>
                <select id="options">
                    <option value="" disabled selected>Select an option</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                </select>
            </div>
        </div>
    )
}

export default FilterView;