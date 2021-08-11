import "./paginations.css";

function NextPokemonsBtn({ nextPage }) {
  return (
    <button className="next-btn" onClick={nextPage}>
      Next
    </button>
  );
}

export default NextPokemonsBtn;
