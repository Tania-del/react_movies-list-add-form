import { useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

interface Props {
  onAdd: (movie: Movie) => void;
}
const defaultValue: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

interface IError {
  title: boolean,
  description: boolean,
  imgUrl: boolean,
  imdbUrl: boolean,
  imdbId: boolean,
}

const defaultValueError = {
  title: true,
  description: false,
  imgUrl: false,
  imdbUrl: true,
  imdbId: true,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
// console.log(movie);
  const [count, setCount] = useState(0);
  const [form, setForm] = useState(defaultValue);
  const [error, setError] = useState(defaultValueError);

  // console.log(form)

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError((prev) => ({
      ...prev,
      [name]: !value,
    }));
  };

  // console.log(error)

  const isError = () => {
    let result = false;

    const keys = Object.keys(error) as (keyof IError)[];

    // eslint-disable-next-line no-restricted-syntax
    for (const key of keys) {
      if (error[key]) {
        result = true;
      }
    }

    return result;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.imgUrl) {
      onAdd(form);
      setForm(defaultValue);
      setCount((prev) => prev + 1);
      setError(defaultValueError);
    }
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={form.title}
        onChange={handleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={form.description}
        onChange={handleChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={form.imgUrl}
        onChange={handleChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={form.imdbUrl}
        onChange={handleChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={form.imdbId}
        onChange={handleChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isError()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
