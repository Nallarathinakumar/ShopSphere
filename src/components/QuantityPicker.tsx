export default function QuantityPicker({
  value,
  onChange,
  max = 10
}: {
  value: number;
  onChange: (next: number) => void;
  max?: number;
}) {
  return (
    <div className="qty-picker">
      <button type="button" onClick={() => onChange(Math.max(1, value - 1))} aria-label="Decrease quantity">
        −
      </button>
      <span>{value}</span>
      <button type="button" onClick={() => onChange(Math.min(max, value + 1))} aria-label="Increase quantity">
        +
      </button>
    </div>
  );
}
