"use client";
import { useField } from "@payloadcms/ui";
import type { TextFieldClientComponent } from "payload";

type PasswordValueType = string;

import { EyeClosed, EyeIcon } from "lucide-react";
import { useState } from "react";
import "./password.scss";

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
