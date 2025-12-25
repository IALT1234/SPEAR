import "../css/Account.css";

function Account({ onLogout }) {
  return (
    <div className="account-container">
      <button className="logout-button" onClick={onLogout}>
        Log out
      </button>
    </div>
  );
}

export default Account;