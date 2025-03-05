"use client";
import type { TextFieldClientComponent } from "payload";
import { useField } from "@payloadcms/ui";

type PasswordValueType = string;

import "./password.scss";
import { EyeClosed, EyeIcon } from "lucide-react";
import { useState } from "react";

export const PasswordField: TextFieldClientComponent = ({ path, field }) => {
  const [showPassword, setShowPassword] = useState(false);

  const { value, setValue } = useField<PasswordValueType>({ path });
  const label = String(field.label || field.name);
  return (
    <div className="field-type text">
      <label className="field-label" htmlFor={path}>
        {label} {field.required && <span className="required">*</span>}
      </label>
      <div className="password-field-wrapper">
        <button
          className="preview-password"
          type="button"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeIcon size={20} /> : <EyeClosed size={20} />}
        </button>
        <input
          id={path}
          data-rtl="false"
          name={field.name}
          type={showPassword ? "text" : "password"}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          value={value}
        />
      </div>
    </div>
  );
};
