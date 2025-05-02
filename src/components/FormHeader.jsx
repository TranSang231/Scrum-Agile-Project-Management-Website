import '../assets/styles/components/formHeader.scss';
  
export const FormHeader = ({ title, subtitle }) => (
    <>
      <h1 class="form-heading">{title}</h1>
      <p className="form-subtitle">{subtitle || "Please follow the instructions."}</p>
    </>
  );
  
  