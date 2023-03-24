const SearchBox = (props) => {
  const { placeholder, onChangeHandler } = props;
  return (
    <div className="my-4 row justify-content-center">
      <div className="col-12 col-sm-6">
        <input
          type="search"
          className="form-control"
          placeholder={placeholder}
          onChange={onChangeHandler}
        />
      </div>
    </div>
  );
};

export default SearchBox;
