export const TreasureSearch = ({ setterFunction }) => {
    return (
      <div>
        <input 
        onChange={
          (changeEvent) => {
              setterFunction(changeEvent.target.value)
          }
        }
        type="text" placeholder="Find A Treasure" />
      </div>
    )
  }