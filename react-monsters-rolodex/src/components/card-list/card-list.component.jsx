import Card from "../card/card.component";

const CardList = (props) => {
  const { monsters } = props;
  return (
    <div className="container-lg mb-5">
      <div className="row gy-2">
        {monsters.map((monster) => (
          <Card monster={monster} key={monster.id} />
        ))}
      </div>
    </div>
  );
};

export default CardList;
