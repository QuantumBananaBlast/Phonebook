const Filter = ({filter, setFilter}) => {

    const onFilterChange = (event) => {
        setFilter(event.target.value)
    }

    return (
        <div>
            filter shown with 
            <input onChange={onFilterChange} value={filter} />
        </div>
    )
}

export default Filter