import { FormHeader } from './FormHeader';
import '../assets/styles/components/emailForm.scss';

// EmailForm.js
export const EmailForm = ({ headingTitle, headingSubTitle, email, setEmail, handleEmailSubmit, message, messageType, isLoading }) => (
    <form onSubmit={handleEmailSubmit}>
      {/* <FormHeader title="Create an account" subtitle="Enter your email address to get started" /> */}
      <FormHeader title={`${headingTitle}`} subtitle={`${headingSubTitle}`} />
      
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input 
          type="email" 
          id="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
  
      {message && (
        <div style={{ color: messageType === "success" ? "green" : "red" }}>
          {message}
        </div>
      )}
  
      <button type="submit" className="button" disabled={isLoading}>
        {isLoading ? <span className="spinner-border spinner-border-sm me-2"></span> : "Continue"}
      </button>
  
      <p className="terms-text">
        By creating an account, you agree to the <a href="#terms">Terms of use</a> and <a href="#privacy">Privacy Policy</a>.
      </p>
    </form>
  );