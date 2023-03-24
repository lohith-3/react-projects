const Card = (props) => {
  const { id, name, email } = props.monster;
  return (
    <div className="col-12 col-sm-6 col-md-4">
      <div className="card shadow">
        <img
          src={`https://robohash.org/${id}?set=set2&size=180x180`}
          alt={`monster-${name}`}
          className="img-fluid card-img-top px-3"
        />
        <div className="card-body">
          <p className="card-title text-center">{name}</p>
          <p className="card-title text-center">{email}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
