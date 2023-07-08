import * as React from "react";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number; maxvalue: number }
) {
  const [stepValue, setStepValue] = React.useState<number>(0);

  React.useEffect(() => {
    const numberAsString = props.value.toString();
    const newValue = numberAsString.replace("0", "");

    setStepValue(Number(newValue));
  }, [props.value]);

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} valueBuffer={10} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary" className="min-w-sm">
          {`${stepValue}/${props.maxvalue}`}
        </Typography>
      </Box>
    </Box>
  );
}

interface LinearWithValueLabelProps {
  progress: number;
  maxValue: number;
}

export default function ProgressBar({
  progress,
  maxValue,
}: LinearWithValueLabelProps) {
  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgressWithLabel value={progress} maxvalue={maxValue} />
    </Box>
  );
}
