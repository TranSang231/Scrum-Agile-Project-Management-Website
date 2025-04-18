const Button = ({ isLoading, label, onClick, disabled }) => (
    <button onClick={onClick} disabled={disabled} className="button">
      {isLoading ? <span className="spinner"></span> : label}
    </button>
  );
  
  export default Button;