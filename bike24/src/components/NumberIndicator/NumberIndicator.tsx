interface NumberIndicatorProps {
  value: number | string;
  width?: string;
  height?: string;
  dataTestid?: string;
}

export default function NumberIndicator({
  value,
  width,
  height,
  dataTestid,
}: NumberIndicatorProps) {
  return (
    <div
      data-testid={dataTestid}
      className={`p-3 border-2 border-blue-500 rounded-md flex justify-center items-center ${width} ${height}`}
    >
      {value}
    </div>
  );
}
