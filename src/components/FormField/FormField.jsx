export const FormField = ({ label, children, errorMessage }) => {
    return (
        <div className="form-field">
            <label className="form-field__label">{label}</label>
            {children}
            {errorMessage && (
                <p className="form-field_error">{errorMessage}</p>
            )}
        </div>
    );
};