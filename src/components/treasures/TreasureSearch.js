export const TreasureSearch = ({ setterFunction }) => {
    return (
      <div className="treasure_filter">
        <input className="treasure_search_filter"
        onChange={
          (changeEvent) => {
              setterFunction(changeEvent.target.value)
          }
        }
        type="text" placeholder="Find A Treasure" />
      </div>
    )
  }