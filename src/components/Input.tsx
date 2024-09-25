//import { locations } from "./locations";
import { FaMapMarkerAlt } from "react-icons/fa";
interface InputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  /* onBlur: React.FocusEventHandler<HTMLInputElement> */
}

function Input({
  label,
  placeholder,
  value,
  onChange,
  /* onBlur */

}: InputProps) {
  return (
    <div className="location-input">
      <label htmlFor="" className="inputLabel">
        {label}
      </label>
      <div className="input-and-icon">
        <FaMapMarkerAlt className="location-icon"/>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          /* onBlur = {onBlur} */
        />
      </div>
    </div>
  );
}

export default Input;
