interface Props {
    title: string;
    value?: string;
    data: { key:string; name:string }[];
    onChange: (event: MouseEvent) => void;
    keyIsVisable : boolean;
  }
  
  const Dropdown = ({ title, value, data, onChange , keyIsVisable }: Props) => {
    return (
      <div style={{ display: "flex", flexWrap: "wrap" }}>
      <label>
      <label htmlFor="options" className="form-label">{title}:</label>
        <select
          className="form-select"
          aria-label="Default select"
          value={value}
          onChange={onChange}
        >
          {data.map((element) => (
            <option key={element.key} value={element.name}>
            {keyIsVisable && (element.key)}
            <> </>
            {element.name}
            </option>
          ))};
        </select>
      </label>
      </div>
    );
  };
  
  export default Dropdown;