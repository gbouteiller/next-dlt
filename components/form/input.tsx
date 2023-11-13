import {HTMLInputTypeAttribute} from "react";
import {FieldErrors, FieldValues, Path, UseFormRegister} from "react-hook-form";


export default function FormInput<V extends FieldValues>({errors, label, name, register, type = 'text'}: Props<V>) {
  const error = errors[name];
  const id = `${name}`;
  return (
    <div className="form-control">
      <label htmlFor={id} className="label">
        <span className={`label-text${error ? ' text-error' : ''}`}>{label}</span>
      </label>
      <input id={id} type={type} {...register(name)} className={`input input-bordered${error ? ' input-error' : ''}`} />
      {error && (
        <label htmlFor={id} className="label">
          <span className="label-text-alt text-error">{error.message?.toString()}</span>
        </label>
      )}
    </div>
  );
}

export type Props<V extends FieldValues> = {
  errors: FieldErrors<V>;
  label: string;
  name: Path<V>;
  register: UseFormRegister<V>;
  type?: HTMLInputTypeAttribute;
};
