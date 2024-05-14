import propTypes from "prop-types";

export default function SearchBox({ value, onChange, onSubmit }) {
  return (
    <div className="input-group" style={{ paddingTop: 0 }}>
      <input
        className="form-control"
        type="text"
        placeholder="Search Messages"
        value={value}
        onChange={onChange}
      />
      <button
        className="btn btn-primary"
        type="button"
        style={{ background: "#117A65", borderRadius: "3%" }}
        onClick={onSubmit}
      >
        go
      </button>
    </div>
  );
}

SearchBox.propTypes = {
  value: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  onSubmit: propTypes.func.isRequired,
};
